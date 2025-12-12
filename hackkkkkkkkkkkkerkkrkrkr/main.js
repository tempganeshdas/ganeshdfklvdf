// Climate Action Hub - Main JavaScript
class ClimateActionHub {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.initializeAnimations();
        this.startDataUpdates();
    }

    init() {
        // Initialize particle system
        this.createParticleSystem();
        
        // Initialize text splitting
        if (typeof Splitting !== 'undefined') {
            Splitting();
        }
        
        // Initialize charts
        this.initializeCharts();
        
        // Initialize carousel
        this.initializeCarousel();
        
        // Setup scroll reveal
        this.setupScrollReveal();
    }

    createParticleSystem() {
        const particleContainer = document.getElementById('particles');
        if (!particleContainer) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particleContainer.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 20000);
        };

        // Create initial particles
        for (let i = 0; i < 20; i++) {
            setTimeout(createParticle, i * 500);
        }

        // Continue creating particles
        setInterval(createParticle, 2000);
    }

    initializeCharts() {
        // AQI Chart
        const aqiChart = echarts.init(document.getElementById('aqi-chart'));
        const aqiOption = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: '#1B4332',
                textStyle: { color: '#1B4332' }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                axisLine: { lineStyle: { color: '#1B4332' } },
                axisLabel: { color: '#1B4332' }
            },
            yAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: '#1B4332' } },
                axisLabel: { color: '#1B4332' },
                splitLine: { lineStyle: { color: '#f0f0f0' } }
            },
            series: [{
                name: 'AQI',
                type: 'line',
                data: [38, 42, 45, 52, 48, 44, 42],
                smooth: true,
                lineStyle: { color: '#059669', width: 3 },
                itemStyle: { color: '#059669' },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(5, 150, 105, 0.3)' },
                            { offset: 1, color: 'rgba(5, 150, 105, 0.05)' }
                        ]
                    }
                }
            }]
        };
        aqiChart.setOption(aqiOption);

        // Weather Chart
        const weatherChart = echarts.init(document.getElementById('weather-chart'));
        const weatherOption = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: '#1B4332',
                textStyle: { color: '#1B4332' }
            },
            legend: {
                data: ['Temperature', 'Humidity'],
                textStyle: { color: '#1B4332' }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                axisLine: { lineStyle: { color: '#1B4332' } },
                axisLabel: { color: '#1B4332' }
            },
            yAxis: [{
                type: 'value',
                name: 'Temperature (°C)',
                axisLine: { lineStyle: { color: '#2E86AB' } },
                axisLabel: { color: '#2E86AB' },
                splitLine: { lineStyle: { color: '#f0f0f0' } }
            }, {
                type: 'value',
                name: 'Humidity (%)',
                axisLine: { lineStyle: { color: '#D4A574' } },
                axisLabel: { color: '#D4A574' }
            }],
            series: [{
                name: 'Temperature',
                type: 'line',
                yAxisIndex: 0,
                data: [18, 16, 15, 22, 24, 23, 22],
                smooth: true,
                lineStyle: { color: '#2E86AB', width: 3 },
                itemStyle: { color: '#2E86AB' }
            }, {
                name: 'Humidity',
                type: 'line',
                yAxisIndex: 1,
                data: [70, 75, 80, 65, 60, 62, 65],
                smooth: true,
                lineStyle: { color: '#D4A574', width: 3 },
                itemStyle: { color: '#D4A574' }
            }]
        };
        weatherChart.setOption(weatherOption);

        // Make charts responsive
        window.addEventListener('resize', () => {
            aqiChart.resize();
            weatherChart.resize();
        });
    }

    initializeCarousel() {
        const carousel = document.getElementById('climate-carousel');
        if (!carousel) return;

        new Splide(carousel, {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
                1024: { perPage: 2 },
                640: { perPage: 1 }
            }
        }).mount();
    }

    setupScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Metric card interactions
        document.querySelectorAll('.metric-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });

            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initializeAnimations() {
        // Animate hero text
        if (typeof Splitting !== 'undefined') {
            anime.timeline()
                .add({
                    targets: '[data-splitting] .char',
                    translateY: [100, 0],
                    opacity: [0, 1],
                    duration: 1000,
                    delay: anime.stagger(50),
                    easing: 'easeOutExpo'
                });
        }

        // Animate metric cards on load
        anime({
            targets: '.metric-card',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(200, {start: 500}),
            easing: 'easeOutCubic'
        });

        // Animate data streams
        anime({
            targets: '.data-stream',
            translateX: [-20, 0],
            opacity: [0, 1],
            duration: 600,
            delay: anime.stagger(100, {start: 1000}),
            easing: 'easeOutCubic'
        });
    }

    startDataUpdates() {
        // Simulate real-time data updates
        setInterval(() => {
            this.updateEnvironmentalData();
        }, 30000); // Update every 30 seconds

        // Update timestamp
        this.updateTimestamp();
        setInterval(() => {
            this.updateTimestamp();
        }, 60000); // Update every minute
    }

    updateEnvironmentalData() {
        // Simulate small variations in environmental data
        const aqi = document.getElementById('aqi-value');
        const temp = document.getElementById('temp-value');
        const humidity = document.getElementById('humidity-value');
        const aqiDisplay = document.getElementById('aqi-display');
        const tempDisplay = document.getElementById('temp-display');
        const humidityDisplay = document.getElementById('humidity-display');
        const uvDisplay = document.getElementById('uv-display');

        if (aqi && aqiDisplay) {
            const newAqi = Math.floor(Math.random() * 20) + 35; // 35-55 range
            aqi.textContent = newAqi;
            aqiDisplay.textContent = newAqi;
        }

        if (temp && tempDisplay) {
            const newTemp = Math.floor(Math.random() * 6) + 20; // 20-26 range
            temp.textContent = newTemp + '°C';
            tempDisplay.textContent = newTemp + '°C';
        }

        if (humidity && humidityDisplay) {
            const newHumidity = Math.floor(Math.random() * 20) + 60; // 60-80 range
            humidity.textContent = newHumidity + '%';
            humidityDisplay.textContent = newHumidity + '%';
        }

        if (uvDisplay) {
            const newUv = Math.floor(Math.random() * 3) + 2; // 2-5 range
            uvDisplay.textContent = newUv;
        }

        // Animate the update
        anime({
            targets: '.metric-card',
            scale: [1, 1.05, 1],
            duration: 600,
            easing: 'easeInOutQuad'
        });
    }

    updateTimestamp() {
        const lastUpdated = document.getElementById('last-updated');
        if (lastUpdated) {
            lastUpdated.textContent = 'Just now';
        }
    }

    // Utility functions for other pages
    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg text-white max-w-sm ${
            type === 'success' ? 'bg-success-green' : 
            type === 'error' ? 'bg-alert-red' : 
            type === 'warning' ? 'bg-yellow-500' : 'bg-ocean'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutCubic'
        });

        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 300],
                opacity: [1, 0],
                duration: 500,
                easing: 'easeInCubic',
                complete: () => {
                    document.body.removeChild(notification);
                }
            });
        }, 4000);
    }

    static formatNumber(num, decimals = 1) {
        return parseFloat(num).toFixed(decimals);
    }

    static calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
}

