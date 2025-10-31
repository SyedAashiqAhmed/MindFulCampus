// MindfulCampus - Premium UI Effects
// Floating particles, 3D interactions, advanced animations

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== CREATE FLOATING PARTICLES ==========
    function createFloatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);

        const particles = ['🌸', '🌺', '🌼', '🌻', '🌷', '🦋', '✨', '💫', '⭐', '🌙'];
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particle.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
            particlesContainer.appendChild(particle);
        }
    }

    // ========== CREATE MORPHING SHAPES ==========
    function createMorphingShapes() {
        const shapes = [
            { top: '10%', left: '5%', delay: '0s' },
            { top: '60%', right: '10%', delay: '3s' },
            { bottom: '15%', left: '15%', delay: '6s' }
        ];

        shapes.forEach(pos => {
            const shape = document.createElement('div');
            shape.className = 'shape-morph';
            Object.assign(shape.style, pos);
            shape.style.animationDelay = pos.delay;
            document.body.appendChild(shape);
        });
    }

    // ========== 3D CARD TILT EFFECT (DISABLED) ==========
    // Removed to prevent unwanted tilt on touch/hover
    function add3DTiltEffect() {
        // Disabled - no 3D tilt on mouse movement
        return;
    }

    // ========== PARALLAX SCROLL EFFECT ==========
    function initParallaxScroll() {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-element, .shape-morph');
            
            parallaxElements.forEach((el, index) => {
                const speed = 0.5 + (index * 0.1);
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // ========== MAGNETIC BUTTON EFFECT (DISABLED) ==========
    function addMagneticEffect() {
        // Disabled - no magnetic effect
        return;
    }

    // ========== RIPPLE EFFECT ON CLICK ==========
    function addRippleEffect() {
        const elements = document.querySelectorAll('.btn-primary, .btn-secondary, .mood-btn, .recommendation-card');
        
        elements.forEach(element => {
            element.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.className = 'ripple-effect';
                
                element.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // ========== SMOOTH REVEAL ON SCROLL ==========
    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.glass-card, .recommendation-card, .mood-btn');
        elements.forEach(el => {
            el.classList.add('reveal-on-scroll');
            observer.observe(el);
        });
    }

    // ========== CURSOR TRAIL EFFECT (DISABLED) ==========
    function createCursorTrail() {
        // Disabled - no cursor trail
        return;
    }

    // ========== GLOWING CURSOR EFFECT (DISABLED) ==========
    function createGlowingCursor() {
        // Disabled - use normal cursor
        return;
    }

    // ========== TYPING ANIMATION FOR TEXT ==========
    function addTypingAnimation() {
        const elements = document.querySelectorAll('[data-typing]');
        
        elements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.opacity = '1';
            
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 50);
        });
    }

    // ========== GRADIENT ANIMATION ON HOVER (DISABLED) ==========
    function addGradientAnimation() {
        // Disabled - no gradient animation on mouse move
        return;
    }

    // ========== SPARKLE EFFECT ON CLICK ==========
    function addSparkleEffect() {
        document.addEventListener('click', function(e) {
            for (let i = 0; i < 8; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.textContent = '✨';
                sparkle.style.left = e.clientX + 'px';
                sparkle.style.top = e.clientY + 'px';
                
                const angle = (Math.PI * 2 * i) / 8;
                const velocity = 50 + Math.random() * 50;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                sparkle.style.setProperty('--vx', vx + 'px');
                sparkle.style.setProperty('--vy', vy + 'px');
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 1000);
            }
        });
    }

    // ========== MOOD BUTTON ENHANCEMENT ==========
    function enhanceMoodButtons() {
        const moodButtons = document.querySelectorAll('.mood-btn');
        
        moodButtons.forEach(btn => {
            // Add premium class
            btn.classList.add('mood-btn-premium');
            
            // Add icon animation
            const icon = btn.querySelector('.mood-emoji');
            if (icon) {
                icon.classList.add('rec-icon-premium');
            }
            
            // Add glow border
            btn.classList.add('glow-border');
        });
    }

    // ========== RECOMMENDATION CARDS ENHANCEMENT ==========
    function enhanceRecommendationCards() {
        const recCards = document.querySelectorAll('.recommendation-card');
        
        recCards.forEach(card => {
            card.classList.add('recommendation-card-premium', 'glass-card-3d');
            
            const icon = card.querySelector('.rec-icon');
            if (icon) {
                icon.classList.add('rec-icon-premium');
            }
        });
    }

    // ========== HERO CARD ENHANCEMENT ==========
    function enhanceHeroCards() {
        const heroCards = document.querySelectorAll('.hero-card');
        
        heroCards.forEach(card => {
            card.classList.add('hero-card-premium', 'floating-element');
        });
    }

    // ========== SLIDER ENHANCEMENT ==========
    function enhanceSliders() {
        const sliders = document.querySelectorAll('.slider, input[type="range"]');
        
        sliders.forEach(slider => {
            slider.classList.add('slider-premium');
        });
    }

    // ========== EMERGENCY FAB ENHANCEMENT ==========
    function enhanceEmergencyFab() {
        const fab = document.querySelector('.emergency-fab');
        if (fab) {
            fab.classList.add('emergency-fab-premium');
        }
    }

    // ========== NAVBAR ENHANCEMENT ==========
    function enhanceNavbar() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.add('navbar-premium');
        }
    }

    // ========== ADD STAGGER ANIMATION TO GRIDS ==========
    function addStaggerAnimation() {
        const grids = document.querySelectorAll('.recommendations-grid, .mood-selector, .exercises-grid');
        
        grids.forEach(grid => {
            grid.classList.add('stagger-fade-in');
        });
    }

    // ========== INITIALIZE ALL EFFECTS ==========
    function initPremiumUI() {
        // Create visual elements
        createFloatingParticles();
        createMorphingShapes();
        
        // Add interactions (mouse effects disabled)
        // add3DTiltEffect(); // Disabled
        // addMagneticEffect(); // Disabled
        addRippleEffect(); // Keep ripple
        // addGradientAnimation(); // Disabled
        addSparkleEffect(); // Keep sparkles
        
        // Enhance existing elements
        enhanceMoodButtons();
        enhanceRecommendationCards();
        enhanceHeroCards();
        enhanceSliders();
        enhanceEmergencyFab();
        enhanceNavbar();
        
        // Add animations
        initScrollReveal();
        initParallaxScroll();
        addStaggerAnimation();
        
        // Optional: Uncomment for more effects
        // createGlowingCursor();
        // createCursorTrail();
        
        console.log('✨ Premium UI effects loaded!');
    }

    // Initialize after a short delay to ensure DOM is ready
    setTimeout(initPremiumUI, 100);
});

// ========== CSS FOR DYNAMIC EFFECTS ==========
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(79, 209, 197, 0.5);
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

    .reveal-on-scroll {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.6s, transform 0.6s;
    }

    .reveal-on-scroll.revealed {
        opacity: 1;
        transform: translateY(0);
    }

    .sparkle {
        position: fixed;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 9999;
        animation: sparkle-fly 1s ease-out forwards;
    }

    @keyframes sparkle-fly {
        to {
            transform: translate(var(--vx), var(--vy));
            opacity: 0;
            font-size: 0.5rem;
        }
    }
`;
document.head.appendChild(style);
