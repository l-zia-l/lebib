// Wait for the DOM to fully load before running the magic
document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       🔍 PART 1: THE SEARCH ENGINE LOGIC
    ========================================= */
    const input = document.getElementById('main-prompt');
    const generateBtn = document.querySelector('.generate-btn');
    const suggestionPills = document.querySelectorAll('.pill');
    
    // Elements for the animation
    const hero = document.querySelector('.hero-section'); 
    const previewStage = document.getElementById('preview-stage');
    const outputArea = document.getElementById('ai-output-area');
    const decisionPopup = document.getElementById('decision-overlay');

    // Add this lock right above the function
    let isGenerating = false; 

    // 🚀 THE MASTER GENERATION FUNCTION
    const triggerGeneration = (promptText) => {
        // If the box is empty OR if it's already generating, stop immediately!
        if (!promptText || isGenerating) return; 

        // Lock the engine
        isGenerating = true;

        if (!previewStage || !outputArea) return;

        /* --- 🧠 THE VIBE MAP (AI Logic Database) --- */
        const vibeMap = [
            {
                category: 'food',
                keywords: ['restaurant', 'food', 'catering', 'pizza', 'cafe', 'eat'],
                primary: '#D72638', 
                secondary: '#FFC107', 
                image: 'food.webp',
                title: 'Savor Every Bite.',
                subtitle: 'Fresh ingredients, unforgettable flavors delivered straight to your table.',
                cta: 'View Our Menu'
            },
            {
                category: 'plants',
                keywords: ['plants', 'flowers', 'roses', 'trees', 'florist', 'garden', 'shop'],
                primary: '#8FBC8F', 
                secondary: '#D2B48C', 
                image: 'flower-shop.webp',
                title: 'Bring Nature Indoors.',
                subtitle: 'Beautiful, hand-picked blooms for every occasion.',
                cta: 'Shop the Collection'
            },
            {
                category: 'boutique',
                keywords: ['clothes', 'fashion', 'boutique', 'shoes', 'apparel', 'wear'],
                primary: '#6A0DAD', 
                secondary: '#000000', 
                image: 'fashion.webp',
                title: 'Define Your Style.',
                subtitle: 'The latest seasonal trends, curated exclusively for you.',
                cta: 'Shop New Arrivals'
            },
            {
                category: 'general',
                keywords: ['consultancy', 'office', 'bank', 'tech', 'business', 'corp', 'agency'],
                primary: '#1B2D48', 
                secondary: '#00F5FF', 
                image: 'tech.webp',
                title: 'Professional Solutions.',
                subtitle: 'Expertise and technology that drives your business forward.',
                cta: 'Get Started Today'
            }
        ];

        /* --- 🔍 THE SCANNER --- */
        const lowerPrompt = promptText.toLowerCase();
        let selectedVibe = vibeMap[3]; // Default to general

        for (const vibe of vibeMap) {
            const isMatch = vibe.keywords.some(keyword => lowerPrompt.includes(keyword));
            if (isMatch) {
                selectedVibe = vibe;
                break; 
            }
        }

        /* --- 🎬 THE ANIMATION & INJECTION --- */
        if (hero) hero.classList.add('minimized');

        outputArea.innerHTML = `
            <div style="padding: 100px 20px; text-align: center;">
                <h2 style="color: var(--navy); animation: pulse 1.5s infinite;">Analyzing Business Model...</h2>
                <p style="color: #666; margin-top: 10px;">Generating dynamic layout for "${promptText}"</p>
            </div>
        `;

        setTimeout(() => {
            previewStage.classList.remove('hidden-preview');
            setTimeout(() => { previewStage.classList.add('active'); }, 50);
            
            setTimeout(() => {
                outputArea.innerHTML = `
                    <div class="mockup-shell" style="--primary: ${selectedVibe.primary}; --secondary: ${selectedVibe.secondary};">
                        <nav class="mockup-nav">
                            <div class="mockup-logo-text">${promptText.split(' ')[0].toUpperCase()}</div>
                            <div class="mockup-links">
                                <span>HOME</span>
                                <span>ABOUT</span>
                                <span>CONTACT</span>
                            </div>
                        </nav>
                        <div class="mockup-hero" style="background-image: url('${selectedVibe.image}');">
                            <div class="mockup-overlay">
                                <h1>${selectedVibe.title}</h1>
                                <p>${selectedVibe.subtitle}</p>
                                <button class="mockup-cta">${selectedVibe.cta}</button>
                            </div>
                        </div>
                    </div>
                `;
            }, 2500);

        }, 600);

        if (decisionPopup) {
            setTimeout(() => {
                decisionPopup.classList.add('active');
            }, 8000); 
        }
    };

    /* --- 🎧 THE MISSING EVENT LISTENERS --- */
    if (generateBtn && input) {
        generateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const sanitizedInput = input.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            triggerGeneration(sanitizedInput);
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const sanitizedInput = input.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                triggerGeneration(sanitizedInput);
            }
        });
    }

    if (suggestionPills) {
        suggestionPills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                e.preventDefault();
                const pillText = pill.textContent;
                if (input) input.value = pillText; 
                triggerGeneration(pillText); 
            });
        });
    }

    /* =========================================
       💼 PART 2: THE PORTFOLIO SLIDER
    ========================================= */
    const slider = document.getElementById('work-slider');
    const slideLeft = document.getElementById('slide-left');
    const slideRight = document.getElementById('slide-right');

    if (slider && slideLeft && slideRight) {
        const getScrollAmount = () => {
            const firstCard = slider.querySelector('.portfolio-card');
            if (!firstCard) return 300; 
            
            const cardWidth = firstCard.offsetWidth;
            const gap = parseInt(window.getComputedStyle(slider).gap) || 25;
            return cardWidth + gap;
        };

        slideLeft.addEventListener('click', () => {
            slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        slideRight.addEventListener('click', () => {
            slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
    }

    /* =========================================
       🔝 BACK TO TOP LOGIC
    ========================================= */
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* =========================================
       🚀 PART 4: THE SALES FUNNEL (LFG & NAH BUTTONS)
    ========================================= */
    const btnLfg = document.getElementById('btn-lfg');
    const btnNah = document.getElementById('btn-nah');

    const resetAndScroll = (targetSectionId) => {
        // Unlock the engine so they can use it again later!
        isGenerating = false; 
        
        // Clear the input bar so it's fresh for their next idea
        if (input) input.value = '';

        if (decisionPopup) decisionPopup.classList.remove('active');
        if (previewStage) previewStage.classList.remove('active');
        if (hero) hero.classList.remove('minimized');

        setTimeout(() => {
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 400); 
    };

    if (btnNah) {
        btnNah.addEventListener('click', (e) => {
            e.preventDefault();
            resetAndScroll('portfolio'); 
        });
    }

    if (btnLfg) {
        btnLfg.addEventListener('click', (e) => {
            e.preventDefault();
            const detailsField = document.getElementById('client-details');
            if (detailsField && input.value) {
                detailsField.value = "My vision: " + input.value + "\n\nLet's make this happen!";
            }
            resetAndScroll('contact'); 
        });
    }
});