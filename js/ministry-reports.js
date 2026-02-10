/**
 * Ministry Reports Module
 * Handles report generation and management
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
    
    // Initialize reports page
    initReportsPage();
});

function initReportsPage() {
    initSidebar();
    updateCurrentDate();
    initDateInputs();
}

// Initialize date inputs
function initDateInputs() {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const endDate = document.getElementById('endDate');
    const startDate = document.getElementById('startDate');
    
    if (endDate) {
        endDate.value = today.toISOString().split('T')[0];
    }
    if (startDate) {
        startDate.value = thirtyDaysAgo.toISOString().split('T')[0];
    }
    
    // Handle period selection
    const periodSelect = document.getElementById('reportPeriod');
    if (periodSelect) {
        periodSelect.addEventListener('change', function() {
            const startEl = document.getElementById('startDate');
            const endEl = document.getElementById('endDate');
            
            if (this.value === 'custom') {
                startEl.disabled = false;
                endEl.disabled = false;
            } else {
                startEl.disabled = true;
                endEl.disabled = true;
                updateDateRange(this.value, startEl, endEl);
            }
        });
    }
}

// Update date range based on period
function updateDateRange(period, startEl, endEl) {
    const today = new Date();
    let startDate;
    
    switch(period) {
        case 'daily':
            startDate = new Date(today);
            break;
        case 'weekly':
            startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
        case 'monthly':
            startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            break;
        case 'quarterly':
            startDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
            break;
        default:
            startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
    
    startEl.value = startDate.toISOString().split('T')[0];
    endEl.value = today.toISOString().split('T')[0];
}

// Generate report
function generateReport() {
    const reportType = document.getElementById('reportType')?.value || 'summary';
    const reportPeriod = document.getElementById('reportPeriod')?.value || 'monthly';
    const reportRegion = document.getElementById('reportRegion')?.value || 'all';
    const reportFormat = document.getElementById('reportFormat')?.value || 'pdf';
    const startDate = document.getElementById('startDate')?.value || '';
    const endDate = document.getElementById('endDate')?.value || '';
    
    const regionDisplay = reportRegion === 'all' ? 'All Regions' : reportRegion.charAt(0).toUpperCase() + reportRegion.slice(1);
    
    alert(`Generating ${reportType} report:\n\n` +
        `Region: ${regionDisplay}\n` +
        `Period: ${reportPeriod}\n` +
        `Format: ${reportFormat.toUpperCase()}\n` +
        `Date Range: ${startDate} to ${endDate}\n\n` +
        `✓ Report will include only aggregated and anonymized data\n` +
        `✓ No individual farmer information will be included\n` +
        `✓ Download will begin shortly...`);
}

// Update current date
function updateCurrentDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateElements = document.querySelectorAll('#currentDate');
    const today = new Date().toLocaleDateString('en-US', options);
    dateElements.forEach(el => el.textContent = today);
}

// Initialize sidebar
function initSidebar() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
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

// Handle report item download
function downloadReport(event) {
    const button = event.target.closest('.btn-primary');
    if (button) {
        const reportItem = button.closest('.report-item');
        const reportName = reportItem.querySelector('.report-item-name').textContent;
        alert(`Downloading: ${reportName}\n\nThis contains aggregated data only - no individual farm details.`);
    }
}

// Add event listeners to report download buttons
document.addEventListener('click', function(e) {
    if (e.target.closest('.report-item .btn-primary')) {
        downloadReport(e);
    }
});
