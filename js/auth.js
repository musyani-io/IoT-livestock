/**
 * Authentication Module
 * Handles login, logout, and role-based access control
 */

// Demo credentials
const DEMO_USERS = {
    farmer: { username: 'farmer', password: 'farmer123', role: 'farmer', name: 'John Kebede' },
    ministry: { username: 'ministry', password: 'ministry123', role: 'ministry', name: 'Ministry Official' }
};

// Check if user is logged in
function checkAuth() {
    const user = sessionStorage.getItem('user');
    if (!user) {
        window.location.href = 'index.html';
        return null;
    }
    return JSON.parse(user);
}

// Check if user has required role
function checkRole(requiredRole) {
    const user = checkAuth();
    if (user && user.role !== requiredRole) {
        // Redirect to appropriate dashboard
        if (user.role === 'farmer') {
            window.location.href = 'farmer-dashboard.html';
        } else {
            window.location.href = 'ministry-dashboard.html';
        }
        return false;
    }
    return true;
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    // Find matching user
    let authenticatedUser = null;
    
    if (role === 'farmer' && username === DEMO_USERS.farmer.username && password === DEMO_USERS.farmer.password) {
        authenticatedUser = DEMO_USERS.farmer;
    } else if (role === 'ministry' && username === DEMO_USERS.ministry.username && password === DEMO_USERS.ministry.password) {
        authenticatedUser = DEMO_USERS.ministry;
    }
    
    if (authenticatedUser) {
        // Store user in session
        sessionStorage.setItem('user', JSON.stringify(authenticatedUser));
        
        // Redirect based on role
        if (authenticatedUser.role === 'farmer') {
            window.location.href = 'farmer-dashboard.html';
        } else {
            window.location.href = 'ministry-dashboard.html';
        }
    } else {
        // Show error
        showLoginError('Invalid credentials. Please try again.');
    }
}

// Show login error message
function showLoginError(message) {
    let errorDiv = document.querySelector('.login-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'login-error';
        document.querySelector('.login-form').prepend(errorDiv);
    }
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    
    setTimeout(() => {
        errorDiv.classList.remove('show');
    }, 3000);
}

// Logout function
function logout() {
    sessionStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Initialize login form
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Check if already logged in on login page
    const user = sessionStorage.getItem('user');
    if (user && window.location.pathname.endsWith('index.html')) {
        const userData = JSON.parse(user);
        if (userData.role === 'farmer') {
            window.location.href = 'farmer-dashboard.html';
        } else {
            window.location.href = 'ministry-dashboard.html';
        }
    }
});
