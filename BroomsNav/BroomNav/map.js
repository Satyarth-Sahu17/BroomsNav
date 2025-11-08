// Map initialization and routing logic
let map;
let currentCity = null;
let startMarker = null;
let endMarker = null;
let routeLayer = null;
let safetyLayer = null;
let reportMarkers = [];
let userReports = [];

// Initialize map
function initMap() {
    map = L.map('map').setView([20.5937, 78.9629], 5); // Center of India
    
    // Use dark theme tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);
    
    // Initialize layers
    safetyLayer = L.layerGroup().addTo(map);
    
    // Map click handler for selecting points
    map.on('click', onMapClick);
}

// Handle city selection
function onCityChange(cityKey) {
    if (\!cityKey || \!INDIAN_CITIES[cityKey]) {
        return;
    }
    
    currentCity = cityKey;
    const city = INDIAN_CITIES[cityKey];
    
    // Fly to city
    map.flyTo(city.center, city.zoom, {
        duration: 1.5
    });
    
    // Clear previous markers
    clearMap();
    
    // Draw safety zones
    drawSafetyZones(cityKey);
    
    // Load user reports for this city
    loadUserReports(cityKey);
}

// Draw safety zones on map
function drawSafetyZones(cityKey) {
    safetyLayer.clearLayers();
    
    const cityData = SAFETY_DATA[cityKey];
    if (\!cityData) return;
    
    // Draw high risk zones
    cityData.highRiskZones.forEach(zone => {
        L.circle([zone.lat, zone.lng], {
            radius: zone.radius,
            color: '#e74c3c',
            fillColor: '#e74c3c',
            fillOpacity: 0.2,
            weight: 2
        }).bindPopup(`<strong>High Risk Zone</strong><br>${zone.reason}`).addTo(safetyLayer);
    });
    
    // Draw moderate risk zones
    cityData.moderateRiskZones.forEach(zone => {
        L.circle([zone.lat, zone.lng], {
            radius: zone.radius,
            color: '#f39c12',
            fillColor: '#f39c12',
            fillOpacity: 0.15,
            weight: 2
        }).bindPopup(`<strong>Moderate Risk Zone</strong><br>${zone.reason}`).addTo(safetyLayer);
    });
    
    // Draw safe zones
    cityData.safeZones.forEach(zone => {
        L.circle([zone.lat, zone.lng], {
            radius: zone.radius,
            color: '#2ecc71',
            fillColor: '#2ecc71',
            fillOpacity: 0.1,
            weight: 2
        }).bindPopup(`<strong>Safe Zone</strong><br>${zone.reason}`).addTo(safetyLayer);
    });
}

// Handle map click
function onMapClick(e) {
    // This will be used for setting start/end points via click
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    
    console.log('Clicked:', lat, lng);
}

