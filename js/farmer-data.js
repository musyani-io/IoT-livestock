/**
 * Farmer Data Module
 * Mock data for farmer dashboard
 */

const LIVESTOCK_DATA = [
    {
        id: 'COW-001',
        type: 'Dairy Cow',
        age: '3 years',
        icon: 'fa-cow',
        status: 'warning',
        statusText: 'Warning',
        temperature: 39.8,
        activity: 'Low',
        rumination: 'Normal',
        lastUpdate: '5 min ago'
    },
    {
        id: 'COW-002',
        type: 'Dairy Cow',
        age: '4 years',
        icon: 'fa-cow',
        status: 'normal',
        statusText: 'Normal',
        temperature: 38.5,
        activity: 'Normal',
        rumination: 'Normal',
        lastUpdate: '3 min ago'
    },
    {
        id: 'COW-003',
        type: 'Beef Cattle',
        age: '2 years',
        icon: 'fa-cow',
        status: 'alert',
        statusText: 'Alert',
        temperature: 40.5,
        activity: 'Very Low',
        rumination: 'Reduced',
        lastUpdate: '1 min ago'
    },
    {
        id: 'COW-004',
        type: 'Dairy Cow',
        age: '5 years',
        icon: 'fa-cow',
        status: 'normal',
        statusText: 'Normal',
        temperature: 38.3,
        activity: 'Normal',
        rumination: 'Normal',
        lastUpdate: '7 min ago'
    },
    {
        id: 'GOAT-001',
        type: 'Dairy Goat',
        age: '2 years',
        icon: 'fa-deer',
        status: 'normal',
        statusText: 'Normal',
        temperature: 39.0,
        activity: 'High',
        rumination: 'Normal',
        lastUpdate: '4 min ago'
    },
    {
        id: 'GOAT-002',
        type: 'Boer Goat',
        age: '1 year',
        icon: 'fa-deer',
        status: 'warning',
        statusText: 'Warning',
        temperature: 39.6,
        activity: 'Low',
        rumination: 'Reduced',
        lastUpdate: '8 min ago'
    },
    {
        id: 'SHEEP-001',
        type: 'Dorper Sheep',
        age: '3 years',
        icon: 'fa-sheep',
        status: 'normal',
        statusText: 'Normal',
        temperature: 39.2,
        activity: 'Normal',
        rumination: 'Normal',
        lastUpdate: '2 min ago'
    },
    {
        id: 'SHEEP-002',
        type: 'Merino Sheep',
        age: '2 years',
        icon: 'fa-sheep',
        status: 'normal',
        statusText: 'Normal',
        temperature: 38.9,
        activity: 'Normal',
        rumination: 'Normal',
        lastUpdate: '6 min ago'
    },
    {
        id: 'COW-005',
        type: 'Dairy Cow',
        age: '6 years',
        icon: 'fa-cow',
        status: 'normal',
        statusText: 'Normal',
        temperature: 38.4,
        activity: 'Normal',
        rumination: 'Normal',
        lastUpdate: '10 min ago'
    },
    {
        id: 'COW-006',
        type: 'Beef Cattle',
        age: '3 years',
        icon: 'fa-cow',
        status: 'normal',
        statusText: 'Normal',
        temperature: 38.6,
        activity: 'High',
        rumination: 'Normal',
        lastUpdate: '5 min ago'
    },
    {
        id: 'GOAT-003',
        type: 'Alpine Goat',
        age: '4 years',
        icon: 'fa-deer',
        status: 'normal',
        statusText: 'Normal',
        temperature: 38.8,
        activity: 'Normal',
        rumination: 'Normal',
        lastUpdate: '12 min ago'
    },
    {
        id: 'GOAT-004',
        type: 'Dairy Goat',
        age: '2 years',
        icon: 'fa-deer',
        status: 'normal',
        statusText: 'Normal',
        temperature: 39.1,
        activity: 'Normal',
        rumination: 'Normal',
        lastUpdate: '9 min ago'
    }
];

const ALERTS_DATA = [
    {
        id: 1,
        type: 'alert',
        icon: 'fa-exclamation-circle',
        title: 'High Temperature Alert',
        description: 'COW-003 temperature is 40.5°C - significantly above normal range',
        time: '15 minutes ago',
        animalId: 'COW-003',
        smsSent: true
    },
    {
        id: 2,
        type: 'warning',
        icon: 'fa-exclamation-triangle',
        title: 'Low Activity Detected',
        description: 'COW-001 showing reduced movement for the past 6 hours',
        time: '2 hours ago',
        animalId: 'COW-001',
        smsSent: true
    },
    {
        id: 3,
        type: 'warning',
        icon: 'fa-exclamation-triangle',
        title: 'Rumination Pattern Change',
        description: 'GOAT-002 showing irregular rumination patterns',
        time: '4 hours ago',
        animalId: 'GOAT-002',
        smsSent: false
    }
];

const RECOMMENDATIONS_DATA = [
    {
        id: 1,
        icon: 'fa-eye',
        iconClass: 'urgent',
        action: 'Check COW-003 immediately',
        detail: 'High temperature detected - may indicate infection'
    },
    {
        id: 2,
        icon: 'fa-shield-alt',
        iconClass: 'warning',
        action: 'Consider isolating COW-001',
        detail: 'Low activity may indicate illness - prevent spread'
    },
    {
        id: 3,
        icon: 'fa-phone',
        iconClass: '',
        action: 'Contact veterinary officer',
        detail: 'Multiple animals showing warning signs'
    }
];

// Temperature history data for charts (24 hours)
const TEMPERATURE_HISTORY = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
    datasets: {
        'COW-001': [38.4, 38.5, 38.7, 39.2, 39.5, 39.7, 39.8],
        'COW-003': [38.6, 38.9, 39.5, 40.0, 40.3, 40.4, 40.5]
    }
};

// Activity history data for charts
const ACTIVITY_HISTORY = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
    datasets: {
        'COW-001': [60, 45, 35, 30, 25, 20, 15],
        'COW-003': [70, 55, 40, 30, 20, 15, 10]
    }
};

// Get livestock stats
function getLivestockStats() {
    const total = LIVESTOCK_DATA.length;
    const normal = LIVESTOCK_DATA.filter(a => a.status === 'normal').length;
    const warning = LIVESTOCK_DATA.filter(a => a.status === 'warning').length;
    const alert = LIVESTOCK_DATA.filter(a => a.status === 'alert').length;
    
    return { total, normal, warning, alert };
}

// Get livestock by filter
function getLivestockByFilter(filter) {
    if (filter === 'all') return LIVESTOCK_DATA;
    return LIVESTOCK_DATA.filter(a => a.status === filter);
}

// Get livestock by ID
function getLivestockById(id) {
    return LIVESTOCK_DATA.find(a => a.id === id);
}

// Get alerts by filter
function getAlertsByFilter(filter) {
    if (filter === 'all') return ALERTS_DATA;
    return ALERTS_DATA.filter(a => a.type === filter);
}
