// Initialize AOS (Animate On Scroll) Library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out-cubic',
        once: true,
        offset: 100,
        delay: 0,
    });
    
    // Initialize all interactive features
    initializeNavigation();
    initializeParallax();
    initializeParticles();
    initializeSkillCards();
    initializeProjectCards();
    initializeProjectFiltering();
    initializeContactForm();
    initializeCursor();
    initializeScrollEffects();
    initializePerformanceOptimizations();
    initializeProjectFilters();
});

// Navigation Menu Functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        });
        
        // Close mobile menu when clicking nav links
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }
    
    // Update active navigation based on current page
    updateActiveNavigation();
}

function updateActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('text-neon-teal');
        const linkHref = link.getAttribute('href');
        
        // Check if this link corresponds to the current page
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('text-neon-teal');
        }
    });
}

// Parallax Scrolling Effects
function initializeParallax() {
    const floatingShapes = document.querySelectorAll('.floating-shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        floatingShapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Interactive Particle System
function initializeParticles() {
    const canvas = document.getElementById('bg-canvas');
    
    // Create dynamic particle canvas
    const particleCanvas = document.createElement('canvas');
    particleCanvas.style.position = 'absolute';
    particleCanvas.style.top = '0';
    particleCanvas.style.left = '0';
    particleCanvas.style.width = '100%';
    particleCanvas.style.height = '100%';
    particleCanvas.style.pointerEvents = 'none';
    particleCanvas.style.zIndex = '-1';
    
    canvas.appendChild(particleCanvas);
    
    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    
    function resizeCanvas() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.size = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.hue = Math.random() * 60 + 180; // Teal to purple range
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Mouse interaction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                this.vx += dx * force * 0.01;
                this.vy += dy * force * 0.01;
            }
            
            // Boundary check
            if (this.x < 0 || this.x > particleCanvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > particleCanvas.height) this.vy *= -1;
            
            // Friction
            this.vx *= 0.99;
            this.vy *= 0.99;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${this.hue}, 70%, 60%)`;
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Enhanced Skill Cards Interactions
function initializeSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    if (skillCards.length === 0) return; // Exit if no skill cards found
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'perspective(1000px) rotateY(5deg) rotateX(5deg) scale(1.05)';
            
            // Add glow effect
            const glassCard = card.querySelector('.glass-card');
            if (glassCard) {
                glassCard.style.boxShadow = `
                    0 20px 60px rgba(31, 38, 135, 0.6),
                    0 0 40px rgba(20, 184, 166, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
            
            const glassCard = card.querySelector('.glass-card');
            if (glassCard) {
                glassCard.style.boxShadow = `
                    0 8px 32px rgba(31, 38, 135, 0.37),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `;
            }
        });
        
        // 3D tilt effect based on mouse position
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
    });
}

// Enhanced Project Cards Interactions
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length === 0) return; // Exit if no project cards found
    
    projectCards.forEach(card => {
        const image = card.querySelector('img');
        
        card.addEventListener('mouseenter', () => {
            // Scale animation
            card.style.transform = 'scale(1.02) translateY(-5px)';
            
            // Image zoom
            if (image) {
                image.style.transform = 'scale(1.1)';
                image.style.filter = 'brightness(1.1) contrast(1.1)';
            }
            
            // Enhanced glow
            const glassCard = card.querySelector('.glass-card');
            if (glassCard) {
                glassCard.style.boxShadow = `
                    0 25px 80px rgba(31, 38, 135, 0.6),
                    0 0 50px rgba(20, 184, 166, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.15)
                `;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) translateY(0)';
            
            if (image) {
                image.style.transform = 'scale(1)';
                image.style.filter = 'brightness(1) contrast(1)';
            }
            
            const glassCard = card.querySelector('.glass-card');
            if (glassCard) {
                glassCard.style.boxShadow = `
                    0 8px 32px rgba(31, 38, 135, 0.37),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `;
            }
        });
        
        // Click animation
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1.02) translateY(-5px)';
            }, 150);
        });
    });
}

