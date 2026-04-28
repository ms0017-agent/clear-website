// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Scroll Animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.pillar-card, .stat-card, .member-card, .timeline-item').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 11, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 11, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Replace YOUR_FORMSPREE_ID with actual Formspree form ID
    // Or use mailto: fallback
    const formspreeId = 'YOUR_FORMSPREE_ID';
    
    if (formspreeId !== 'YOUR_FORMSPREE_ID') {
        try {
            const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                alert('Thank you for your interest in CLEAR! We will be in touch soon.');
                contactForm.reset();
            } else {
                alert('There was an issue sending your message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an issue sending your message. Please try again.');
        }
    } else {
        // Fallback: mailto link
        const subject = encodeURIComponent(`CLEAR Inquiry from ${data.name}`);
        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n` +
            `Affiliation: ${data.affiliation}\n` +
            `Interest: ${data.interest}\n\n` +
            `Message:\n${data.message}`
        );
        window.location.href = `mailto:clear@africanlanguageslab.com?subject=${subject}&body=${body}`;
        alert('Opening your email client to send the message...');
        contactForm.reset();
    }
});

// Add loading state to buttons
document.querySelectorAll('button[type="submit"], .btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            const originalText = this.textContent;
            this.classList.add('loading');
            this.dataset.originalText = originalText;
            
            setTimeout(() => {
                this.classList.remove('loading');
            }, 2000);
        }
    });
});

// ============================================
// LEADERBOARD - Chart.js Performance Chart
// ============================================
const performanceCtx = document.getElementById('performanceChart');
if (performanceCtx) {
    const performanceData = {
        labels: ['Gemma-3-27B', 'Claude-Opus-4.7', 'GPT-4.5', 'MansaLLM-30B', 'Llama-3.1-70B'],
        datasets: [
            {
                label: 'African Languages',
                data: [82.1, 79.4, 77.8, 88.4, 65.2],
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                borderRadius: 4,
            },
            {
                label: 'Asian Languages',
                data: [85.7, 83.2, 81.9, 71.3, 70.4],
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                borderRadius: 4,
            },
            {
                label: 'European Languages',
                data: [94.2, 95.1, 94.8, 68.9, 85.6],
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                borderRadius: 4,
            }
        ]
    };

    const performanceConfig = {
        type: 'bar',
        data: performanceData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: "'Inter', sans-serif",
                            size: 12
                        },
                        usePointStyle: true,
                        padding: 15
                    }
                },
                title: {
                    display: true,
                    text: 'Model Performance by Language Family',
                    font: {
                        family: "'Inter', sans-serif",
                        size: 14,
                        weight: '600'
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        font: {
                            family: "'Inter', sans-serif",
                            size: 11
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: "'Inter', sans-serif",
                            size: 11
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    };

    new Chart(performanceCtx, performanceConfig);
}

// ============================================
// LEADERBOARD - Filter Functionality
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const tableRows = document.querySelectorAll('.leaderboard-table tbody tr');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        
        // In a real implementation, this would filter the chart and table
        // For now, we'll just show all data
        console.log(`Filtering by: ${filter}`);
    });
});

// ============================================
// D3.js WORLD MAP - AI Performance by Region
// ============================================
const mapContainer = document.getElementById('worldMap');
if (mapContainer) {
    const width = mapContainer.clientWidth || 600;
    const height = 400;

    const svg = d3.select('#worldMap')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');

    const g = svg.append('g');

    // Color scale for performance levels
    const colorScale = d3.scaleQuantize()
        .domain([50, 100])
        .range([
            '#fee0d2',  // Low
            '#fc9272',
            '#fb6a4a',
            '#ef3b2c',
            '#cb181d',  // High
        ]);

    const projection = d3.geoNaturalEarth1()
        .scale(width / 5.5)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Add world map title
    g.append('text')
        .attr('class', 'map-title')
        .attr('x', width / 2)
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('font-weight', '600')
        .style('font-family', "'Inter', sans-serif")
        .text('AI Performance by Region');

    // Load and draw world map
    fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json')
        .then(response => response.json())
        .then(worldData => {
            const countries = topojson.feature(worldData, worldData.objects.countries);

            g.selectAll('path')
                .data(countries.features)
                .join('path')
                .attr('d', path)
                .attr('fill', d => {
                    // Simulated performance data by region
                    const regionPerformance = {
                        // Africa
                        8: 65, 13: 62, 24: 58, 36: 60, 48: 63, 68: 61,
                        // Asia
                        18: 75, 22: 78, 34: 72, 392: 85, 410: 80, 156: 82,
                        // Europe
                        276: 92, 250: 90, 826: 91, 380: 88, 724: 87,
                        // Americas
                        840: 94, 124: 90, 76: 70, 484: 75
                    };
                    const performance = regionPerformance[d.id] || 70;
                    return colorScale(performance);
                })
                .attr('stroke', '#fff')
                .attr('stroke-width', 0.5)
                .attr('class', 'country-path')
                .append('title')
                .text(d => {
                    const regionPerformance = {
                        8: 65, 13: 62, 24: 58, 36: 60, 48: 63, 68: 61,
                        18: 75, 22: 78, 34: 72, 392: 85, 410: 80, 156: 82,
                        276: 92, 250: 90, 826: 91, 380: 88, 724: 87,
                        840: 94, 124: 90, 76: 70, 484: 75
                    };
                    const perf = regionPerformance[d.id] || 70;
                    return `${d.properties.name}: ${perf}%`;
                });

            // Add legend
            const legend = g.append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(20, ${height - 60})`);

            const legendColors = [
                { color: '#fee0d2', label: '50-60%' },
                { color: '#fc9272', label: '60-70%' },
                { color: '#fb6a4a', label: '70-80%' },
                { color: '#ef3b2c', label: '80-90%' },
                { color: '#cb181d', label: '90-100%' }
            ];

            legendColors.forEach((item, i) => {
                const legendItem = legend.append('g')
                    .attr('transform', `translate(${i * 70}, 0)`);

                legendItem.append('rect')
                    .attr('width', 15)
                    .attr('height', 15)
                    .attr('fill', item.color)
                    .attr('rx', 2);

                legendItem.append('text')
                    .attr('x', 20)
                    .attr('y', 12)
                    .style('font-size', '10px')
                    .style('font-family', "'Inter', sans-serif")
                    .text(item.label);
            });
        })
        .catch(error => {
            console.error('Error loading world map:', error);
            g.append('text')
                .attr('x', width / 2)
                .attr('y', height / 2)
                .attr('text-anchor', 'middle')
                .style('font-size', '14px')
                .style('font-family', "'Inter', sans-serif")
                .text('Map loading...');
        });
}
