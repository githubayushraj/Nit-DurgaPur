// NIT Durgapur Alumni Network - JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize the application
    init();
    
});

// Initialize all functionality
function init() {
    setupSearchBar();
    setupNavigationHighlight();
    setupSmoothScrolling();
    console.log('NIT Durgapur Alumni Network initialized');
}

// Setup search bar functionality
function setupSearchBar() {
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Add your search logic here
            console.log('Searching for:', searchTerm);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
    }
}

// Perform search function
function performSearch(query) {
    if (query.trim() !== '') {
        console.log('Performing search for:', query);
        // Add actual search implementation here
        alert(`Searching for: ${query}`);
    }
}

// Setup navigation active state
function setupNavigationHighlight() {
    const navLinks = document.querySelectorAll('nav ul li');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}

// Setup smooth scrolling for anchor links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply smooth scroll if it's not just '#'
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Card view all functionality
document.querySelectorAll('.view-all').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const cardTitle = this.closest('.card-header').querySelector('h2').textContent;
        console.log('View all clicked for:', cardTitle);
        // Add navigation or modal logic here
    });
});

// Social icon click handlers
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const iconText = this.textContent;
        let socialNetwork = '';
        
        switch(iconText) {
            case 'T':
                socialNetwork = 'Twitter';
                break;
            case 'F':
                socialNetwork = 'Facebook';
                break;
            case 'L':
                socialNetwork = 'LinkedIn';
                break;
            case 'Y':
                socialNetwork = 'YouTube';
                break;
            case 'I':
                socialNetwork = 'Instagram';
                break;
        }
        
        console.log(`Navigating to ${socialNetwork}`);
        // Add actual social media links here
    });
});

// Video placeholder click handlers
document.querySelectorAll('.video-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', function() {
        const videoTitle = this.closest('.video-card').querySelector('h3').textContent;
        console.log('Playing video:', videoTitle);
        // Add video player logic here
        alert(`Playing: ${videoTitle}`);
    });
});

// Login/Signup button functionality
document.querySelectorAll('.login-btn, .cta-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            console.log('Login/Signup clicked');
            // Add login/signup modal or navigation here
            alert('Login/Signup functionality - Coming Soon!');
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Make header sticky with transition
const header = document.querySelector('.header');
if (header) {
    header.style.transition = 'transform 0.3s ease-in-out';
    header.style.position = 'sticky';
    header.style.top = '0';
    header.style.zIndex = '1000';
}