// Advanced Contact Form Functionality
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return; // Exit if no contact form found
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Enhanced input animations
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
            
            // Ripple effect
            createRippleEffect(input);
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time validation
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });
    
    // Form submission with animation
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Animate button
        submitButton.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
        `;
        submitButton.disabled = true;
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success animation
        submitButton.innerHTML = `
            <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Message Sent!
        `;
        submitButton.style.background = 'linear-gradient(90deg, #10B981, #059669)';
        
        // Reset form
        form.reset();
        
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }, 3000);
    });
}

function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(20, 184, 166, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = rect.width / 2 - size / 2 + 'px';
    ripple.style.top = rect.height / 2 - size / 2 + 'px';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function validateInput(input) {
    const value = input.value;
    const type = input.type;
    
    let isValid = true;
    
    if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    } else if (input.hasAttribute('required')) {
        isValid = value.trim() !== '';
    }
    
    if (isValid) {
        input.style.borderColor = 'rgba(34, 197, 94, 0.5)';
        input.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.1)';
    } else if (value) {
        input.style.borderColor = 'rgba(239, 68, 68, 0.5)';
        input.style.boxShadow = '0 0 0 2px rgba(239, 68, 68, 0.1)';
    } else {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    }
}

// Project Filtering Functionality
function initializeProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return; // Exit if no filters or projects found
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.dataset.categories ? card.dataset.categories.split(' ') : [];
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    // Animate in
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Custom Cursor Effects
function initializeCursor() {
    let cursor = document.querySelector('.cursor');
    
    // Create cursor if it doesn't exist
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: linear-gradient(45deg, #14B8A6, #8B5CF6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);
    }
    
    // Cursor movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .social-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'linear-gradient(45deg, #8B5CF6, #EC4899)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'linear-gradient(45deg, #14B8A6, #8B5CF6)';
        });
    });
    
    // Hide cursor on touch devices
    document.addEventListener('touchstart', () => {
        cursor.style.display = 'none';
    });
}

// Advanced Scroll Effects
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax background
        const bgCanvas = document.getElementById('bg-canvas');
        if (bgCanvas) {
            bgCanvas.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        
        // Navigation background opacity
        const nav = document.querySelector('nav');
        if (nav) {
            const opacity = Math.min(scrolled / 100, 0.95);
            nav.style.backgroundColor = `rgba(15, 23, 42, ${opacity})`;
        }
        
        // Hero text parallax
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const heroRate = scrolled * 0.3;
            heroContent.style.transform = `translate3d(0, ${heroRate}px, 0)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Performance Optimizations
function initializePerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.includes('.css') ? 'style' : 'font';
        if (resource.includes('font')) {
            link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
    });
    
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
    }
    
    // Battery-aware optimizations
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            if (battery.level < 0.2) {
                document.body.classList.add('power-saving');
                // Disable heavy animations
                document.querySelectorAll('.floating-shape').forEach(shape => {
                    shape.style.animation = 'none';
                });
            }
        });
    }
}

// CSS Keyframes for JavaScript animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .cursor {
        transition: transform 0.1s ease, background 0.2s ease;
    }
    
    .power-saving .floating-shape {
        animation: none !important;
    }
    
    .power-saving .glass-card {
        backdrop-filter: none !important;
        background: rgba(15, 23, 42, 0.8) !important;
    }
`;
document.head.appendChild(style);

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeParallax,
        initializeParticles,
        initializeSkillCards,
        initializeProjectCards,
        initializeContactForm,
        debounce,
        throttle
    };
}
// Share button functionality
function sharePage() {
    document.getElementById('shareModal').classList.remove('hidden');
}

function closeShareModal() {
    document.getElementById('shareModal').classList.add('hidden');
}

function shareToWhatsApp() {
    const text = encodeURIComponent("Check out this amazing project!");
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
}

function shareToMessenger() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.messenger.com/new?text=Check%20out%20this%20amazing%20project!%20${url}`, '_blank');
}

function shareToTwitter() {
    const text = encodeURIComponent("Check out this amazing project!");
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function copyProjectLink() {D
    const url = window.location.href;
    
    // Use the modern Clipboard API if available
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(() => {
            showCopySuccess();
        }).catch(err => {
            console.error('Failed to copy: ', err);
            fallbackCopyTextToClipboard(url);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(url);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess();
        } else {
            console.error('Fallback: Unable to copy');
        }
    } catch (err) {
        console.error('Fallback: Unable to copy', err);
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess() {
    const button = document.getElementById('copyButton');
    const originalText = button.innerHTML;
    
    button.innerHTML = `
        <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span>Link Copied!</span>
    `;
    
    button.classList.remove('bg-gray-600/20', 'border-gray-600/30', 'hover:bg-gray-600/30');
    button.classList.add('bg-green-600/20', 'border-green-600/30');
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('bg-green-600/20', 'border-green-600/30');
        button.classList.add('bg-gray-600/20', 'border-gray-600/30', 'hover:bg-gray-600/30');
    }, 2000);
}

// Close modal when clicking outside of it
document.addEventListener('click', function(event) {
    const modal = document.getElementById('shareModal');
    if (modal && event.target === modal) {
        closeShareModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeShareModal();
    }
});