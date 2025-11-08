// Authentication utilities
const AUTH_API = '';

function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (\!token || \!user) {
        if (window.location.pathname \!== '/login.html' && window.location.pathname \!== '/register.html') {
            window.location.href = 'login.html';
        }
        return null;
    }
    
    return JSON.parse(user);
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

// Initialize auth on page load
if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    const user = checkAuth();
    if (user) {
        const userNameEl = document.getElementById('userName');
        if (userNameEl) {
            userNameEl.textContent = `Hello, ${user.name}\! 👋`;
        }
        
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
        }
    }
}
