// Safety Data for Indian Cities
// This includes mock crime data, lighting conditions, and accident-prone areas
const SAFETY_DATA = {
    mumbai: {
        highRiskZones: [
            { lat: 19.0176, lng: 72.8563, radius: 500, reason: "Poor lighting, isolated area" },
            { lat: 19.0430, lng: 72.8340, radius: 300, reason: "High traffic accident zone" },
            { lat: 19.1950, lng: 72.8420, radius: 400, reason: "Crime reports" }
        ],
        moderateRiskZones: [
            { lat: 19.1136, lng: 72.8697, radius: 600, reason: "Moderate traffic" },
            { lat: 19.0990, lng: 72.8265, radius: 500, reason: "Crowded area" },
            { lat: 19.1865, lng: 72.8485, radius: 450, reason: "Occasional reports" }
        ],
        safeZones: [
            { lat: 19.0596, lng: 72.8295, radius: 800, reason: "Well-lit, patrolled area" },
            { lat: 19.1197, lng: 72.9059, radius: 700, reason: "Residential, safe neighborhood" },
            { lat: 18.9067, lng: 72.8147, radius: 600, reason: "Tourist area, good security" }
        ]
    },
    delhi: {
        highRiskZones: [
            { lat: 28.6507, lng: 77.2300, radius: 450, reason: "Crowded, theft reports" },
            { lat: 28.5921, lng: 77.0460, radius: 500, reason: "Isolated areas at night" },
            { lat: 28.7469, lng: 77.0670, radius: 400, reason: "Poor lighting" }
        ],
        moderateRiskZones: [
            { lat: 28.6510, lng: 77.1900, radius: 550, reason: "Heavy traffic" },
            { lat: 28.5677, lng: 77.2430, radius: 500, reason: "Market area" },
            { lat: 28.6219, lng: 77.0850, radius: 450, reason: "Mixed reports" }
        ],
        safeZones: [
            { lat: 28.6315, lng: 77.2167, radius: 800, reason: "Central area, well-monitored" },
            { lat: 28.5244, lng: 77.2066, radius: 700, reason: "Upscale neighborhood" },
            { lat: 28.5494, lng: 77.2501, radius: 650, reason: "Commercial hub, secure" }
        ]
    },
    bangalore: {
        highRiskZones: [
            { lat: 12.8399, lng: 77.6770, radius: 500, reason: "Isolated industrial area" },
            { lat: 12.9591, lng: 77.6974, radius: 400, reason: "Traffic accidents" },
            { lat: 13.1007, lng: 77.5963, radius: 450, reason: "Poor street lighting" }
        ],
        moderateRiskZones: [
            { lat: 12.9279, lng: 77.6271, radius: 550, reason: "Busy nightlife area" },
            { lat: 12.9698, lng: 77.7499, radius: 500, reason: "IT park area" },
            { lat: 12.9165, lng: 77.6101, radius: 450, reason: "Mixed residential" }
        ],
        safeZones: [
            { lat: 12.9784, lng: 77.6408, radius: 800, reason: "Well-patrolled, upscale" },
            { lat: 12.9750, lng: 77.6060, radius: 750, reason: "Commercial center" },
            { lat: 12.9116, lng: 77.6390, radius: 700, reason: "Residential, safe" }
        ]
    },
    kolkata: {
        highRiskZones: [
            { lat: 22.5958, lng: 88.2636, radius: 500, reason: "Bridge area, crowded" },
            { lat: 22.4950, lng: 88.3108, radius: 450, reason: "Remote locality" },
            { lat: 22.6539, lng: 88.4255, radius: 400, reason: "Airport road, speeding" }
        ],
        moderateRiskZones: [
            { lat: 22.5535, lng: 88.3561, radius: 550, reason: "Nightlife, crowds" },
            { lat: 22.4981, lng: 88.3662, radius: 500, reason: "University area" },
            { lat: 22.6211, lng: 88.4542, radius: 450, reason: "Developing area" }
        ],
        safeZones: [
            { lat: 22.5804, lng: 88.4160, radius: 800, reason: "Planned township" },
            { lat: 22.5328, lng: 88.3663, radius: 750, reason: "Upscale residential" },
            { lat: 22.5863, lng: 88.4749, radius: 700, reason: "New development, secure" }
        ]
    },
    chennai: {
        highRiskZones: [
            { lat: 12.8996, lng: 80.2209, radius: 500, reason: "Highway, speeding" },
            { lat: 12.9249, lng: 80.1000, radius: 450, reason: "Suburban, isolated" },
            { lat: 13.0355, lng: 80.1561, radius: 400, reason: "Industrial zone" }
        ],
        moderateRiskZones: [
            { lat: 13.0418, lng: 80.2341, radius: 550, reason: "Market area, crowded" },
            { lat: 12.9750, lng: 80.2200, radius: 500, reason: "Developing suburb" },
            { lat: 13.0067, lng: 80.2206, radius: 450, reason: "Mixed area" }
        ],
        safeZones: [
            { lat: 13.0067, lng: 80.2572, radius: 800, reason: "Coastal, well-lit" },
            { lat: 13.0850, lng: 80.2100, radius: 750, reason: "Residential, safe" },
            { lat: 13.0339, lng: 80.2677, radius: 700, reason: "Cultural area" }
        ]
    },
    hyderabad: {
        highRiskZones: [
            { lat: 17.3517, lng: 78.5529, radius: 500, reason: "Peripheral area" },
            { lat: 17.3616, lng: 78.4747, radius: 450, reason: "Crowded market" },
            { lat: 17.4849, lng: 78.3916, radius: 400, reason: "Traffic issues" }
        ],
        moderateRiskZones: [
            { lat: 17.4374, lng: 78.4482, radius: 550, reason: "Commercial hub" },
            { lat: 17.4399, lng: 78.4983, radius: 500, reason: "Railway area" },
            { lat: 17.4474, lng: 78.3914, radius: 450, reason: "IT corridor" }
        ],
        safeZones: [
            { lat: 17.4239, lng: 78.4436, radius: 800, reason: "Upscale, secure" },
            { lat: 17.4435, lng: 78.3772, radius: 750, reason: "IT hub, patrolled" },
            { lat: 17.4327, lng: 78.4069, radius: 700, reason: "Elite neighborhood" }
        ]
    },
    pune: {
        highRiskZones: [
            { lat: 18.6298, lng: 73.8000, radius: 500, reason: "Industrial area" },
            { lat: 18.5089, lng: 73.9260, radius: 450, reason: "Accident-prone" },
            { lat: 18.5979, lng: 73.7624, radius: 400, reason: "Construction zone" }
        ],
        moderateRiskZones: [
            { lat: 18.5912, lng: 73.7389, radius: 550, reason: "IT park area" },
            { lat: 18.5074, lng: 73.8077, radius: 500, reason: "Busy traffic" },
            { lat: 18.5679, lng: 73.9143, radius: 450, reason: "Airport road" }
        ],
        safeZones: [
            { lat: 18.5362, lng: 73.8958, radius: 800, reason: "Upscale, secure" },
            { lat: 18.5593, lng: 73.8078, radius: 750, reason: "Residential, safe" },
            { lat: 18.5164, lng: 73.8422, radius: 700, reason: "Central, well-lit" }
        ]
    },
    ahmedabad: {
        highRiskZones: [
            { lat: 22.9955, lng: 72.6020, radius: 500, reason: "Dense population" },
            { lat: 23.1024, lng: 72.6107, radius: 450, reason: "Peripheral area" },
            { lat: 23.0395, lng: 72.4631, radius: 400, reason: "New development" }
        ],
        moderateRiskZones: [
            { lat: 23.0315, lng: 72.5580, radius: 550, reason: "Shopping area" },
            { lat: 23.0461, lng: 72.5539, radius: 500, reason: "Mixed locality" },
            { lat: 23.0176, lng: 72.5638, radius: 450, reason: "Market zone" }
        ],
        safeZones: [
            { lat: 23.0258, lng: 72.5098, radius: 800, reason: "Upscale residential" },
            { lat: 23.0365, lng: 72.5243, radius: 750, reason: "University area" },
            { lat: 23.0071, lng: 72.5058, radius: 700, reason: "Planned township" }
        ]
    },
    jaipur: {
        highRiskZones: [
            { lat: 26.8220, lng: 75.8645, radius: 500, reason: "Outskirts" },
            { lat: 26.7892, lng: 75.8997, radius: 450, reason: "Industrial zone" },
            { lat: 26.8900, lng: 75.7500, radius: 400, reason: "Highway area" }
        ],
        moderateRiskZones: [
            { lat: 26.9200, lng: 75.8100, radius: 550, reason: "Market street" },
            { lat: 26.9100, lng: 75.8000, radius: 500, reason: "Busy locality" },
            { lat: 26.8650, lng: 75.8200, radius: 450, reason: "Main road" }
        ],
        safeZones: [
            { lat: 26.9124, lng: 75.7873, radius: 800, reason: "Central, secure" },
            { lat: 26.8523, lng: 75.8181, radius: 750, reason: "Residential area" },
            { lat: 26.9050, lng: 75.7260, radius: 700, reason: "Planned colony" }
        ]
    },
    lucknow: {
        highRiskZones: [
            { lat: 26.8200, lng: 80.8900, radius: 500, reason: "Railway crossing" },
            { lat: 26.8590, lng: 80.9220, radius: 450, reason: "Old city, narrow lanes" },
            { lat: 26.8250, lng: 80.9700, radius: 400, reason: "Developing area" }
        ],
        moderateRiskZones: [
            { lat: 26.8550, lng: 80.9100, radius: 550, reason: "Market area" },
            { lat: 26.8900, lng: 80.9800, radius: 500, reason: "Busy traffic" },
            { lat: 26.8650, lng: 80.8900, radius: 450, reason: "Mixed zone" }
        ],
        safeZones: [
            { lat: 26.8548, lng: 81.0082, radius: 800, reason: "Upscale neighborhood" },
            { lat: 26.8507, lng: 80.9496, radius: 750, reason: "Commercial center" },
            { lat: 26.8774, lng: 80.9993, radius: 700, reason: "Residential, safe" }
        ]
    }
};

