# 🧪 BroomNav Testing Guide

## Quick Test Checklist

### ✅ Backend Tests

1. **Server Starts**
   - Run: `npm start`
   - Expected: "🧹 BroomNav server running on http://localhost:3000"

2. **Health Check**
   - Open: http://localhost:3000/api/health
   - Expected: `{"status":"ok","timestamp":"..."}`

3. **Registration**
   - Go to: http://localhost:3000/register.html
   - Fill form with:
     - Name: Test User
     - Email: test@example.com
     - Password: test123
   - Expected: Redirect to index.html

4. **Login**
   - Go to: http://localhost:3000/login.html
   - Use same credentials
   - Expected: Redirect to index.html with "Hello, Test User\! 👋"

### ✅ Frontend Tests

1. **Map Loads**
   - Expected: Dark map centered on India
   - Controls visible (zoom buttons)

2. **City Selection**
   - Select "Mumbai" from dropdown
   - Expected: Map flies to Mumbai, safety zones appear (red, orange, green circles)

3. **Location Autocomplete**
   - Select city first
   - Type "ban" in start location
   - Expected: "Bandra" suggestion appears

4. **Route Finding**
   - City: Mumbai
   - Start: Bandra
   - End: Colaba
   - Click "Find Safest Route"
   - Expected:
     - Loading animation appears
     - Route drawn on map (colored line)
     - Safety score shows (0-100)
     - Route info panel appears

5. **Safety Zones**
   - Click on colored circles
   - Expected: Popup with zone info

6. **Report Submission**
   - Click "⚠️ Report" button
   - Modal opens
   - Click on map to set location
   - Select type: "Poor Lighting"
   - Add description
   - Submit
   - Expected: Success message, 👻 marker appears

7. **Vote on Report**
   - Click on 👻 marker
   - Click "👍 Vote" button
   - Expected: Vote count increases

### ✅ PWA Tests

1. **Manifest**
   - Open DevTools (F12)
   - Go to Application tab
   - Check Manifest section
   - Expected: BroomNav manifest loaded

2. **Service Worker**
   - In Application tab, check Service Workers
   - Expected: service-worker.js registered and activated

3. **Install Prompt**
   - Chrome: Look for install icon in address bar
   - Expected: Install prompt appears

4. **Offline Mode** (Basic)
   - Install as PWA
   - Stop server
   - Try to open app
   - Expected: Cached pages load

### ✅ Responsive Design Tests

1. **Mobile View**
   - Open DevTools (F12)
   - Toggle device toolbar (Ctrl+Shift+M)
   - Select iPhone/Android device
   - Expected: Layout adapts, search panel on top

2. **Tablet View**
   - Select iPad in device toolbar
   - Expected: Proper layout

3. **Desktop**
   - Full screen browser
   - Expected: Side-by-side layout

## Manual Testing Scenarios

### Scenario 1: First-Time User
1. Open http://localhost:3000
2. Redirect to login.html
3. Click "Register here"
4. Fill registration form
5. Auto-login and redirect
6. Welcome message appears
7. Explore app

### Scenario 2: Route Planning
1. Login
2. Select "Bangalore"
3. Enter "Koramangala" → "Indiranagar"
4. Click Find Route
5. Check safety score
6. View route details
7. Notice color coding

### Scenario 3: Community Reporting
1. Login
2. Select city
3. Click Report button
4. Click on map at unsafe location
5. Fill report form
6. Submit
7. See marker on map
8. Click marker
9. Vote on report

### Scenario 4: Multiple Cities
1. Test Mumbai route
2. Switch to Delhi
3. Map updates with new zones
4. Test Delhi route
5. Switch to Chennai
6. Verify each city has unique data

## Browser Compatibility

Test in:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (Mac/iOS)
- ✅ Mobile Chrome
- ✅ Mobile Safari

## Performance Tests

1. **Page Load Time**
   - DevTools → Network tab
   - Reload page
   - Expected: < 3 seconds

2. **Route Calculation**
   - Time from click to display
   - Expected: < 5 seconds

3. **Map Rendering**
   - Smooth zoom/pan
   - No lag when switching cities

## Security Tests

1. **Unauthenticated Access**
   - Try http://localhost:3000/index.html without login
   - Expected: Redirect to login

2. **Token Validation**
   - Clear localStorage
   - Reload page
   - Expected: Redirect to login

3. **API Protection**
   - Try POST to /api/reports without token
   - Expected: 401 Unauthorized

## Error Handling Tests

1. **Invalid Credentials**
   - Login with wrong password
   - Expected: Error message shown

2. **Network Error**
   - Stop server during route finding
   - Expected: Graceful error message

3. **Invalid Location**
   - Enter gibberish location
   - Expected: "Could not find location" message

4. **Empty Form Submission**
   - Try submitting empty report
   - Expected: Validation errors

## API Endpoint Tests

You can use curl or Postman:

### Register:
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

### Login:
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### Get Reports:
```bash
curl http://localhost:3000/api/reports
```

### Submit Report (with token):
```bash
curl -X POST http://localhost:3000/api/reports \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"lat":19.0760,"lng":72.8777,"type":"poor-lighting","description":"Dark area","city":"mumbai"}'
```

## Common Issues & Solutions

### Issue: Server won't start
- Solution: Check if port 3000 is in use: `netstat -ano | findstr :3000`
- Kill process or change PORT in .env

### Issue: Map not loading
- Solution: Check internet connection (needs OpenStreetMap tiles)
- Check browser console for errors

### Issue: Routes not found
- Solution: Verify OSRM API is accessible
- Try simpler location names

### Issue: PWA not installing
- Solution: Must use HTTPS or localhost
- Check manifest.json is valid

### Issue: Locations not found
- Solution: Use area names from indian-cities.js
- Add more areas if needed

## Automated Testing (Future)

Consider adding:
- Jest for unit tests
- Cypress for E2E tests
- Lighthouse for performance audits
- WAVE for accessibility testing

## Test Coverage Goals

- [ ] All API endpoints
- [ ] Authentication flows
- [ ] Route calculation
- [ ] Safety scoring algorithm
- [ ] User reporting
- [ ] Map interactions
- [ ] Responsive design
- [ ] PWA functionality

## Bug Reporting

If you find bugs:
1. Document steps to reproduce
2. Include browser/device info
3. Screenshot if visual issue
4. Check console for errors
5. Open issue on GitHub

---

**Happy Testing\! 🧹👻**
