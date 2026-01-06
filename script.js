// script.js - Updated with enhanced functionality for about and projects pages

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE NAVIGATION =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
        
        mobileOverlay.addEventListener('click', function() {
            mainNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close mobile menu when clicking a link
        const navLinks = document.querySelectorAll('#mainNav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ===== TYPEWRITER EFFECT =====
    function initTypewriter() {
        const typewriterElement = document.getElementById('typewriterText');
        if (!typewriterElement) return;
        
        const texts = [
            "Building South Sudan's Future",
            "Quality Construction Since 2010",
            "Trusted Engineering Experts",
            "Affordable Building Solutions"
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;
        const typingSpeed = 50;
        const deletingSpeed = 30;
        const pauseDuration = 2000;
        
        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (!isPaused) {
                if (!isDeleting && charIndex <= currentText.length) {
                    // Typing
                    typewriterElement.textContent = currentText.substring(0, charIndex);
                    charIndex++;
                    setTimeout(typeWriter, typingSpeed);
                } else if (isDeleting && charIndex >= 0) {
                    // Deleting
                    typewriterElement.textContent = currentText.substring(0, charIndex);
                    charIndex--;
                    setTimeout(typeWriter, deletingSpeed);
                } else if (!isDeleting && charIndex > currentText.length) {
                    // Finished typing, pause then start deleting
                    isPaused = true;
                    setTimeout(() => {
                        isPaused = false;
                        isDeleting = true;
                        typeWriter();
                    }, pauseDuration);
                } else if (isDeleting && charIndex < 0) {
                    // Finished deleting, move to next text
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    charIndex = 0;
                    setTimeout(typeWriter, 500);
                }
            }
        }
        
        // Start the typewriter effect
        setTimeout(typeWriter, 1000);
    }
    
    // ===== BACK TO TOP BUTTON =====
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
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
    
    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#" or if it's a dropdown link
                if (href === '#' || href.startsWith('#servicesDropdown')) {
                    return;
                }
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Calculate header height for offset
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
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
        
        if (filterBtns.length === 0) return;
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    // Get all categories for the card
                    const categories = card.getAttribute('data-category');
                    const hasMultipleCategories = categories && categories.includes(' ') || card.hasAttribute('data-category2');
                    
                    let shouldShow = false;
                    
                    if (filterValue === 'all') {
                        shouldShow = true;
                    } else if (hasMultipleCategories) {
                        // Check for multiple category attributes
                        const cat1 = card.getAttribute('data-category');
                        const cat2 = card.getAttribute('data-category2');
                        shouldShow = cat1 === filterValue || cat2 === filterValue;
                    } else {
                        shouldShow = categories && categories.includes(filterValue);
                    }
                    
                    // Apply animation based on filter
                    if (shouldShow) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ===== STICKY HEADER ON SCROLL =====
    function initStickyHeader() {
        const header = document.querySelector('header');
        if (!header) return;
        
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.boxShadow = 'var(--shadow-lg)';
                header.style.padding = '0.5rem 0';
                
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    // Scrolling down
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    header.style.transform = 'translateY(0)';
                }
            } else {
                header.style.boxShadow = 'var(--shadow-md)';
                header.style.padding = '1rem 0';
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // ===== ENHANCED FADE IN ANIMATIONS ON SCROLL =====
    function initScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        fadeElements.forEach(element => {
            element.style.animationPlayState = 'paused';
            observer.observe(element);
        });
    }
    
    // ===== IMAGE LAZY LOADING WITH ERROR HANDLING =====
    function initLazyLoading() {
        // Handle Unsplash images with proper error handling
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading="lazy" for native lazy loading
            if (!img.loading) {
                img.loading = 'lazy';
            }
            
            // Handle image load errors
            img.addEventListener('error', function() {
                // Set a placeholder image if original fails to load
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNlMmU4ZjAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNzE4MDk2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q29uc3RydWN0aW9uIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                this.alt = 'Image failed to load';
            });
        });
    }
    
    // ===== ENHANCED STATS COUNTER ANIMATION =====
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.about-stat-number');
        if (statNumbers.length === 0) return;
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const targetValue = statNumber.textContent;
                    
                    // Check if it contains a plus sign
                    if (targetValue.includes('+')) {
                        const numericValue = parseInt(targetValue);
                        animateNumber(statNumber, 0, numericValue, 1500, '+');
                    } else if (targetValue === '100%' || targetValue === '95%') {
                        const numericValue = parseInt(targetValue);
                        animateNumber(statNumber, 0, numericValue, 1500, '%');
                    } else {
                        const numericValue = parseInt(targetValue);
                        animateNumber(statNumber, 0, numericValue, 1500);
                    }
                    
                    observer.unobserve(statNumber);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
        
        function animateNumber(element, start, end, duration, suffix = '') {
            const startTime = performance.now();
            const updateNumber = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(start + (end - start) * easeOutQuart);
                
                element.textContent = suffix === '+' ? `${currentValue}+` : 
                                    suffix === '%' ? `${currentValue}%` : 
                                    currentValue;
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                }
            };
            
            requestAnimationFrame(updateNumber);
        }
    }
    
    // ===== DROPDOWN MENU ENHANCEMENTS =====
    function initDropdowns() {
        const dropdowns = document.querySelectorAll('.has-dropdown');
        
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            const dropdownMenu = dropdown.querySelector('.dropdown');
            
            if (link && dropdownMenu) {
                // Desktop hover
                dropdown.addEventListener('mouseenter', function() {
                    if (window.innerWidth > 768) {
                        dropdownMenu.style.opacity = '1';
                        dropdownMenu.style.visibility = 'visible';
                        dropdownMenu.style.transform = 'translateY(0)';
                    }
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    if (window.innerWidth > 768) {
                        dropdownMenu.style.opacity = '0';
                        dropdownMenu.style.visibility = 'hidden';
                        dropdownMenu.style.transform = 'translateY(10px)';
                    }
                });
                
                // Mobile click
                if (window.innerWidth <= 768) {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const isActive = dropdownMenu.style.maxHeight && dropdownMenu.style.maxHeight !== '0px';
                        
                        // Close all other dropdowns
                        document.querySelectorAll('.dropdown').forEach(menu => {
                            if (menu !== dropdownMenu) {
                                menu.style.maxHeight = '0';
                                menu.style.padding = '0';
                            }
                        });
                        
                        if (isActive) {
                            dropdownMenu.style.maxHeight = '0';
                            dropdownMenu.style.padding = '0';
                        } else {
                            dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px';
                            dropdownMenu.style.padding = '0.5rem 0';
                        }
                    });
                }
            }
        });
    }
    
    // ===== INITIALIZE ALL FUNCTIONS =====
    function initAll() {
        initTypewriter();
        initBackToTop();
        initSmoothScroll();
        initProjectsFilter();
        initStickyHeader();
        initScrollAnimations();
        initLazyLoading();
        initStatsCounter();
        initDropdowns();
        
        // Add loaded class to body for CSS transitions
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }
    
    // Start everything
    initAll();
    
    // ===== WINDOW RESIZE HANDLER =====
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reinitialize dropdowns on resize
            initDropdowns();
            
            // Close mobile menu if open on desktop
            if (window.innerWidth > 768 && mainNav) {
                mainNav.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    });
});
