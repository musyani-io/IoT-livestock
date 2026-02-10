/**
 * Ministry Dashboard Module
 * Handles rendering charts and statistics for ministry overview
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const user = checkAuth();
    if (!user) return;
    
    // Check role
    if (user.role !== 'ministry') {
        window.location.href = 'farmer-dashboard.html';
        return;
    }
    
    // Initialize dashboard
    initMinistryDashboard();
});

function initMinistryDashboard() {
    updateCurrentDate();
    initCharts();
    initSidebar();
}

// Update current date
function updateCurrentDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateElements = document.querySelectorAll('#currentDate');
    const today = new Date().toLocaleDateString('en-US', options);
    dateElements.forEach(el => el.textContent = today);
}

// Initialize charts
function initCharts() {
    // Trend Chart
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx) {
        const trendData = getDiseaseTrends();
        
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: trendData.labels,
                datasets: [
                    {
                        label: 'High Fever',
                        data: trendData.datasets.fever,
                        borderColor: '#F44336',
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Respiratory',
                        data: trendData.datasets.respiratory,
                        borderColor: '#FF9800',
                        backgroundColor: 'rgba(255, 152, 0, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Digestive',
                        data: trendData.datasets.digestive,
                        borderColor: '#2196F3',
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        }
                    }
                }
            }
        });
    }
    
    // Alert Distribution Chart
    const distCtx = document.getElementById('alertDistChart');
    if (distCtx) {
        const distData = getAlertDistribution();
        
        new Chart(distCtx, {
            type: 'doughnut',
            data: {
                labels: distData.labels,
                datasets: [{
                    data: distData.data,
                    backgroundColor: [
                        '#F44336',
                        '#FFC107',
                        '#FF9800',
                        '#2196F3',
                        '#4CAF50',
                        '#9C27B0'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
}

// Initialize sidebar
function initSidebar() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Close sidebar on link click (mobile)
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Generate report
function generateReport(type) {
    let reportType = type || 'summary';
    alert(`Generating ${reportType} report...\n\nReport will be downloaded as PDF with aggregated and anonymized data.`);
}

// Export data
function exportData() {
    alert('Exporting aggregated data as CSV...\n\nThis export contains only anonymized regional statistics, no individual farmer data.');
}
