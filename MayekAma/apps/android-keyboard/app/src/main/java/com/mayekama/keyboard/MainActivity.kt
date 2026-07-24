package com.mayekama.keyboard

import android.app.Activity
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.provider.Settings
import android.view.Gravity
import android.view.inputmethod.InputMethodManager
import android.widget.Button
import android.widget.CheckBox
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.SeekBar
import android.widget.TextView

class MainActivity : Activity() {
    private lateinit var prefs: KeyboardPrefs

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        prefs = KeyboardPrefs(this)

        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(42, 52, 42, 42)
            setBackgroundColor(Color.rgb(250, 244, 235))
        }

        root.addView(TextView(this).apply {
            text = "MayekAma"
            textSize = 30f
            setTextColor(Color.rgb(125, 18, 16))
            gravity = Gravity.CENTER_HORIZONTAL
        })

        root.addView(TextView(this).apply {
            text = "Roman Manipuri Keyboard\nEnable once. Select as default. Type English and Roman Manipuri anywhere."
            textSize = 16f
            setPadding(0, 18, 0, 28)
            gravity = Gravity.CENTER_HORIZONTAL
        })

        root.addView(Button(this).apply {
            text = "1. Enable MayekAma Keyboard"
            setOnClickListener { startActivity(Intent(Settings.ACTION_INPUT_METHOD_SETTINGS)) }
        })

        root.addView(Button(this).apply {
            text = "2. Select MayekAma Keyboard"
            setOnClickListener { (getSystemService(INPUT_METHOD_SERVICE) as InputMethodManager).showInputMethodPicker() }
        })

        root.addView(EditText(this).apply {
            hint = "3. Try typing here after selecting MayekAma"
            minLines = 5
            setPadding(18, 18, 18, 18)
        })

        root.addView(CheckBox(this).apply {
            text = "Vibration feedback"
            isChecked = prefs.vibration
            setOnCheckedChangeListener { _, checked -> prefs.vibration = checked }
        })

        root.addView(CheckBox(this).apply {
            text = "Sound feedback"
            isChecked = prefs.sound
            setOnCheckedChangeListener { _, checked -> prefs.sound = checked }
        })

        root.addView(TextView(this).apply {
            text = "Keyboard height"
            textSize = 14f
            setPadding(0, 18, 0, 4)
        })

        root.addView(SeekBar(this).apply {
            max = 24
            progress = prefs.keyboardHeight - 48
            setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {
                override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) { prefs.keyboardHeight = 48 + progress }
                override fun onStartTrackingTouch(seekBar: SeekBar?) {}
                override fun onStopTrackingTouch(seekBar: SeekBar?) {}
            })
        })

        root.addView(TextView(this).apply {
            text = "Privacy: this alpha keyboard uses a local starter dictionary. It does not upload private chat text. Personal learning will remain local-first."
            textSize = 13f
            setPadding(0, 24, 0, 0)
        })

        root.addView(TextView(this).apply {
            text = "Build 5 status: Android alpha source is ready for Android Studio compile. Website and language engine remain testable from VS Code."
            textSize = 13f
            setTextColor(Color.rgb(125, 18, 16))
            setPadding(0, 18, 0, 0)
        })

        setContentView(root)
    }
}