// Community Reporting System
class CommunityReporting {
    constructor() {
        this.reports = this.loadReports();
        this.currentLocation = null;
        this.map = null;
    }

    loadReports() {
        const saved = localStorage.getItem('community-reports');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Sample data for demonstration
        return [
            {
                id: 1,
                type: 'pollution',
                title: 'Industrial Waste in River',
                description: 'Noticed discoloration and unusual smell from the industrial area near the river.',
                location: { lat: 40.7128, lng: -74.0060 },
                severity: 'high',
                status: 'reported',
                timestamp: new Date('2025-01-10T10:30:00'),
                upvotes: 12,
                image: 'https://kimi-web-img.moonshot.cn/img/www.coloradohealthinstitute.org/be32c697c9173ab9f1d333601c4c3d44bc3c0abb.jpg'
            },
            {
                id: 2,
                type: 'flooding',
                title: 'Street Flooding After Rain',
                description: 'Persistent flooding issue on Main Street after heavy rainfall.',
                location: { lat: 40.7589, lng: -73.9851 },
                severity: 'medium',
                status: 'investigating',
                timestamp: new Date('2025-01-11T14:15:00'),
                upvotes: 8,
                image: 'https://kimi-web-img.moonshot.cn/img/images.ctfassets.net/e9bb939f4b66fe1459f9de129744704f7dd4a3b9.jpg'
            }
        ];
    }

