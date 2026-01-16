/**
 * Farmer Alerts Page Module
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const user = checkAuth();
    if (!user) return;
    
    // Check role
    if (user.role !== 'farmer') {
        window.location.href = 'ministry-dashboard.html';
        return;
    }
    
    // Initialize page
    initFilters();
    initSearch();
});

// Initialize filter tabs
function initFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterAlerts(filter);
        });
    });
}

// Filter alerts
function filterAlerts(filter) {
    const alerts = document.querySelectorAll('.alert-card');
    
    alerts.forEach(alert => {
        const status = alert.dataset.status;
        
        if (filter === 'all' || status === filter) {
            alert.style.display = 'block';
        } else {
            alert.style.display = 'none';
        }
    });
}

// Initialize search
function initSearch() {
    const searchInput = document.getElementById('alertSearch');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const alerts = document.querySelectorAll('.alert-card');
        
        alerts.forEach(alert => {
            const title = alert.querySelector('.alert-title').textContent.toLowerCase();
            const description = alert.querySelector('.alert-description').textContent.toLowerCase();
            
            if (title.includes(query) || description.includes(query)) {
                alert.style.display = 'block';
            } else {
                alert.style.display = 'none';
            }
        });
    });
}
