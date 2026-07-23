package com.mayekama.keyboard

import android.inputmethodservice.InputMethodService
import android.view.Gravity
import android.view.View
import android.view.inputmethod.EditorInfo
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView

class MayekAmaImeService : InputMethodService() {
    private var composing = StringBuilder()
    private lateinit var suggestionRow: LinearLayout
    private val engine = SimpleMayekAmaEngine()

    override fun onCreateInputView(): View {
        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(8, 8, 8, 8)
            setBackgroundColor(0xffeee7dd.toInt())
        }
        suggestionRow = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER
            setPadding(0, 0, 0, 6)
        }
        root.addView(suggestionRow)
        addRow(root, "qwertyuiop")
        addRow(root, "asdfghjkl")
        addRow(root, "zxcvbnm", includeShift = true, includeBackspace = true)
        val bottom = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; gravity = Gravity.CENTER }
        bottom.addView(key("?123") { commit("123") })
        bottom.addView(key("😊") { commit("😊") })
        bottom.addView(key("MayekAma", weight = 1f) { commit(" ") })
        bottom.addView(key("↵") { currentInputConnection?.sendKeyEvent(android.view.KeyEvent(android.view.KeyEvent.ACTION_DOWN, android.view.KeyEvent.KEYCODE_ENTER)) })
        root.addView(bottom)
        updateSuggestions()
        return root
    }

    override fun onStartInput(attribute: EditorInfo?, restarting: Boolean) {
        super.onStartInput(attribute, restarting)
        composing.clear()
    }

    private fun addRow(root: LinearLayout, letters: String, includeShift: Boolean = false, includeBackspace: Boolean = false) {
        val row = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; gravity = Gravity.CENTER }
        if (includeShift) row.addView(key("⇧") {})
        for (c in letters) row.addView(key(c.toString()) { commit(c.toString()) })
        if (includeBackspace) row.addView(key("⌫") { backspace() })
        root.addView(row)
    }

    private fun key(label: String, weight: Float = 0f, action: () -> Unit): Button {
        return Button(this).apply {
            text = label
            textSize = if (label.length == 1) 18f else 14f
            setTextColor(0xff241713.toInt())
            setBackgroundColor(0xffffffff.toInt())
            setOnClickListener { action() }
            layoutParams = LinearLayout.LayoutParams(0, 56, if (weight > 0f) weight else 1f).apply { setMargins(3,3,3,3) }
        }
    }

    private fun commit(value: String) {
        currentInputConnection?.commitText(value, 1)
        if (value == " ") composing.clear() else if (value.matches(Regex("[a-zA-Z-]"))) composing.append(value) else composing.clear()
        updateSuggestions()
    }

    private fun backspace() {
        currentInputConnection?.deleteSurroundingText(1, 0)
        if (composing.isNotEmpty()) composing.deleteCharAt(composing.length - 1)
        updateSuggestions()
    }

    private fun updateSuggestions() {
        suggestionRow.removeAllViews()
        val list = engine.suggest(composing.toString())
        for (s in list) {
            val chip = TextView(this).apply {
                text = s
                gravity = Gravity.CENTER
                textSize = 15f
                setTextColor(0xff8c120f.toInt())
                setBackgroundColor(0xfffffbf4.toInt())
                setPadding(18, 12, 18, 12)
                setOnClickListener {
                    val before = composing.length
                    if (before > 0) currentInputConnection?.deleteSurroundingText(before, 0)
                    currentInputConnection?.commitText(s + " ", 1)
                    composing.clear()
                    updateSuggestions()
                }
                layoutParams = LinearLayout.LayoutParams(0, 48, 1f).apply { setMargins(3,3,3,3) }
            }
            suggestionRow.addView(chip)
        }
    }
}

class SimpleMayekAmaEngine {
    private val words = listOf("eina", "eigi", "nang", "nangbu", "nungshi", "houjik", "lak-u", "chatli", "leiri", "kari", "kadaida", "yamna", "nungai", "aduga", "adu", "asi", "thabak", "phajare", "imphal", "manipur")
    private val aliases = mapOf("aigi" to "eigi", "egi" to "eigi", "noongshi" to "nungshi", "nungsi" to "nungshi", "hojik" to "houjik", "laku" to "lak-u", "phajarey" to "phajare")
    fun suggest(prefix: String): List<String> {
        val p = prefix.lowercase()
        if (p.isBlank()) return listOf("eina", "nang", "houjik")
        val exact = aliases[p]
        val matches = words.filter { it.startsWith(p) }.take(3).toMutableList()
        if (exact != null) matches.add(0, exact)
        return matches.distinct().take(3).ifEmpty { listOf(prefix, "eina", "nang") }
    }
}
