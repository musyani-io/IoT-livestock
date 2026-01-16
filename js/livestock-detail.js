/**
 * Livestock Detail Page Module
 * Handles individual animal detail view with charts
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
    
    // Get selected animal
    const animalId = sessionStorage.getItem('selectedAnimal') || 'COW-001';
    const animal = getLivestockById(animalId);
    
    if (animal) {
        renderAnimalDetail(animal);
        initCharts(animalId);
        initPeriodButtons();
    }
});

// Render animal details
function renderAnimalDetail(animal) {
    // Header
    document.getElementById('animalId').textContent = animal.id;
    document.getElementById('animalType').textContent = `${animal.type} • ${animal.age}`;
    
    // Update status badge
    const statusBadge = document.getElementById('animalStatus');
    statusBadge.className = `status-badge status-${animal.status}`;
    statusBadge.innerHTML = `
        <i class="fas ${animal.status === 'normal' ? 'fa-check-circle' : animal.status === 'warning' ? 'fa-exclamation-circle' : 'fa-times-circle'}"></i>
        ${animal.statusText}
    `;
    
    // Current readings
    document.getElementById('bodyTemp').textContent = `${animal.temperature}°C`;
    document.getElementById('bodyTemp').className = `status-value ${animal.temperature > 39.5 ? 'high' : animal.temperature < 38 ? 'low' : 'normal'}`;
    
    document.getElementById('activityLevel').textContent = animal.activity;
    document.getElementById('activityLevel').className = `status-value ${animal.activity === 'Low' || animal.activity === 'Very Low' ? 'low' : 'normal'}`;
    
    document.getElementById('rumination').textContent = animal.rumination;
    document.getElementById('rumination').className = `status-value ${animal.rumination === 'Reduced' ? 'low' : 'normal'}`;
    
    document.getElementById('lastUpdated').textContent = animal.lastUpdate;
}

// Initialize charts
function initCharts(animalId) {
    // Temperature Chart
    const tempCtx = document.getElementById('tempChart').getContext('2d');
    
    const tempData = TEMPERATURE_HISTORY.datasets[animalId] || [38.5, 38.5, 38.6, 38.5, 38.4, 38.5, 38.5];
    
    window.tempChart = new Chart(tempCtx, {
        type: 'line',
        data: {
            labels: TEMPERATURE_HISTORY.labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: tempData,
                borderColor: '#F44336',
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#F44336',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    min: 37,
                    max: 42,
                    ticks: {
                        callback: value => value + '°C'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
    
    // Activity Chart
    const activityCtx = document.getElementById('activityChart').getContext('2d');
    
    const activityData = ACTIVITY_HISTORY.datasets[animalId] || [65, 70, 75, 80, 75, 70, 65];
    
    window.activityChart = new Chart(activityCtx, {
        type: 'bar',
        data: {
            labels: ACTIVITY_HISTORY.labels,
            datasets: [{
                label: 'Activity Level',
                data: activityData,
                backgroundColor: 'rgba(46, 125, 50, 0.7)',
                borderColor: '#2E7D32',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        callback: value => value + '%'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Initialize period buttons
function initPeriodButtons() {
    const periodBtns = document.querySelectorAll('.period-btn');
    
    periodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.closest('.chart-period');
            parent.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, this would fetch new data based on the period
            // For demo, we just update the UI
            const period = this.dataset.period;
            console.log('Selected period:', period);
        });
    });
}

// Action functions
function markAsChecked() {
    alert('Animal marked as checked. Status will be updated.');
}

function isolateAnimal() {
    if (confirm('Are you sure you want to mark this animal for isolation?')) {
        alert('Animal has been flagged for isolation. Please move the animal to a separate area.');
    }
}

function contactVet() {
    alert('Veterinary contact information:\n\nDr. Abebe Bekele\nPhone: +251 911 234 567\n\nAlternative:\nDistrict Vet Office: +251 911 987 654');
}

function viewFullHistory() {
    alert('Full history view would show complete health records, vaccination history, and all past alerts for this animal.');
}
