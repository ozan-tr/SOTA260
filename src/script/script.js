// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Add animation on scroll for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.problem-card, .mentor-card, .testimonial-card, .step');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Interactive button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (!this.disabled && !this.getAttribute('href')) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Mock action based on button text
            const buttonText = this.textContent.trim();
            if (buttonText.includes('Graduate')) {
                showModal('Graduate Registration', 'Create your profile and start connecting with mentors!');
            } else if (buttonText.includes('Mentor')) {
                showModal('Mentor Registration', 'Share your experience and help the next generation!');
            } else if (buttonText === 'Connect') {
                showModal('Connection Request', 'Your connection request has been sent! The mentor will respond within 48 hours.');
            } else if (buttonText === 'Join Now' || buttonText.includes('Get Started')) {
                showModal('Welcome!', 'Sign up to start your journey in the film industry.');
            }
        }
    });
});

// Simple modal system
function showModal(title, message) {
    // Check if modal already exists
    let modal = document.querySelector('.custom-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.classList.add('custom-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <h3 class="modal-title"></h3>
                <p class="modal-message"></p>
                <button class="btn btn-primary modal-btn">OK</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .custom-modal {
                display: none;
                position: fixed;
                z-index: 10000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                animation: fadeIn 0.3s;
            }
            
            .modal-content {
                background-color: white;
                margin: 15% auto;
                padding: 2rem;
                border-radius: 15px;
                max-width: 500px;
                position: relative;
                animation: slideDown 0.3s;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            }
            
            .modal-close {
                position: absolute;
                right: 1.5rem;
                top: 1rem;
                font-size: 2rem;
                cursor: pointer;
                color: #999;
                transition: color 0.3s;
            }
            
            .modal-close:hover {
                color: #333;
            }
            
            .modal-title {
                color: #667eea;
                margin-bottom: 1rem;
                font-size: 1.5rem;
            }
            
            .modal-message {
                color: #666;
                margin-bottom: 1.5rem;
                line-height: 1.6;
            }
            
            .modal-btn {
                width: 100%;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideDown {
                from { 
                    opacity: 0;
                    transform: translateY(-50px);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Close button functionality
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        modal.querySelector('.modal-btn').addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Update and show modal
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-message').textContent = message;
    modal.style.display = 'block';
}

// Add counter animation for stats
function animateCounter(element, target, duration = 2000, suffix = '') {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            const displayValue = Math.floor(current);
            element.textContent = displayValue.toLocaleString() + suffix;
        }
    }, 16);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent.trim();
                if (text.includes('%')) {
                    const num = parseInt(text);
                    animateCounter(stat, num, 2000, '%');
                } else if (text.includes('50,000')) {
                    animateCounter(stat, 50000, 2000, '+');
                } else if (text.includes('95')) {
                    animateCounter(stat, 95, 2000, '%');
                }
            });
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
});

console.log('FilmConnect initialized - Breaking barriers in film careers!');
