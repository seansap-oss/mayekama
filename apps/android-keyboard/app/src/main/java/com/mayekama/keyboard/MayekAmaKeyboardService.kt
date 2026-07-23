package com.mayekama.keyboard

import android.content.Context
import android.graphics.Color
import android.graphics.Typeface
import android.inputmethodservice.InputMethodService
import android.media.AudioManager
import android.os.VibrationEffect
import android.os.Vibrator
import android.view.Gravity
import android.view.KeyEvent
import android.view.View
import android.view.inputmethod.EditorInfo
import android.widget.LinearLayout
import android.widget.TextView

class MayekAmaKeyboardService : InputMethodService() {
    private lateinit var suggestionRow: LinearLayout
    private lateinit var prefs: KeyboardPrefs
    private val composing = StringBuilder()
    private var shift = false
    private var symbols = false
    private var privateField = false

    override fun onCreateInputView(): View {
        prefs = KeyboardPrefs(this)
        return buildKeyboard()
    }

    override fun onStartInput(attribute: EditorInfo?, restarting: Boolean) {
        super.onStartInput(attribute, restarting)
        composing.clear()
        privateField = isPrivateInput(attribute)
    }

    private fun buildKeyboard(): View {
        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(Color.rgb(246, 240, 230))
            setPadding(8, 8, 8, 8)
        }

        suggestionRow = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL }
        root.addView(suggestionRow, LinearLayout.LayoutParams(-1, 50))

        val rows = if (symbols) listOf("1234567890", "@#₹&*-+=", "()!?.,:/") else listOf("qwertyuiop", "asdfghjkl", "zxcvbnm")
        rows.forEachIndexed { index, row ->
            val line = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL }
            if (!symbols && index == 2) line.addView(makeKey("⇧", 1.25f) { shift = !shift; rebuildInputView() })
            row.forEach { c -> line.addView(makeKey(displayChar(c), 1f) { commitChar(c) }) }
            if (!symbols && index == 2) line.addView(makeKey("⌫", 1.25f) { handleDelete() })
            if (symbols && index == 2) line.addView(makeKey("⌫", 1.25f) { handleDelete() })
            root.addView(line, LinearLayout.LayoutParams(-1, prefs.keyboardHeight))
        }

        val bottom = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL }
        bottom.addView(makeKey(if (symbols) "ABC" else "?123", 1.2f) { symbols = !symbols; rebuildInputView() })
        bottom.addView(makeKey(",", 0.75f) { commitText(",") })
        bottom.addView(makeKey("Roman Manipuri", 3.2f) { commitText(" "); composing.clear(); refreshCandidates() })
        bottom.addView(makeKey(".", 0.75f) { commitText(".") })
        bottom.addView(makeKey("↵", 1.0f) { sendEnter() })
        root.addView(bottom, LinearLayout.LayoutParams(-1, prefs.keyboardHeight + 2))

        refreshCandidates()
        return root
    }

    private fun rebuildInputView() {
        setInputView(buildKeyboard())
    }

    private fun makeKey(label: String, weight: Float = 1f, action: () -> Unit): TextView {
        return TextView(this).apply {
            text = label
            textSize = if (label.length > 4) 14f else 18f
            gravity = Gravity.CENTER
            setTextColor(Color.rgb(35, 28, 24))
            setTypeface(Typeface.DEFAULT, Typeface.BOLD)
            setBackgroundColor(Color.WHITE)
            setPadding(4, 4, 4, 4)
            setOnClickListener {
                feedback()
                action()
            }
            layoutParams = LinearLayout.LayoutParams(0, -1, weight).apply { setMargins(4, 4, 4, 4) }
        }
    }

    private fun makeCandidate(label: String, action: () -> Unit): TextView {
        return TextView(this).apply {
            text = label
            textSize = 16f
            gravity = Gravity.CENTER
            setTextColor(Color.rgb(125, 18, 16))
            setTypeface(Typeface.DEFAULT, Typeface.BOLD)
            setBackgroundColor(Color.rgb(255, 251, 245))
            setOnClickListener {
                feedback()
                action()
            }
            layoutParams = LinearLayout.LayoutParams(0, -1, 1f).apply { setMargins(4, 2, 4, 2) }
        }
    }

    private fun displayChar(c: Char): String = if (!symbols && shift) c.uppercaseChar().toString() else c.toString()

    private fun commitChar(c: Char) {
        val out = if (!symbols && shift) c.uppercaseChar() else c
        commitText(out.toString())
        if (out.isLetter() || out == '-') composing.append(out.lowercaseChar()) else composing.clear()
        shift = false
        refreshCandidates()
        if (!symbols) rebuildInputView()
    }

    private fun commitText(text: String) {
        currentInputConnection?.commitText(text, 1)
    }

    private fun handleDelete() {
        currentInputConnection?.deleteSurroundingText(1, 0)
        if (composing.isNotEmpty()) composing.deleteCharAt(composing.length - 1)
        refreshCandidates()
    }

    private fun sendEnter() {
        currentInputConnection?.sendKeyEvent(KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_ENTER))
        composing.clear()
        refreshCandidates()
    }

    private fun refreshCandidates() {
        if (!::suggestionRow.isInitialized) return
        suggestionRow.removeAllViews()
        val candidates = if (privateField) listOf("Private", "No learning", "MayekAma") else LanguagePack.candidates(composing.toString())
        candidates.forEach { word ->
            suggestionRow.addView(makeCandidate(word) {
                if (!privateField) replaceCurrentWord(word)
            })
        }
    }

    private fun replaceCurrentWord(word: String) {
        currentInputConnection?.deleteSurroundingText(composing.length, 0)
        currentInputConnection?.commitText("$word ", 1)
        composing.clear()
        refreshCandidates()
    }

    private fun isPrivateInput(attribute: EditorInfo?): Boolean {
        val type = attribute?.inputType ?: return false
        val variation = type and android.text.InputType.TYPE_MASK_VARIATION
        return variation == android.text.InputType.TYPE_TEXT_VARIATION_PASSWORD ||
            variation == android.text.InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD ||
            variation == android.text.InputType.TYPE_TEXT_VARIATION_WEB_PASSWORD ||
            variation == android.text.InputType.TYPE_NUMBER_VARIATION_PASSWORD
    }

    private fun feedback() {
        if (prefs.sound) {
            val audio = getSystemService(Context.AUDIO_SERVICE) as AudioManager
            audio.playSoundEffect(AudioManager.FX_KEY_CLICK, 0.25f)
        }
        if (prefs.vibration) {
            val vibrator = getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
            vibrator.vibrate(VibrationEffect.createOneShot(12, VibrationEffect.DEFAULT_AMPLITUDE))
        }
    }
}