    saveReports() {
        localStorage.setItem('community-reports', JSON.stringify(this.reports));
    }

    addReport(reportData) {
        const newReport = {
            id: Date.now(),
            ...reportData,
            timestamp: new Date(),
            upvotes: 0,
            status: 'reported'
        };
        
        this.reports.unshift(newReport);
        this.saveReports();
        return newReport;
    }

    upvoteReport(reportId) {
        const report = this.reports.find(r => r.id === reportId);
        if (report) {
            report.upvotes++;
            this.saveReports();
            return report.upvotes;
        }
        return 0;
    }
}

// Carbon Footprint Calculator
class CarbonCalculator {
    constructor() {
        this.emissionFactors = {
            electricity: 0.5, // kg CO2 per kWh
            gas: 2.3, // kg CO2 per liter
            flight: 0.25, // kg CO2 per km
            car: 0.21, // kg CO2 per km
            bus: 0.08, // kg CO2 per km
            train: 0.04, // kg CO2 per km
            meat: 15.5, // kg CO2 per kg
            dairy: 9.1, // kg CO2 per kg
            vegetables: 2.0, // kg CO2 per kg
            waste: 0.5 // kg CO2 per kg
        };
    }

    calculateFootprint(data) {
        let totalEmissions = 0;
        const breakdown = {};

        // Electricity consumption
        if (data.electricity) {
            const emissions = data.electricity * this.emissionFactors.electricity * 12; // Monthly to yearly
            breakdown.electricity = emissions;
            totalEmissions += emissions;
        }

        // Transportation
        if (data.carKm) {
            const emissions = data.carKm * this.emissionFactors.car * 52; // Weekly to yearly
            breakdown.car = emissions;
            totalEmissions += emissions;
        }

        if (data.flightKm) {
            const emissions = data.flightKm * this.emissionFactors.flight;
            breakdown.flight = emissions;
            totalEmissions += emissions;
        }

        if (data.publicTransportKm) {
            const emissions = data.publicTransportKm * this.emissionFactors.bus * 52;
 breakdown.publicTransport = emissions;
            totalEmissions += emissions;
        }

        // Diet
        if (data.meatConsumption) {
            const emissions = data.meatConsumption * this.emissionFactors.meat * 52;
            breakdown.meat = emissions;
            totalEmissions += emissions;
        }

        if (data.dairyConsumption) {
            const emissions = data.dairyConsumption * this.emissionFactors.dairy * 52;
            breakdown.dairy = emissions;
            totalEmissions += emissions;
        }

        // Waste
        if (data.wasteKg) {
            const emissions = data.wasteKg * this.emissionFactors.waste * 52;
            breakdown.waste = emissions;
            totalEmissions += emissions;
        }

        return {
            total: ClimateActionHub.formatNumber(totalEmissions),
            breakdown: Object.fromEntries(
                Object.entries(breakdown).map(([key, value]) => [key, ClimateActionHub.formatNumber(value)])
            ),
            recommendations: this.getRecommendations(totalEmissions, breakdown)
        };
    }

