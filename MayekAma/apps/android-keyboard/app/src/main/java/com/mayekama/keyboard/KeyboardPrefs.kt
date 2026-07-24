package com.mayekama.keyboard

import android.content.Context

class KeyboardPrefs(context: Context) {
    private val prefs = context.getSharedPreferences("mayekama_keyboard", Context.MODE_PRIVATE)

    var vibration: Boolean
        get() = prefs.getBoolean("vibration", true)
        set(value) = prefs.edit().putBoolean("vibration", value).apply()

    var sound: Boolean
        get() = prefs.getBoolean("sound", false)
        set(value) = prefs.edit().putBoolean("sound", value).apply()

    var standardFirst: Boolean
        get() = prefs.getBoolean("standard_first", true)
        set(value) = prefs.edit().putBoolean("standard_first", value).apply()

    var keyboardHeight: Int
        get() = prefs.getInt("keyboard_height", 56)
        set(value) = prefs.edit().putInt("keyboard_height", value.coerceIn(48, 72)).apply()
}
