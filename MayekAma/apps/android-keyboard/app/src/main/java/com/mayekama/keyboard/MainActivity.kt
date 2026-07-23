package com.mayekama.keyboard

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.provider.Settings
import android.view.Gravity
import android.view.inputmethod.InputMethodManager
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER_HORIZONTAL
            setPadding(40, 60, 40, 40)
            setBackgroundColor(0xfffff8ee.toInt())
        }
        val title = TextView(this).apply {
            text = "MayekAma"
            textSize = 34f
            setTextColor(0xff8c120f.toInt())
            gravity = Gravity.CENTER
        }
        val subtitle = TextView(this).apply {
            text = "Roman Manipuri Keyboard & Standard
Enable it once, then type English and Roman Manipuri everywhere."
            textSize = 17f
            setTextColor(0xff4f372f.toInt())
            gravity = Gravity.CENTER
            setPadding(0, 12, 0, 28)
        }
        val enable = actionButton("1. Enable MayekAma Keyboard") {
            startActivity(Intent(Settings.ACTION_INPUT_METHOD_SETTINGS))
        }
        val select = actionButton("2. Select as Current Keyboard") {
            val imm = getSystemService(INPUT_METHOD_SERVICE) as InputMethodManager
            imm.showInputMethodPicker()
        }
        val test = TextView(this).apply {
            text = "After selecting MayekAma, open WhatsApp, Facebook, YouTube comments, Gmail or any text box and start typing."
            textSize = 15f
            setTextColor(0xff6e5d52.toInt())
            gravity = Gravity.CENTER
            setPadding(0, 28, 0, 0)
        }
        root.addView(title)
        root.addView(subtitle)
        root.addView(enable)
        root.addView(select)
        root.addView(test)
        setContentView(root)
    }

    private fun actionButton(label: String, action: () -> Unit): Button {
        return Button(this).apply {
            text = label
            textSize = 16f
            setTextColor(0xffffffff.toInt())
            setBackgroundColor(0xff8c120f.toInt())
            setPadding(20, 12, 20, 12)
            setOnClickListener { action() }
        }
    }
}