    getRecommendations(total, breakdown) {
        const recommendations = [];
        const avgGlobal = 5000; // kg CO2 per year (global average)

        if (total > avgGlobal) {
            recommendations.push({
                type: 'priority',
                title: 'Reduce Overall Emissions',
                description: 'Your carbon footprint is above the global average. Focus on the highest emission sources.',
                actions: ['Consider renewable energy options', 'Use public transport more often', 'Reduce meat consumption']
            });
        }

        const maxCategory = Object.entries(breakdown).reduce((a, b) => breakdown[a[0]] > breakdown[b[0]] ? a : b);
        
        if (maxCategory[0] === 'flight') {
            recommendations.push({
                type: 'transport',
                title: 'Reduce Air Travel',
                description: 'Air travel contributes significantly to your carbon footprint.',
                actions: ['Choose train over plane for shorter trips', 'Combine multiple trips', 'Consider video conferencing']
            });
        }

        if (maxCategory[0] === 'electricity') {
            recommendations.push({
                type: 'energy',
                title: 'Improve Energy Efficiency',
                description: 'Your electricity consumption is the largest emission source.',
                actions: ['Switch to LED bulbs', 'Unplug unused devices', 'Consider solar panels']
            });
        }

        return recommendations;
    }
}

// Environmental Map System
class EnvironmentalMap {
    constructor() {
        this.map = null;
        this.markers = [];
        this.layers = {
            aqi: [],
            disasters: [],
            reports: [],
            pollution: []
        };
    }

    initializeMap(containerId) {
        if (typeof L === 'undefined') return;

        this.map = L.map(containerId).setView([40.7128, -74.0060], 10);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        this.addEnvironmentalData();
        this.setupLayerControls();
    }

    addEnvironmentalData() {
        // Sample AQI data
        const aqiData = [
            { lat: 40.7128, lng: -74.0060, value: 42, level: 'Good' },
            { lat: 40.7589, lng: -73.9851, value: 58, level: 'Moderate' },
            { lat: 40.6782, lng: -73.9442, value: 35, level: 'Good' }
        ];

        aqiData.forEach(point => {
            const color = point.level === 'Good' ? '#059669' : '#D4A574';
            const circle = L.circleMarker([point.lat, point.lng], {
                color: color,
                fillColor: color,
                fillOpacity: 0.6,
                radius: 10
            }).bindPopup(`AQI: ${point.value} - ${point.level}`);
            
            this.layers.aqi.push(circle);
            circle.addTo(this.map);
        });

        // Sample disaster zones
        const disasterData = [
            { lat: 40.7282, lng: -73.9942, type: 'flood', severity: 'medium' },
            { lat: 40.7505, lng: -73.9934, type: 'pollution', severity: 'high' }
        ];

        disasterData.forEach(disaster => {
            const color = disaster.severity === 'high' ? '#DC2626' : '#D4A574';
            const marker = L.marker([disaster.lat, disaster.lng], {
                icon: L.divIcon({
                    className: 'disaster-marker',
                    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
                    iconSize: [20, 20]
                })
            }).bindPopup(`${disaster.type.toUpperCase()} - Severity: ${disaster.severity}`);
            
            this.layers.disasters.push(marker);
            marker.addTo(this.map);
        });
    }

    setupLayerControls() {
        // Layer control implementation would go here
        // For now, all layers are visible by default
    }

    toggleLayer(layerType) {
        this.layers[layerType].forEach(item => {
            if (this.map.hasLayer(item)) {
                this.map.removeLayer(item);
            } else {
                item.addTo(this.map);
            }
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main application
    window.climateHub = new ClimateActionHub();
    
    // Initialize other systems
    window.communityReporting = new CommunityReporting();
    window.carbonCalculator = new CarbonCalculator();
    window.environmentalMap = new EnvironmentalMap();
    
    // Add global error handling
    window.addEventListener('error', (e) => {
        console.error('Application error:', e.error);
        ClimateActionHub.showNotification('An error occurred. Please refresh the page.', 'error');
    });
    
    // Add offline detection
    window.addEventListener('online', () => {
        ClimateActionHub.showNotification('Connection restored', 'success');
    });
    
    window.addEventListener('offline', () => {
        ClimateActionHub.showNotification('Working offline - some features may be limited', 'warning');
    });
});

// Export for use in other pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ClimateActionHub,
        CommunityReporting,
        CarbonCalculator,
        EnvironmentalMap
    };
}