// Calculate safety score for a location
function calculateSafetyScore(lat, lng, cityKey) {
    if (\!SAFETY_DATA[cityKey]) return 50;
    
    const cityData = SAFETY_DATA[cityKey];
    let score = 100;
    
    // Check high risk zones
    cityData.highRiskZones.forEach(zone => {
        const distance = getDistance(lat, lng, zone.lat, zone.lng);
        if (distance < zone.radius) {
            score -= 30 * (1 - distance / zone.radius);
        }
    });
    
    // Check moderate risk zones
    cityData.moderateRiskZones.forEach(zone => {
        const distance = getDistance(lat, lng, zone.lat, zone.lng);
        if (distance < zone.radius) {
            score -= 15 * (1 - distance / zone.radius);
        }
    });
    
    // Boost for safe zones
    cityData.safeZones.forEach(zone => {
        const distance = getDistance(lat, lng, zone.lat, zone.lng);
        if (distance < zone.radius) {
            score = Math.min(100, score + 10 * (1 - distance / zone.radius));
        }
    });
    
    return Math.max(0, Math.min(100, score));
}

// Calculate distance between two points (Haversine formula)
function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lng2 - lng1) * Math.PI / 180;
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    return R * c;
}

// Get safety category
function getSafetyCategory(score) {
    if (score >= 70) return 'safe';
    if (score >= 40) return 'moderate';
    return 'risky';
}

// Get safety color
function getSafetyColor(score) {
    if (score >= 70) return '#2ecc71';
    if (score >= 40) return '#f39c12';
    return '#e74c3c';
}
