// Navigation
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinksContainer = document.getElementById('navLinks');

// Scroll effect on navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinksContainer.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Homepage Slideshow
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.hero-dot');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
let currentSlide = 0;
let slideInterval;

// Function to show a specific slide
function showSlide(index) {
    // Reset all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Set new slide
    currentSlide = index;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
    if (dots.length > 0) {
        dots[currentSlide].classList.add('active');
    }
}

// Next slide function
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Previous slide function
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Start slideshow
function startSlideShow() {
    if (slides.length > 0) {
        slideInterval = setInterval(nextSlide, 4000);
    }
}

// Event listeners for arrows
if (nextArrow) {
    nextArrow.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        startSlideShow();
    });
}

if (prevArrow) {
    prevArrow.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        startSlideShow();
    });
}

// Event listeners for dots
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        const slideIndex = parseInt(dot.getAttribute('data-slide'));
        showSlide(slideIndex);
        startSlideShow();
    });
});

// Service card animation on scroll
const serviceCards = document.querySelectorAll('.service-card');

function checkScroll() {
    serviceCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            card.classList.add('visible');
        }
    });
}

// FAQ functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // In a real application, you would send the form data to a server here
        // For demonstration, we'll just show an alert
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    startSlideShow();
    
    // Check scroll position for service cards
    if (serviceCards.length > 0) {
        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Check on initial load
    }
    
    // Add loading animation to page
    document.body.classList.add('loaded');
});

// Add smooth page transitions
window.addEventListener('beforeunload', () => {
    document.body.classList.remove('loaded');
});
