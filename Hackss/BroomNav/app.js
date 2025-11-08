// Main application logic
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const user = checkAuth();
    if (\!user) return;
    
    // Initialize UI
    initializeUI();
});

function initializeUI() {
    // City selector
    const citySelect = document.getElementById('citySelect');
    citySelect.addEventListener('change', (e) => {
        onCityChange(e.target.value);
    });
    
    // Find route button
    const findRouteBtn = document.getElementById('findRouteBtn');
    findRouteBtn.addEventListener('click', handleFindRoute);
    
    // Report button
    const reportBtn = document.getElementById('reportBtn');
    reportBtn.addEventListener('click', openReportModal);
    
    // Report modal
    const reportModal = document.getElementById('reportModal');
    const modalClose = reportModal.querySelector('.modal-close');
    modalClose.addEventListener('click', closeReportModal);
    
    // Report form
    const reportForm = document.getElementById('reportForm');
    reportForm.addEventListener('submit', handleReportSubmit);
    
    // Close modal on outside click
    reportModal.addEventListener('click', (e) => {
        if (e.target === reportModal) {
            closeReportModal();
        }
    });
    
    // Enable autocomplete suggestions for location inputs
    setupLocationAutocomplete();
}

function handleFindRoute() {
    const citySelect = document.getElementById('citySelect');
    const startLocation = document.getElementById('startLocation').value.trim();
    const endLocation = document.getElementById('endLocation').value.trim();
    
    if (\!citySelect.value) {
        alert('Please select a city first\! 🧹');
        return;
    }
    
    if (\!startLocation || \!endLocation) {
        alert('Please enter both start and end locations\! 📍');
        return;
    }
    
    findRoute(startLocation, endLocation);
}

function openReportModal() {
    if (\!currentCity) {
        alert('Please select a city first\! 🧹');
        return;
    }
    
    const modal = document.getElementById('reportModal');
    const cityCenter = INDIAN_CITIES[currentCity].center;
    
    // Set default coordinates to city center
    document.getElementById('reportLat').value = cityCenter[0].toFixed(6);
    document.getElementById('reportLng').value = cityCenter[1].toFixed(6);
    
    modal.classList.add('active');
    
    // Allow user to click on map to set location
    enableMapClickForReport();
}

function closeReportModal() {
    const modal = document.getElementById('reportModal');
    modal.classList.remove('active');
    disableMapClickForReport();
    
    // Reset form
    document.getElementById('reportForm').reset();
}

let reportClickHandler = null;

function enableMapClickForReport() {
    reportClickHandler = (e) => {
        document.getElementById('reportLat').value = e.latlng.lat.toFixed(6);
        document.getElementById('reportLng').value = e.latlng.lng.toFixed(6);
        
        // Add temporary marker
        if (window.tempReportMarker) {
            map.removeLayer(window.tempReportMarker);
        }
        
        window.tempReportMarker = L.marker([e.latlng.lat, e.latlng.lng], {
            icon: L.divIcon({
                html: '⚠️',
                className: 'emoji-icon',
                iconSize: [30, 30]
            })
        }).addTo(map);
    };
    
    map.on('click', reportClickHandler);
}

function disableMapClickForReport() {
    if (reportClickHandler) {
        map.off('click', reportClickHandler);
        reportClickHandler = null;
    }
    
    if (window.tempReportMarker) {
        map.removeLayer(window.tempReportMarker);
        window.tempReportMarker = null;
    }
}

async function handleReportSubmit(e) {
    e.preventDefault();
    
    const lat = document.getElementById('reportLat').value;
    const lng = document.getElementById('reportLng').value;
    const type = document.getElementById('reportType').value;
    const description = document.getElementById('reportDescription').value;
    
    if (\!type) {
        alert('Please select an issue type\! ⚠️');
        return;
    }
    
    try {
        const response = await fetch('/api/reports', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                lat,
                lng,
                type,
                description,
                city: currentCity
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Report submitted successfully\! Thank you for keeping the community safe\! 👻');
            closeReportModal();
            
            // Reload reports
            loadUserReports(currentCity);
        } else {
            alert('Failed to submit report: ' + (data.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error submitting report:', error);
        alert('Network error. Please try again.');
    }
}

function setupLocationAutocomplete() {
    const startInput = document.getElementById('startLocation');
    const endInput = document.getElementById('endLocation');
    const citySelect = document.getElementById('citySelect');
    
    function createSuggestions(input) {
        const cityKey = citySelect.value;
        if (\!cityKey || \!INDIAN_CITIES[cityKey]) return;
        
        const city = INDIAN_CITIES[cityKey];
        const value = input.value.toLowerCase();
        
        // Remove old suggestions
        const oldSuggestions = input.parentElement.querySelector('.suggestions');
        if (oldSuggestions) {
            oldSuggestions.remove();
        }
        
        if (value.length < 2) return;
        
        // Filter areas
        const matches = city.areas.filter(area => 
            area.name.toLowerCase().includes(value)
        );
        
        if (matches.length === 0) return;
        
        // Create suggestions dropdown
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'suggestions';
        suggestionsDiv.style.cssText = `
            position: absolute;
            background: rgba(26, 10, 46, 0.98);
            border: 2px solid #6f2dbd;
            border-radius: 8px;
            margin-top: 4px;
            max-height: 200px;
            overflow-y: auto;
            width: 100%;
            z-index: 1000;
        `;
        
        matches.forEach(area => {
            const div = document.createElement('div');
            div.textContent = area.name;
            div.style.cssText = `
                padding: 0.8rem;
                cursor: pointer;
                color: #f8f9fa;
                transition: background 0.2s;
            `;
            
            div.addEventListener('mouseenter', () => {
                div.style.background = 'rgba(111, 45, 189, 0.3)';
            });
            
            div.addEventListener('mouseleave', () => {
                div.style.background = 'transparent';
            });
            
            div.addEventListener('click', () => {
                input.value = area.name;
                suggestionsDiv.remove();
            });
            
            suggestionsDiv.appendChild(div);
        });
        
        input.parentElement.style.position = 'relative';
        input.parentElement.appendChild(suggestionsDiv);
    }
    
    startInput.addEventListener('input', () => createSuggestions(startInput));
    endInput.addEventListener('input', () => createSuggestions(endInput));
    
    // Clear suggestions on blur
    [startInput, endInput].forEach(input => {
        input.addEventListener('blur', () => {
            setTimeout(() => {
                const suggestions = input.parentElement.querySelector('.suggestions');
                if (suggestions) suggestions.remove();
            }, 200);
        });
    });
}

// Make voteReport available globally
window.voteReport = voteReport;
