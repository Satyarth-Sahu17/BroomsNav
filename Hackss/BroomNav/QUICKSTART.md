# 🧹 BroomNav - Quick Start Guide

## How to Run the App

### Step 1: Start the Server
```bash
npm start
```

The server will start on http://localhost:3000

### Step 2: Open in Browser
Open your browser (Chrome, Firefox, Safari, or Edge) and go to:
```
http://localhost:3000/login.html
```

### Step 3: Register an Account
1. Click on "Register here" link
2. Fill in your details:
   - Name
   - Email
   - Password (min 6 characters)
3. Click Register

You will be automatically logged in and redirected to the main app.

### Step 4: Use the App
1. **Select a City**: Choose from the dropdown (e.g., Mumbai, Delhi, Bangalore)
2. **Enter Locations**: Type area names like:
   - Mumbai: "Bandra", "Andheri", "Colaba", etc.
   - Delhi: "Connaught Place", "Karol Bagh", etc.
   - Bangalore: "Koramangala", "Indiranagar", etc.
3. **Find Route**: Click "Find Safest Route" button
4. **View Results**: See color-coded route with safety score

### Step 5: Report Unsafe Areas
1. Click the "⚠️ Report" button in bottom-right
2. Click on the map to set location (or use default city center)
3. Select issue type (poor lighting, crime prone, etc.)
4. Add description (optional)
5. Submit

## 📱 Install as Mobile App

### Android (Chrome):
1. Open http://localhost:3000 in Chrome
2. Menu (⋮) → "Add to Home Screen"
3. Confirm

### iOS (Safari):
1. Open http://localhost:3000 in Safari
2. Share button → "Add to Home Screen"
3. Confirm

## 🎨 Features to Try

- **Color Zones**: Notice green (safe), orange (moderate), red (risky) zones
- **Safety Score**: Routes are scored 0-100 based on safety
- **User Reports**: See 👻 ghost markers for community reports
- **Vote on Reports**: Click ghost markers and vote with 👍
- **Autocomplete**: Start typing area names for suggestions

## 🔧 Troubleshooting

**Server won't start?**
- Make sure Node.js is installed: `node --version`
- Reinstall dependencies: `npm install`

**Can't find locations?**
- Use known area names from the city
- Check console (F12) for errors

**Not seeing safety zones?**
- Make sure you selected a city first
- Zoom in to see zones better

**Login issues?**
- Clear browser cache and try again
- Check server is running on port 3000

## 🌐 Network Access

To access from phone on same WiFi:
1. Find your computer's IP address:
   - Windows: `ipconfig` (look for IPv4)
   - Mac/Linux: `ifconfig` or `ip addr`
2. On phone browser: `http://YOUR_IP:3000`

Example: `http://192.168.1.100:3000`

## 🎯 Demo Locations to Try

### Mumbai
- Start: "Bandra"
- End: "Colaba"

### Bangalore
- Start: "Koramangala"
- End: "Indiranagar"

### Delhi
- Start: "Connaught Place"
- End: "Saket"

## 📚 Next Steps

1. Customize safety data in `safety-data.js`
2. Add more cities in `indian-cities.js`
3. Integrate real crime databases
4. Deploy to cloud (Heroku, Vercel, AWS)

**Enjoy BroomNav\! Stay Safe\! 🧹👻**
