# MayekAma Build 16 — Story Reader + Android Keyboard Integration

Timestamp: 2026-07-24 12:17 UTC / 2026-07-24 17:47 IST

## Build intent

The existing website identity remains locked. This build only adds the MayekAma story platform layer that was approved in the mockup:

- MayekAma logo from the website remains the app identity.
- No external reader or audiobook brand names are used in the UI.
- Story app styling blends with the current cream/maroon website.
- Mobile bottom navigation includes Home, Stories, Audio, Write, Profile.
- The Tapta story is included as the first sample story.
- Reader includes brightness, text size, Roman/English toggle, bookmark icon, auto-scroll, and audio placeholder.
- Audio is marked as future/admin-upload MP3, not active yet.
- Story submission flow is added for future community writing.
- AI proofreading workflow is described but still review-controlled.

## Android note

The Android keyboard should continue from Android Build 15 Smart Keyboard. Build 16 packages the website/story platform and also includes the Android Build 15 folder in the combined distribution when generated.

## What to test

1. Website opens.
2. Header logo still matches the published website.
3. Hero section still matches the approved UI.
4. Stories section appears.
5. Tapta opens in reader preview.
6. Roman/English toggle works.
7. Brightness and A-/A+ controls work.
8. Auto-scroll button starts/stops page scrolling.
9. Mobile footer has Home, Stories, Audio, Write, Profile.
10. Dictionary and Database sections still work.
