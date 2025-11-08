# 🧹 BroomNav - Quick Reference Card

## 📱 ANDROID APP - INSTANT GUIDE

### ⚡ Quick Start (3 Steps)

```bash
# 1. Open in Android Studio
File → Open → Select: C:\Users\DELL\StudioProjects\Hackss

# 2. Wait for Gradle Sync (1-2 minutes)

# 3. Click ▶️ Run button OR
gradlew installDebug
```

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `app/src/main/java/.../MainActivity.kt` | WebView entry point |
| `app/src/main/assets/` | All HTML/CSS/JS files |
| `app/src/main/AndroidManifest.xml` | App config & permissions |
| `app/build.gradle.kts` | Dependencies |

---

## 🎯 What the App Does

1. **Launches** → Loads `login.html` from assets
2. **User registers/logs in** → Stored in WebView localStorage
3. **Selects city** → 10 Indian cities available
4. **Finds route** → Safety-based routing with color zones
5. **Reports unsafe areas** → Community-driven safety

---

## 🔌 Architecture

```
Android App
    ↓
MainActivity.kt (Kotlin)
    ↓
WebView (JavaScript enabled)
    ↓
Assets folder (HTML/CSS/JS)
    ↓
localStorage (Offline data)
```

---

## 🎨 Features

✅ **Native Android** - Kotlin + WebView  
✅ **Offline-first** - localStorage for all data  
✅ **10 Cities** - Mumbai, Delhi, Bangalore, etc.  
✅ **100 Areas** - Real locations with coordinates  
✅ **Safety Scoring** - 0-100 based on risk zones  
✅ **Color Zones** - 🟢 Safe, 🟠 Moderate, 🔴 Risky  
✅ **Community** - Report & vote on unsafe areas  
✅ **Spooky UI** - Dark purple/orange theme  
✅ **JS Bridge** - Kotlin ↔ JavaScript communication  

---

## 🚀 Build Commands

```bash
# Debug APK
gradlew assembleDebug

# Install on device
gradlew installDebug

# Release APK
gradlew assembleRelease

# Clean build
gradlew clean build
```

---

## 📱 Testing

### First Run:
1. App opens to login screen
2. Tap "Register here"
3. Enter details → Register
4. Auto-redirected to map

### Try a Route:
1. Select "Mumbai"
2. Start: "Bandra"
3. End: "Colaba"
4. Tap "🔮 Find Safest Route"
5. See safety score & colored route\!

---

## 🛠️ Debug WebView

1. Enable USB debugging on device
2. Open Chrome → `chrome://inspect`
3. Find your device → Click "Inspect"
4. Full Chrome DevTools available\!

---

## 📊 App Info

- **Min SDK**: Android 7.0 (API 24)
- **Target SDK**: Android 14 (API 36)
- **APK Size**: ~5-8 MB
- **Language**: Kotlin
- **UI**: WebView (HTML/CSS/JS)

---

## 📂 Project Location

```
C:\Users\DELL\StudioProjects\Hackss
```

---

## 📖 Documentation

| File | Purpose |
|------|---------|
| `ANDROID_APP_GUIDE.md` | Complete Android guide |
| `BroomNav/README.md` | Web app documentation |
| `BroomNav/START_HERE.md` | Web app quick start |

---

## ⚠️ Important Notes

- **Internet Required**: For map tiles and routing (OSRM)
- **Offline Mode**: Shows straight-line routes if offline
- **Data Storage**: All user data in WebView localStorage
- **Back Button**: Navigates WebView history, then exits

---

## 🔧 JavaScript Bridge Usage

### Call Kotlin from JavaScript:

```javascript
Android.showToast("Hello from JS\!");
Android.log("Debug message");
var version = Android.getAppVersion();
```

### Call JavaScript from Kotlin:

```kotlin
webView.evaluateJavascript("alert('Hello from Kotlin\!');", null)
```

---

## 🎯 Common Issues

**Gradle sync fails?**
→ Check internet, wait, retry

**App crashes on launch?**
→ Check logcat for errors

**Map doesn't load?**
→ Check internet connection

**Can't find locations?**
→ Use known area names from cities

**WebView blank?**
→ Check assets folder has all files

---

## ✅ Pre-Launch Checklist

- [ ] Gradle sync successful
- [ ] Assets folder contains 9 files
- [ ] MainActivity.kt uses WebView
- [ ] AndroidManifest.xml has permissions
- [ ] build.gradle.kts simplified
- [ ] Device/emulator ready
- [ ] USB debugging enabled (for device)

---

## 🎊 YOU'RE READY\!

Just open Android Studio and click ▶️ Run\!

**Or via terminal:**
```bash
gradlew installDebug
```

---

**Built with ❤️ using Kotlin + WebView**

**Stay Safe\! 🧹👻📱**
