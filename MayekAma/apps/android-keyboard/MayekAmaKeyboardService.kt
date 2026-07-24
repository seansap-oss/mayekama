package com.mayekama.keyboard

import android.inputmethodservice.InputMethodService
import android.view.View
import android.view.inputmethod.EditorInfo

/**
 * Build 1 native scaffold.
 * Build 3 will replace this with a full keyboard view, suggestion strip,
 * local dictionary, and settings integration.
 */
class MayekAmaKeyboardService : InputMethodService() {
    override fun onStartInput(attribute: EditorInfo?, restarting: Boolean) {
        super.onStartInput(attribute, restarting)
        // Detect password/private fields here and disable personal learning.
    }

    override fun onCreateInputView(): View {
        // Placeholder until Build 3 native layout is generated.
        return View(this)
    }
}
