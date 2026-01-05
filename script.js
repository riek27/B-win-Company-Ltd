// B-win Construction & General Supply Company
// Main JavaScript File - Optimized & Fixed

document.addEventListener('DOMContentLoaded', function() {
    // Prevent FOUC (Flash of Unstyled Content)
    document.documentElement.classList.add('loaded');
    
    // Mobile Menu & Dropdown Toggle - FIXED
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownParents = document.querySelectorAll('.has-dropdown');
    
    // Toggle Mobile Menu
    function toggleMobileMenu() {
        const menuIsActive = mainNav.querySelector('ul').classList.contains('active');
        
        if (!menuIsActive) {
            // Opening menu
            mainNav.querySelector('ul').classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
            // Closing menu
            mainNav.querySelector('ul').classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            
            // Close all dropdowns when closing menu
            dropdownParents.forEach(parent => {
                parent.classList.remove('active');
            });
        }
    }
    
    // Toggle Mobile Dropdown
    function toggleMobileDropdown(dropdownParent) {
        const isActive = dropdownParent.classList.contains('active');
        
        // Close all other dropdowns
        dropdownParents.forEach(parent => {
            if (parent !== dropdownParent) {
                parent.classList.remove('active');
            }
        });
        
        // Toggle current dropdown
        if (!isActive) {
            dropdownParent.classList.add('active');
        } else {
            dropdownParent.classList.remove('active');
        }
    }
    
    // Mobile Menu Button Click
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
    
    // Mobile Overlay Click
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation Links Click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const parent = this.parentElement;
            const isDropdownParent = parent.classList.contains('has-dropdown');
            
            // Check if we're on mobile
            const isMobile = window.innerWidth <= 992;
            
            if (isMobile && isDropdownParent) {
                // On mobile, toggle dropdown instead of following link
                e.preventDefault();
                toggleMobileDropdown(parent);
            } else {
                // On desktop or non-dropdown links, close mobile menu if open
                if (window.innerWidth <= 992) {
                    toggleMobileMenu();
                }
                
                // Update active link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && 
            mainNav.querySelector('ul').classList.contains('active') &&
            !mainNav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 992) {
                // On desktop, ensure mobile menu is closed
                mainNav.querySelector('ul').classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                
                // Close all dropdowns
                dropdownParents.forEach(parent => {
                    parent.classList.remove('active');
                });
            }
        }, 250);
    });
    
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    function updateBackToTop() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
        
        // Header scroll effect
        const header = document.querySelector('header');
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateBackToTop);
    updateBackToTop(); // Initial check
    
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Fade In Animation on Scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        scrollObserver.observe(element);
    });
    
    // Initialize on load
    fadeInOnScroll();
    
    // Typewriter Effect for Home Page
    const typewriterText = document.getElementById('typewriterText');
    
    if (typewriterText) {
        const texts = [
            "We design, build, and deliver high-quality residential, commercial, and infrastructure projects across Juba and beyond.",
            "Trusted construction and civil engineering experts in South Sudan.",
            "Building the future of South Sudan with quality and excellence."
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriterText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typewriterText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before starting new text
            }
            
            setTimeout(typeWriter, typingSpeed);
        }
        
        // Start typewriter after page loads
        setTimeout(typeWriter, 1000);
    }
    
    // Projects Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        card.classList.remove('hidden');
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.classList.add('hidden');
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.btn');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div style="background: #10b981; color: white; padding: 15px; border-radius: 5px; margin-top: 20px; text-align: center;">
                        <i class="fas fa-check-circle"></i> Thank you for your message! We will get back to you within 24 hours.
                    </div>
                `;
                this.parentNode.insertBefore(successMessage, this.nextSibling);
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }
    
    // Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.about-stat-number');
    
    if (statNumbers.length > 0) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const targetText = statNumber.textContent;
                    const targetValue = parseInt(targetText);
                    
                    // Skip if already animated
                    if (statNumber.classList.contains('animated')) return;
                    statNumber.classList.add('animated');
                    
                    let currentValue = 0;
                    const duration = 2000;
                    const increment = targetValue / (duration / 16);
                    
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= targetValue) {
                            statNumber.textContent = targetText;
                            clearInterval(timer);
                        } else {
                            statNumber.textContent = Math.floor(currentValue) + '+';
                        }
                    }, 16);
                    
                    observer.unobserve(statNumber);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(number => observer.observe(number));
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });
    
    // Lazy loading images
    const lazyImages = document.querySelectorAll('img:not(.loaded)');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Handle data-src attribute
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    
                    // Handle srcset
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            img.classList.add('loaded');
        });
    }
    
    // Touch device detection
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }
    
    // Add touch device class for better UX
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    }
    
    // Prevent iOS zoom on input focus
    document.addEventListener('touchstart', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
            // Do nothing - let the user zoom
        }
    }, { passive: true });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Close mobile menu on Escape key
        if (e.key === 'Escape' && window.innerWidth <= 992) {
            if (mainNav.querySelector('ul').classList.contains('active')) {
                toggleMobileMenu();
            }
        }
        
        // Focus trap for mobile menu
        if (e.key === 'Tab' && window.innerWidth <= 992) {
            if (mainNav.querySelector('ul').classList.contains('active')) {
                const focusableElements = mainNav.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    });
    
    // Add CSS for success messages
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        .success-message {
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Improve touch targets on mobile */
        @media (max-width: 768px) {
            .btn, .filter-btn, .nav-link {
                min-height: 44px;
                min-width: 44px;
            }
            
            input, select, textarea {
                font-size: 16px; /* Prevents iOS zoom on focus */
            }
        }
        
        /* Improve dropdown UX on mobile */
        .has-dropdown.active .dropdown {
            animation: dropdownSlide 0.3s ease;
        }
        
        @keyframes dropdownSlide {
            from { max-height: 0; opacity: 0; }
            to { max-height: 500px; opacity: 1; }
        }
    `;
    document.head.appendChild(additionalStyles);
    
    // Initialize all components
    console.log('B-win Construction website initialized successfully');
    
    // Performance optimization: Debounce resize events
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
    
    // Handle orientation change
    window.addEventListener('orientationchange', debounce(function() {
        // Re-check visibility on orientation change
        fadeInOnScroll();
    }, 250));
    
    // Add loading state to all buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.getAttribute('type') === 'submit' || this.classList.contains('submit-btn')) {
                // Loading handled in form submission
                return;
            }
            
            // Add temporary loading state for other buttons
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.pointerEvents = 'auto';
            }, 1000);
        });
    });
});

// Add polyfill for smooth scrolling on older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    import('smoothscroll-polyfill').then(module => {
        module.polyfill();
    }).catch(() => {
        // Fallback for smooth scrolling
        const smoothScrollTo = function(element, duration = 1000) {
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        };
        
        // Override native anchor click behavior
        document.addEventListener('click', function(e) {
            if (e.target.matches('a[href^="#"]')) {
                const href = e.target.getAttribute('href');
                if (href !== '#' && href !== '#!') {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        smoothScrollTo(target);
                    }
                }
            }
        });
    });
}
