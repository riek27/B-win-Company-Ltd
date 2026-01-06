// script.js - Premium Construction Website - Final Enhanced Version
// Last Updated: 2026-01-06

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== GLOBAL VARIABLES =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const backToTopBtn = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    
    // ===== FIX FOR PROJECTS PAGE IMAGES =====
    function fixProjectsPageImages() {
        // Check if we're on the projects page
        const isProjectsPage = window.location.pathname.includes('projects.html') || 
                              document.querySelector('.projects-hero') !== null;
        
        if (!isProjectsPage) return;
        
        console.log('Projects page detected, fixing images...');
        
        // Get all project images
        const projectImages = document.querySelectorAll('.project-image img');
        
        projectImages.forEach(img => {
            // Remove any inline styles that might be hiding images
            img.style.opacity = '1';
            img.style.visibility = 'visible';
            img.style.display = 'block';
            
            // Ensure the image container is visible
            const container = img.closest('.project-image');
            if (container) {
                container.style.opacity = '1';
                container.style.visibility = 'visible';
                container.style.display = 'block';
            }
            
            // Force image reload if it failed
            if (img.complete && img.naturalHeight === 0) {
                console.log('Image failed to load, reloading:', img.src);
                const originalSrc = img.src;
                img.src = '';
                setTimeout(() => {
                    img.src = originalSrc;
                }, 100);
            }
            
            // Add error handling
            img.addEventListener('error', function() {
                console.log('Image error detected:', this.src);
                // Use a fallback Unsplash image
                this.src = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                this.alt = 'Construction project image';
            });
            
            // Force image display
            img.style.opacity = '1';
            img.style.transform = 'none';
        });
        
        // Also fix filter buttons if they exist
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (filterBtns.length > 0) {
            console.log('Initializing projects filter...');
            // Reinitialize the projects filter
            setTimeout(initProjectsFilter, 500);
        }
    }
    
    // ===== ENHANCED MOBILE NAVIGATION WITH DROPDOWN FIX =====
    function initMobileNavigation() {
        if (!mobileMenuBtn || !mainNav || !mobileOverlay) return;
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu when clicking overlay
        mobileOverlay.addEventListener('click', function() {
            closeMobileMenu();
        });
        
        // Handle dropdown menus on mobile
        const dropdownToggles = document.querySelectorAll('.has-dropdown > .nav-link');
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const parent = this.parentElement;
                    const dropdown = parent.querySelector('.dropdown');
                    
                    // Close all other dropdowns
                    dropdowns.forEach(d => {
                        if (d !== dropdown) {
                            d.style.maxHeight = '0';
                            d.style.opacity = '0';
                            d.style.visibility = 'hidden';
                            d.parentElement.classList.remove('dropdown-open');
                        }
                    });
                    
                    // Toggle current dropdown
                    if (dropdown.style.maxHeight && dropdown.style.maxHeight !== '0px') {
                        dropdown.style.maxHeight = '0';
                        dropdown.style.opacity = '0';
                        dropdown.style.visibility = 'hidden';
                        parent.classList.remove('dropdown-open');
                    } else {
                        dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
                        dropdown.style.opacity = '1';
                        dropdown.style.visibility = 'visible';
                        dropdown.style.transform = 'translateY(0)';
                        parent.classList.add('dropdown-open');
                    }
                    
                    // Toggle arrow rotation
                    const arrow = this.querySelector('.dropdown-arrow');
                    if (arrow) {
                        arrow.style.transform = dropdown.style.maxHeight !== '0px' ? 'rotate(180deg)' : 'rotate(0deg)';
                    }
                }
            });
        });
        
        // Close dropdowns when clicking links
        const dropdownLinks = document.querySelectorAll('.dropdown a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    // Allow default navigation for mobile
                    closeMobileMenu();
                }
            });
        });
        
        // Close mobile menu when clicking regular nav links
        const navLinks = document.querySelectorAll('#mainNav a:not(.has-dropdown > a)');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            });
        });
        
        // Reset dropdowns on window resize
        window.addEventListener('resize', debounce(function() {
            if (window.innerWidth > 768) {
                // Reset mobile styles for desktop
                dropdowns.forEach(dropdown => {
                    dropdown.style.maxHeight = '';
                    dropdown.style.opacity = '';
                    dropdown.style.visibility = '';
                    dropdown.style.transform = '';
                    dropdown.parentElement.classList.remove('dropdown-open');
                });
                
                const arrows = document.querySelectorAll('.dropdown-arrow');
                arrows.forEach(arrow => {
                    arrow.style.transform = '';
                });
                
                closeMobileMenu();
            }
        }, 250));
    }
    
    // Close mobile menu function
    function closeMobileMenu() {
        if (mainNav) mainNav.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ===== ENHANCED TYPEWRITER EFFECT =====
    function initTypewriter() {
        const typewriterElement = document.getElementById('typewriterText');
        if (!typewriterElement) return;
        
        const texts = [
            "Building South Sudan's Future",
            "Quality Construction Since 2010",
            "Trusted Engineering Experts",
            "Affordable Building Solutions",
            "Local Expertise, Global Standards"
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;
        const typingSpeed = 80;
        const deletingSpeed = 50;
        const pauseDuration = 2000;
        let animationId;
        
        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (!isPaused) {
                if (!isDeleting && charIndex <= currentText.length) {
                    typewriterElement.textContent = currentText.substring(0, charIndex);
                    charIndex++;
                    animationId = setTimeout(typeWriter, typingSpeed);
                } else if (isDeleting && charIndex >= 0) {
                    typewriterElement.textContent = currentText.substring(0, charIndex);
                    charIndex--;
                    animationId = setTimeout(typeWriter, deletingSpeed);
                } else if (!isDeleting && charIndex > currentText.length) {
                    isPaused = true;
                    animationId = setTimeout(() => {
                        isPaused = false;
                        isDeleting = true;
                        typeWriter();
                    }, pauseDuration);
                } else if (isDeleting && charIndex < 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    charIndex = 0;
                    animationId = setTimeout(typeWriter, 500);
                }
            }
        }
        
        // Start the typewriter effect
        setTimeout(() => {
            typewriterElement.style.opacity = '1';
            typeWriter();
        }, 1000);
    }
    
    // ===== ENHANCED BACK TO TOP BUTTON =====
    function initBackToTop() {
        if (!backToTopBtn) return;
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== ENHANCED SMOOTH SCROLLING =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') return;
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    
                    closeMobileMenu();
                    
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + 
                                         window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ===== ENHANCED PROJECTS FILTER =====
    function initProjectsFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (filterBtns.length === 0 || projectCards.length === 0) return;
        
        // Make sure all project cards are visible initially
        projectCards.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.4s ease';
        });
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Reset all cards first
                projectCards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                });
                
                // Show filtered cards with delay
                setTimeout(() => {
                    projectCards.forEach((card, index) => {
                        const categories = card.getAttribute('data-category');
                        const shouldShow = filterValue === 'all' || 
                                         (categories && (categories.includes(filterValue) || 
                                          card.getAttribute('data-category2') === filterValue));
                        
                        if (shouldShow) {
                            setTimeout(() => {
                                card.style.display = 'block';
                                setTimeout(() => {
                                    card.style.opacity = '1';
                                    card.style.transform = 'translateY(0)';
                                }, 50);
                            }, index * 100);
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }, 300);
            });
        });
    }
    
    // ===== ENHANCED STICKY HEADER =====
    function initStickyHeader() {
        const header = document.querySelector('header');
        if (!header) return;
        
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('scrolled');
                
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            } else {
                header.classList.remove('scrolled');
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // ===== ENHANCED SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        if (fadeElements.length === 0) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        fadeElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            observer.observe(element);
        });
    }
    
    // ===== IMAGE LOADING ENHANCEMENTS =====
    function initImageLoading() {
        console.log('Initializing image loading...');
        
        // Handle all images on the page
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loaded class when image loads
            if (img.complete) {
                img.classList.add('loaded');
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                    this.style.opacity = '1';
                    console.log('Image loaded:', this.src);
                });
            }
            
            // Add error handling with better fallback
            img.addEventListener('error', function() {
                console.warn('Image failed to load:', this.src);
                this.classList.add('error');
                
                // Try a different Unsplash image as fallback
                const fallbackImages = [
                    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ];
                
                const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
                this.src = randomFallback;
                this.alt = 'Construction project image';
            });
            
            // Ensure image is visible
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            // Force display if hidden
            if (img.offsetParent === null) {
                img.style.display = 'block';
                img.style.visibility = 'visible';
            }
        });
        
        // Special handling for project page images
        const projectImages = document.querySelectorAll('.project-image img, .project-preview-image img');
        projectImages.forEach(img => {
            console.log('Processing project image:', img.src);
            
            // Ensure proper styling
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.display = 'block';
            
            // Force load
            if (!img.complete) {
                const src = img.src;
                img.src = '';
                setTimeout(() => {
                    img.src = src;
                }, 100);
            }
        });
    }
    
    // ===== ENHANCED FORM VALIDATION =====
    function initFormValidation() {
        if (!contactForm) return;
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showFormMessage('success', 'Thank you! Your message has been sent. We will contact you within 24 hours.');
                    contactForm.reset();
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
    
    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        let isValid = true;
        const value = field.value.trim();
        
        clearFieldError(field);
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    function clearFieldError(field) {
        field.classList.remove('error');
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }
    
    function showFormMessage(type, message) {
        const existingMessages = contactForm.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    // ===== ENHANCED STATS COUNTER =====
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.about-stat-number');
        if (statNumbers.length === 0) return;
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const targetValue = statNumber.textContent.trim();
                    
                    if (targetValue.includes('+')) {
                        const numericValue = parseInt(targetValue);
                        animateNumber(statNumber, 0, numericValue, 2000, '+');
                    } else if (targetValue.includes('%')) {
                        const numericValue = parseInt(targetValue);
                        animateNumber(statNumber, 0, numericValue, 2000, '%');
                    } else {
                        const numericValue = parseInt(targetValue);
                        animateNumber(statNumber, 0, numericValue, 2000);
                    }
                    
                    observer.unobserve(statNumber);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    function animateNumber(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = suffix === '+' ? `${currentValue}+` : 
                                suffix === '%' ? `${currentValue}%` : 
                                currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    }
    
    // ===== DEBOUNCE FUNCTION =====
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
    
    // ===== INITIALIZE EVERYTHING =====
    function initAll() {
        console.log('Initializing website...');
        
        // Fix images first
        fixProjectsPageImages();
        initImageLoading();
        
        // Initialize other features
        initMobileNavigation();
        initTypewriter();
        initBackToTop();
        initSmoothScroll();
        initProjectsFilter();
        initStickyHeader();
        initScrollAnimations();
        initFormValidation();
        initStatsCounter();
        
        // Add loaded class to body
        setTimeout(() => {
            document.body.classList.add('loaded');
            console.log('Website initialized successfully');
        }, 100);
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainNav && mainNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
    
    // ===== WINDOW LOAD EVENT =====
    window.addEventListener('load', function() {
        // Force image reload on projects page
        const isProjectsPage = window.location.pathname.includes('projects.html');
        if (isProjectsPage) {
            console.log('Projects page fully loaded, ensuring images display...');
            
            // Double-check all project images
            const projectImages = document.querySelectorAll('.project-card img');
            projectImages.forEach(img => {
                if (img.complete && img.naturalHeight === 0) {
                    console.log('Reloading broken image:', img.src);
                    const src = img.src;
                    img.src = '';
                    setTimeout(() => {
                        img.src = src;
                    }, 200);
                }
                
                // Force display
                img.style.opacity = '1';
                img.style.visibility = 'visible';
                img.style.display = 'block';
            });
        }
        
        // Add smooth transition for body
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Start the application
    initAll();
    
    // ===== DYNAMIC CSS FOR ENHANCED FEATURES =====
    if (!document.querySelector('#dynamicStyles')) {
        const style = document.createElement('style');
        style.id = 'dynamicStyles';
        style.textContent = `
            /* Enhanced animations */
            .back-to-top.visible {
                animation: fadeInUp 0.3s ease;
            }
            
            /* Form messages */
            .form-message {
                padding: 1rem;
                margin-bottom: 1.5rem;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                animation: slideDown 0.3s ease;
            }
            
            .form-message.success {
                background: #c6f6d5;
                color: #22543d;
                border: 1px solid #9ae6b4;
            }
            
            .form-message.error {
                background: #fed7d7;
                color: #742a2a;
                border: 1px solid #fc8181;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Header scroll effects */
            header.scrolled {
                background: rgba(255, 255, 255, 0.98) !important;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
            }
            
            /* Enhanced error states */
            .form-control.error {
                border-color: var(--accent) !important;
                background: #fff5f5;
            }
            
            .error-message {
                color: var(--accent);
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: none;
            }
            
            .error-message.show {
                display: block;
                animation: fadeIn 0.3s ease;
            }
            
            /* Image loading */
            img {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            img.loaded {
                opacity: 1 !important;
            }
            
            /* Force project images to display */
            .project-card img,
            .project-preview-card img {
                opacity: 1 !important;
                visibility: visible !important;
                display: block !important;
            }
            
            /* Mobile dropdown enhancements */
            .has-dropdown.dropdown-open .dropdown {
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
            }
            
            @media (max-width: 768px) {
                .dropdown {
                    transition: all 0.3s ease !important;
                    display: none;
                }
                
                .dropdown.active {
                    display: block !important;
                }
            }
            
            /* Project filter animations */
            .project-card {
                transition: all 0.4s ease !important;
            }
            
            /* Body fade in */
            body {
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            body.loaded {
                opacity: 1;
            }
            
            /* Fix for image containers */
            .project-image,
            .project-preview-image {
                overflow: hidden !important;
                position: relative !important;
            }
            
            .project-image img,
            .project-preview-image img {
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                object-fit: cover !important;
            }
        `;
        document.head.appendChild(style);
    }
});