// Geocode location name to coordinates
async function geocodeLocation(locationName, cityKey) {
    if (\!currentCity || \!INDIAN_CITIES[cityKey]) {
        return null;
    }
    
    const city = INDIAN_CITIES[cityKey];
    
    // First check if it matches a known area
    const area = city.areas.find(a => 
        a.name.toLowerCase().includes(locationName.toLowerCase())
    );
    
    if (area) {
        return { lat: area.lat, lng: area.lng };
    }
    
    // Use Nominatim for geocoding
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName + ', ' + city.name + ', India')}&limit=1`
        );
        const data = await response.json();
        
        if (data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon)
            };
        }
    } catch (error) {
        console.error('Geocoding error:', error);
    }
    
    return null;
}

// Find and display route
async function findRoute(startLocation, endLocation) {
    if (\!currentCity) {
        alert('Please select a city first\!');
        return;
    }
    
    showLoading(true);
    
    try {
        // Geocode start and end locations
        const start = await geocodeLocation(startLocation, currentCity);
        const end = await geocodeLocation(endLocation, currentCity);
        
        if (\!start || \!end) {
            alert('Could not find one or both locations. Try entering a known area name.');
            showLoading(false);
            return;
        }
        
        // Clear previous route
        clearRoute();
        
        // Add markers
        startMarker = L.marker([start.lat, start.lng], {
            icon: L.divIcon({
                html: '📍',
                className: 'emoji-icon',
                iconSize: [30, 30]
            })
        }).addTo(map).bindPopup('<strong>Start</strong>');
        
        endMarker = L.marker([end.lat, end.lng], {
            icon: L.divIcon({
                html: '🎯',
                className: 'emoji-icon',
                iconSize: [30, 30]
            })
        }).addTo(map).bindPopup('<strong>Destination</strong>');
        
        // Get route from OSRM
        const routeData = await getRoute(start, end);
        
        if (routeData) {
            displayRoute(routeData, start, end);
        } else {
            alert('Could not calculate route. Try different locations.');
        }
    } catch (error) {
        console.error('Route error:', error);
        alert('Error calculating route. Please try again.');
    } finally {
        showLoading(false);
    }
}

// Get route from OSRM
async function getRoute(start, end) {
    try {
        const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.code === 'Ok' && data.routes.length > 0) {
            return data.routes[0];
        }
    } catch (error) {
        console.error('OSRM error:', error);
    }
    
    return null;
}

// Display route on map with safety scoring
function displayRoute(routeData, start, end) {
    const coordinates = routeData.geometry.coordinates;
    const latlngs = coordinates.map(coord => [coord[1], coord[0]]);
    
    // Calculate safety score along route
    let totalScore = 0;
    const segmentCount = Math.min(latlngs.length, 50); // Sample points
    const step = Math.floor(latlngs.length / segmentCount);
    
    for (let i = 0; i < latlngs.length; i += step) {
        const point = latlngs[i];
        const score = calculateSafetyScore(point[0], point[1], currentCity);
        totalScore += score;
    }
    
    const avgScore = Math.round(totalScore / segmentCount);
    const category = getSafetyCategory(avgScore);
    const color = getSafetyColor(avgScore);
    
    // Draw route
    routeLayer = L.polyline(latlngs, {
        color: color,
        weight: 6,
        opacity: 0.8
    }).addTo(map);
    
    // Fit bounds
    map.fitBounds(routeLayer.getBounds(), { padding: [50, 50] });
    
    // Display route info
    displayRouteInfo(avgScore, category, routeData.distance, routeData.duration);
}

// Display route information
function displayRouteInfo(score, category, distance, duration) {
    const routeInfo = document.getElementById('routeInfo');
    const safetyScore = document.getElementById('safetyScore');
    const routeDetails = document.getElementById('routeDetails');
    
    routeInfo.classList.remove('hidden');
    
    safetyScore.className = `safety-score ${category}`;
    safetyScore.textContent = `${score}/100`;
    
    const distanceKm = (distance / 1000).toFixed(2);
    const durationMin = Math.round(duration / 60);
    
    let safetyText = '';
    if (category === 'safe') {
        safetyText = '✅ This route is relatively safe with good lighting and low risk factors.';
    } else if (category === 'moderate') {
        safetyText = '⚠️ This route has some risk factors. Exercise caution, especially at night.';
    } else {
        safetyText = '❌ This route passes through high-risk areas. Consider alternative routes.';
    }
    
    routeDetails.innerHTML = `
        <p><strong>Distance:</strong> ${distanceKm} km</p>
        <p><strong>Duration:</strong> ~${durationMin} minutes</p>
        <p><strong>Safety Assessment:</strong></p>
        <p>${safetyText}</p>
    `;
}

// Load user reports from server
async function loadUserReports(cityKey) {
    try {
        const response = await fetch('/api/reports');
        const data = await response.json();
        
        if (data.success) {
            userReports = data.reports.filter(r => r.city === cityKey);
            displayUserReports();
        }
    } catch (error) {
        console.error('Error loading reports:', error);
    }
}

// Display user reports on map
function displayUserReports() {
    // Clear existing report markers
    reportMarkers.forEach(marker => map.removeLayer(marker));
    reportMarkers = [];
    
    userReports.forEach(report => {
        const marker = L.marker([report.lat, report.lng], {
            icon: L.divIcon({
                html: '👻',
                className: 'emoji-icon report-icon',
                iconSize: [30, 30]
            })
        }).addTo(map);
        
        marker.bindPopup(`
            <strong>User Report</strong><br>
            <em>${report.type}</em><br>
            ${report.description || 'No description'}<br>
            <small>Votes: ${report.votes}</small><br>
            <button onclick="voteReport('${report.id}')">👍 Vote</button>
        `);
        
        reportMarkers.push(marker);
    });
}

// Vote on a report
async function voteReport(reportId) {
    try {
        const response = await fetch(`/api/reports/${reportId}/vote`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
        
        const data = await response.json();
        
        if (data.success) {
            loadUserReports(currentCity);
        }
    } catch (error) {
        console.error('Error voting:', error);
    }
}

// Clear map
function clearMap() {
    if (startMarker) map.removeLayer(startMarker);
    if (endMarker) map.removeLayer(endMarker);
    if (routeLayer) map.removeLayer(routeLayer);
    startMarker = null;
    endMarker = null;
    routeLayer = null;
    
    document.getElementById('routeInfo').classList.add('hidden');
}

// Clear route only
function clearRoute() {
    if (startMarker) map.removeLayer(startMarker);
    if (endMarker) map.removeLayer(endMarker);
    if (routeLayer) map.removeLayer(routeLayer);
    startMarker = null;
    endMarker = null;
    routeLayer = null;
}

// Show/hide loading overlay
function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (show) {
        overlay.classList.remove('hidden');
    } else {
        overlay.classList.add('hidden');
    }
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', () => {
    initMap();
});
