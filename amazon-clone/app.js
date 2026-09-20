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


    
    

    const loginModal = document.getElementById('login-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const navbarItems = document.querySelectorAll('.navbar .border');

    navbarItems.forEach(item => {
        if (!item.classList.contains('cart-section') && 
            !item.classList.contains('nav-search') && 
            !item.closest('.nav-search')) {
            
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


    
    
    const cartSection = document.querySelector('.cart-section');
    const cartDrawer = document.getElementById('cart-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const shopDealsBtn = document.getElementById('shop-deals-btn');

    if (cartSection) {
        cartSection.addEventListener('click', (e) => {
            e.preventDefault();
            cartDrawer.classList.add('open');
            drawerOverlay.style.display = 'block'; 
        });
    }

    function closeCart() {
        cartDrawer.classList.remove('open');
        drawerOverlay.style.display = 'none'; 
    }

    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeCart);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeCart);

    if (shopDealsBtn) {
        shopDealsBtn.addEventListener('click', () => {
            closeCart(); 
            const shopSection = document.querySelector('.shop-section');
            if (shopSection) {
                shopSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }


    
    
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


    
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                darkModeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
            }
        });
    }



    const searchInput = document.getElementById('main-search');
    const suggestionsBox = document.getElementById('search-suggestions');

    const productDatabase = [
        "appliances", "alexa echo dot", "amazon prime video",
        "books best sellers", "bluetooth headphones", "baby products",
        "cookware set", "curtains for living room", "coffee mug",
        "electronics", "exercise mat", "eyewear sunglasses",
        "furniture bed", "face wash", "fresh groceries",
        "hand towels", "health supplements", "hair dryer",
        "iphone 15 pro", "indian traditional wear", "indoor plants",
        "laptop accessories", "luggage bags", "led desk lamp",
        "mx player movies", "makeup kit", "mens running shoes",
        "running shoes", "smart watch", "sunglasses", "skincare cream"
    ];

    if (searchInput && suggestionsBox) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            suggestionsBox.innerHTML = ''; 

            if (query.length === 0) {
                suggestionsBox.classList.add('hidden');
                return;
            }

            const matchedProducts = productDatabase.filter(item => 
                item.toLowerCase().includes(query)
            );

            if (matchedProducts.length > 0) {
                matchedProducts.forEach(product => {
                    const row = document.createElement('div');
                    row.className = 'suggestion-item';
                    row.textContent = product;

                    row.addEventListener('click', () => {
                        searchInput.value = product;
                        suggestionsBox.classList.add('hidden');
                    });

                    suggestionsBox.appendChild(row);
                });
                suggestionsBox.classList.remove('hidden');
            } else {
                suggestionsBox.classList.add('hidden');
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
                suggestionsBox.classList.add('hidden');
            }
        });

        searchInput.addEventListener('focus', (e) => {
            if (e.target.value.trim().length > 0) {
                suggestionsBox.classList.remove('hidden');
            }
        });
    }


    
    const searchIcon = document.querySelector('.search-icon');

    function executeSearch() {
        if (!searchInput) return;
        const query = searchInput.value.trim();
        if (query.length > 0) {
            window.open(`https://www.amazon.in/s?k=${encodeURIComponent(query)}`, '_blank');
        }
    }

    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            executeSearch(); 
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                executeSearch();
            }
        });
    }

    
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatBubble && chatWindow) {
        chatBubble.addEventListener('click', () => {
            chatBubble.classList.add('hidden');
            chatWindow.classList.remove('hidden');
            if (chatInput) chatInput.focus(); // Automatically focus input field
        });
    }

    if (closeChatBtn && chatBubble && chatWindow) {
        closeChatBtn.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
            chatBubble.classList.remove('hidden');
        });
    }

    function appendMessage(text, sender) {
        if (!chatMessages) return null;
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}-message`;
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return msgDiv; // Return element reference to modify it later if needed
    }

    async function fetchGeminiResponse(userPrompt) {
        const backendUrl = "https://shadowfox-c198.onrender.com/api/chat"; 

        try {
            const response = await fetch(backendUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userPrompt })
            });

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }

            const data = await response.json();
            return data.reply;
        } catch (error) {
            console.error("Backend Proxy Error:", error);
            return "Unable to connect to the AI assistant right now. Please ensure the server is running.";
        }
    }

    async function handleSending() {
        if (!chatInput) return;
        const userText = chatInput.value.trim();
        if (userText === '') return;

        appendMessage(userText, 'user');
        chatInput.value = ''; // Reset input field immediately

        const thinkingBubble = appendMessage("Thinking...", "ai");

        const aiResponse = await fetchGeminiResponse(userText);
        
        if (thinkingBubble) {
            thinkingBubble.textContent = aiResponse;
        }
    }

    if (sendChatBtn && chatInput) {
        sendChatBtn.addEventListener('click', handleSending);
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleSending();
        });
    }
});
