# Build 6 Testing Checklist

## Website
- [ ] Homepage opens at http://localhost:5173
- [ ] Approved UI is unchanged.
- [ ] Mobile bottom navigation appears when browser is narrow.
- [ ] Writer accepts pasted text.
- [ ] Writer highlights changed words.
- [ ] Copy button works.
- [ ] Apply standard works.
- [ ] Dictionary search works.
- [ ] Contribution form stores a local pending entry.

## Engine
Run:

```powershell
npm run release:check
```

Expected: no TypeScript or validation errors.

## Android
- [ ] Android folder opens in Android Studio.
- [ ] Gradle sync completes.
- [ ] Debug build starts.
- [ ] Keyboard appears in Android input methods.
- [ ] Keyboard can type in a normal text field.
- [ ] Suggestion strip appears.
- [ ] Backspace, enter, shift, and symbol layer work.

## Privacy
- [ ] No private typing is sent to a server.
- [ ] Keyboard privacy note is visible in companion app.
- [ ] Sensitive/password-field protection state is documented.
