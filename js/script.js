/**
 * ===================================================================
 * NIT Durgapur Alumni Network - Main JavaScript File
 * FINAL - Includes working hero slider
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Main function to orchestrate the application's startup.
     */
    async function main() {
        await loadComponents();
        initializeApp();
    }

    /**
     * Loads HTML components from external files into the main document.
     */
    async function loadComponents() {
        const load = async (selector, url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
                const data = await response.text();
                const element = document.querySelector(selector);
                if (element) element.innerHTML = data;
            } catch (error) {
                console.error(`Error loading component from ${url}:`, error);
            }
        };

        await Promise.all([
            load('#main-header-placeholder', 'header.html'),
            load('#main-footer-placeholder', 'footer.html')
        ]);
    }

    /**
     * Initializes all the application's event listeners and features.
     */
    function initializeApp() {
        console.log('Components loaded. Initializing app features...');

        loadHomepageWidgets(); 

        setupHeaderScrollEffect();
        setupSearchFunctionality();
        highlightActiveNavLink();
        setupGeneralEventListeners();
        setupHeroSlider(); // This will now run correctly
    }
    
    /**
     * Sets up the auto-sliding hero image carousel.
     */
    function setupHeroSlider() {
        const wrapper = document.querySelector('.hero-slider-wrapper');
        const dots = document.querySelectorAll('.slider-dots .dot');
        
        // --- This is an important check ---
        // If we are not on the homepage, these elements won't exist.
        if (!wrapper || !dots || dots.length === 0) {
            return; // Exit the function gracefully if no slider is on the page
        }

        let currentIndex = 0;
        const slideCount = dots.length;
        const SLIDE_INTERVAL = 1500; // 2000 milliseconds = 2 seconds
        let slideIntervalId = null; // To store the interval ID

        function goToSlide(index) {
            if (wrapper) {
                 wrapper.style.transform = `translateX(-${index * (100 / slideCount)}%)`;
            }
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            currentIndex = index;
        }

        // --- Auto-sliding logic ---
        function startSlider() {
            stopSlider(); // Clear any existing interval before starting a new one
            slideIntervalId = setInterval(() => {
                const nextIndex = (currentIndex + 1) % slideCount; // Loop back to 0
                goToSlide(nextIndex);
            }, SLIDE_INTERVAL);
        }
        
        function stopSlider() {
            clearInterval(slideIntervalId);
        }

        // --- Allow clicking on dots to navigate ---
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                // When a user clicks, reset the auto-slide timer
                startSlider(); 
            });
        });
        
        // Also reset timer if user hovers over the slider
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', stopSlider);
            hero.addEventListener('mouseleave', startSlider);
        }

        // Start the slider for the first time
        startSlider();
    }


    // --- Other functions (no changes needed below this line) ---

    function setupHeaderScrollEffect() {
        const header = document.querySelector('.header');
        if (!header) return;
        let lastScrollPosition = 0;
        window.addEventListener('scroll', () => {
            const currentScrollPosition = window.pageYOffset;
            if (currentScrollPosition > lastScrollPosition && currentScrollPosition > header.clientHeight) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScrollPosition = currentScrollPosition <= 0 ? 0 : currentScrollPosition;
        });
    }


    /**
     * Loads dynamic content into widgets on the homepage.
     */

    function loadHomepageWidgets() {
        const loadWidget = (selector, url, errorMessage) => {
            const container = document.querySelector(selector);
            
            if (container) {
                console.log(`Loading widget for ${selector}...`);
                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(errorMessage);
                        }
                        return response.text();
                    })
                    .then(data => {
                        container.innerHTML = data;
                    })
                    .catch(error => {
                        console.error(`Error loading widget for ${selector}:`, error);
                        container.innerHTML = `<p style="padding: 20px; color: red;">${error.message}</p>`;
                    });
            }
        };

        loadWidget('#events-card .card-content', 'events.html', 'Could not load events.');
        loadWidget('#news-card .card-content', 'news.html', 'Could not load news.');
        loadWidget('#memories-card .card-content', 'memories.html', 'Could not load news.');
        loadWidget('#alumni-card .card-content', 'alumni.html', 'Could not load news.');



    }

    function setupSearchFunctionality() {
       // ... search code ...
    }

    function highlightActiveNavLink() {
        // ... nav highlight code ...
    }

    function setupGeneralEventListeners() {
       // ... event listener code ...
    }

    // Start the application execution.
    main();
});