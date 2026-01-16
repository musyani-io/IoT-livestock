/**
 * Ministry Data Module
 * Mock aggregated data for ministry dashboard
 * Note: All data is aggregated and anonymized - no individual farmer data
 */

const REGIONAL_DATA = {
    dar: {
        name: 'Dar es Salaam',
        monitored: 8245,
        healthy: 7822,
        alerts: 423,
        riskLevel: 'medium',
        trend: '+2.3%',
        trendDirection: 'up'
    },
    arusha: {
        name: 'Arusha',
        monitored: 6892,
        healthy: 6580,
        alerts: 312,
        riskLevel: 'low',
        trend: '-1.8%',
        trendDirection: 'down'
    },
    mbeya: {
        name: 'Mbeya',
        monitored: 4521,
        healthy: 4132,
        alerts: 389,
        riskLevel: 'high',
        trend: '+5.1%',
        trendDirection: 'up'
    },
    dodoma: {
        name: 'Dodoma',
        monitored: 2876,
        healthy: 2720,
        alerts: 156,
        riskLevel: 'low',
        trend: '-0.5%',
        trendDirection: 'down'
    },
    kilimanjaro: {
        name: 'Kilimanjaro',
        monitored: 2322,
        healthy: 2174,
        alerts: 148,
        riskLevel: 'medium',
        trend: '-1.2%',
        trendDirection: 'down'
    },
    iringa: {
        name: 'Iringa',
        monitored: 1456,
        healthy: 1389,
        alerts: 67,
        riskLevel: 'low',
        trend: '-0.3%',
        trendDirection: 'down'
    },
    mwanza: {
        name: 'Mwanza',
        monitored: 1234,
        healthy: 1122,
        alerts: 112,
        riskLevel: 'high',
        trend: '+4.2%',
        trendDirection: 'up'
    },
    tanga: {
        name: 'Tanga',
        monitored: 987,
        healthy: 935,
        alerts: 52,
        riskLevel: 'medium',
        trend: '+1.5%',
        trendDirection: 'up'
    }
};

const NATIONAL_STATS = {
    totalMonitored: 24856,
    healthyAnimals: 23142,
    activeAlerts: 1428,
    highRiskAreas: 8
};

const DISEASE_TRENDS = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: {
        respiratory: [120, 145, 132, 158],
        digestive: [89, 96, 112, 105],
        fever: [210, 234, 245, 267],
        skin: [67, 78, 89, 95]
    }
};

const ALERT_DISTRIBUTION = {
    labels: ['High Fever', 'Low Activity', 'Respiratory', 'Digestive', 'Skin Issues', 'Other'],
    data: [35, 25, 18, 12, 6, 4]
};

// Get total national statistics
function getNationalStats() {
    return NATIONAL_STATS;
}

// Get regional data by ID
function getRegionalData(regionId) {
    return REGIONAL_DATA[regionId] || null;
}

// Get all regional data
function getAllRegionalData() {
    return Object.values(REGIONAL_DATA);
}

// Get disease trends data
function getDiseaseTrends() {
    return DISEASE_TRENDS;
}

// Get alert distribution
function getAlertDistribution() {
    return ALERT_DISTRIBUTION;
}
