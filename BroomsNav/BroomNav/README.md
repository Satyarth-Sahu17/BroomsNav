# 🧹 BroomNav - The Safe Route Companion

A spooky-themed, safety-focused navigation web app designed to help users find the safest routes in Indian cities instead of just the fastest.

## 🎃 Features

- **Safety-Based Navigation**: Routes calculated based on lighting, crime data, and user reports
- **Color-Coded Safety Zones**: 
  - 🟢 Safe (well-lit, low-risk areas)
  - 🟠 Moderate (some risk factors)
  - 🔴 Risky (high-risk zones)
- **Community Reporting**: Users can report unsafe locations
- **Real-Time Updates**: Community reports reflected instantly
- **PWA Support**: Install on Android/iOS devices
- **Spooky Theme**: Halloween-inspired dark mode interface
- **10 Major Indian Cities**: Mumbai, Delhi, Bangalore, Kolkata, Chennai, Hyderabad, Pune, Ahmedabad, Jaipur, Lucknow

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd BroomNav
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 📱 Using as a PWA

### On Android:
1. Open the app in Chrome
2. Tap the menu (⋮) and select "Add to Home Screen"
3. Confirm and the app will be installed

### On iOS:
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Confirm and the app will be installed

## 🗺️ How to Use

1. **Register/Login**: Create an account or login
2. **Select City**: Choose from 10 major Indian cities
3. **Enter Locations**: Type start and destination (use area names like "Bandra", "Koramangala", etc.)
4. **Find Route**: Click "Find Safest Route" to see the safest path
5. **View Safety Score**: Check the color-coded route and safety score
6. **Report Issues**: Click the Report button to mark unsafe areas

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Map**: Leaflet.js with OpenStreetMap
- **Routing**: OSRM (Open Source Routing Machine)
- **Backend**: Node.js with Express
- **Authentication**: JWT
- **PWA**: Service Workers, Web Manifest

## 📊 Safety Score Calculation

The app calculates safety scores based on:
- Proximity to high-risk zones (crime-prone areas)
- Lighting conditions (well-lit vs poorly lit)
- Historical accident data
- User-reported safety concerns
- Time of day considerations

Score ranges:
- **70-100**: Safe route ✅
- **40-69**: Moderate risk ⚠️
- **0-39**: High risk ❌

## 🔐 Security Notes

- Change the JWT_SECRET in .env for production
- Implement proper database (Firebase/MongoDB) for production
- Add rate limiting for API endpoints
- Use HTTPS in production

## 🎨 Customization

### Adding New Cities

Edit `indian-cities.js` and add your city data:
```javascript
newcity: {
    name: "City Name",
    center: [latitude, longitude],
    zoom: 12,
    areas: [
        { name: "Area 1", lat: x.xxxx, lng: y.yyyy },
        // ... more areas
    ]
}
```

Then add safety data in `safety-data.js`.

### Updating Safety Data

Modify `safety-data.js` to update crime zones, safe areas, and risk factors for each city.

## 📝 API Endpoints

- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `GET /api/reports` - Get all safety reports
- `POST /api/reports` - Submit safety report (requires auth)
- `POST /api/reports/:id/vote` - Vote on report (requires auth)

## 🐛 Known Issues

- Geocoding is limited to major areas within cities
- Real crime data integration is mock data (replace with actual datasets)
- Offline functionality is basic (improve with IndexedDB)

## 🔮 Future Enhancements

- Real-time traffic integration
- Weather-based safety adjustments
- Night mode specific routing
- Integration with police databases
- AI-based risk prediction
- Voice navigation
- Multi-language support

## 📄 License

MIT License - feel free to use and modify

## 🤝 Contributing

Contributions are welcome\! Please feel free to submit a Pull Request.

## 👥 Support

For issues and questions, please open an issue on GitHub.

---

**Stay Safe\! 🧹👻**
