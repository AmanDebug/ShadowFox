// Function ensures the script runs only after everything is loaded
window.addEventListener('DOMContentLoaded', (event) => {
    
    // 1. HERO SLIDER LOGIC
    const heroImages = [
        'hero_img.jpg',
        'hero-img2.jpg', // (cookware)
        'hero-img3.jpg'  // (train)
    ];

    let currentIndex = 0;
    const sliderElement = document.getElementById('hero-slider');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');

    if (!sliderElement || !prevBtn || !nextBtn) {
        console.error("Slider elements not found. Check HTML IDs.");
        return;
    }

    function changeImage(index) {
        sliderElement.style.backgroundImage = `url('${heroImages[index]}')`;
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex >= heroImages.length) { currentIndex = 0; }
        changeImage(currentIndex);
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) { currentIndex = heroImages.length - 1; }
        changeImage(currentIndex);
    }

    const SLIDE_INTERVAL = 5000; // 5 seconds
    let slideTimer;

    function startAutoSlide() {
        slideTimer = setInterval(nextSlide, SLIDE_INTERVAL);
    }

    function resetTimer() {
        clearInterval(slideTimer); // Clear existing auto-slide
        startAutoSlide(); // Restart fresh auto-slide
    }

    nextBtn.addEventListener('click', (e) => {
        console.log("Next button clicked!"); 
        nextSlide();
        resetTimer(); 
    });

    prevBtn.addEventListener('click', (e) => {
        console.log("Previous button clicked!"); 
        prevSlide();
        resetTimer();
    });

    startAutoSlide();


    
    // 2. NAVBAR LOGIN DIALOG LOGIC

    const loginModal = document.getElementById('login-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    const navbarItems = document.querySelectorAll('.navbar .border');

    navbarItems.forEach(item => {
        if (!item.classList.contains('cart-section')) {
            item.addEventListener('click', (e) => {
                e.preventDefault(); 
                e.stopPropagation();
                loginModal.classList.add('show');
            });
        }
    });

    closeModalBtn.addEventListener('click', () => {
        loginModal.classList.remove('show');
    });

    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('show');
        }
    });


    
    // 3. SIDE CART DRAWER LOGIC

    const cartSection = document.querySelector('.cart-section');
    const cartDrawer = document.getElementById('cart-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const shopDealsBtn = document.getElementById('shop-deals-btn');

    cartSection.addEventListener('click', (e) => {
        e.preventDefault();
        cartDrawer.classList.add('open');
        drawerOverlay.style.display = 'block'; 
    });

    function closeCart() {
        cartDrawer.classList.remove('open');
        drawerOverlay.style.display = 'none'; 
    }

    closeDrawerBtn.addEventListener('click', closeCart);
    drawerOverlay.addEventListener('click', closeCart);

    shopDealsBtn.addEventListener('click', () => {
        closeCart(); 
        const shopSection = document.querySelector('.shop-section');
        if (shopSection) {
            shopSection.scrollIntoView({ behavior: 'smooth' });
        }
    });


    
    // 4. TARGETED FOOTER LINKS LOGIC
    
    // This loops independently, so it works right from the page load!
    const targetedFooterLinks = document.querySelectorAll('.foot-panel2 ul:nth-child(3) a, .foot-panel2 ul:nth-child(4) a');

    targetedFooterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (loginModal) {
                loginModal.classList.add('show');
            }
        });
    });

    //back to top logic
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            // Scrolls the window to coordinates (X: 0, Y: 0) smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});