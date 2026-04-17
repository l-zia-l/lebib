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
    const decisionPopup = document.getElementById('decision-overlay'); // Updated to match your HTML

    // 🚀 THE MASTER GENERATION FUNCTION
    const triggerGeneration = (promptText) => {
        if (!promptText) return; // Prevent empty submissions

        // Safety check: Make sure the browser window HTML exists
        if (!previewStage || !outputArea) {
            console.error("Missing preview stage HTML!");
            return;
        }

        // 1. Shrink Hero and Move Search to Top
        if (hero) {
            hero.classList.add('minimized');
        }

        // 2. Lift the Browser Window (Wait a tiny bit for the shrink to start)
        setTimeout(() => {
            previewStage.classList.remove('hidden-preview');
            // Small delay to ensure CSS registers the display change
            setTimeout(() => {
                previewStage.classList.add('active');
            }, 50);
            
            // 3. Inject the "Premium Template" Content
            outputArea.innerHTML = `
                <div style="padding: 60px 40px; text-align: center;">
                    <span style="color: var(--red); font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">AI Concept Generated</span>
                    <h1 style="font-size: 3rem; color: var(--navy); margin: 20px 0;">${promptText}</h1>
                    <p style="font-size: 1.2rem; color: #555; max-width: 600px; margin: 0 auto;">
                        We've analyzed your vision. This build requires a high-performance 
                        React architecture with a focus on deep Navy tones and Cyan accents.
                    </p>
                    <div style="display: flex; justify-content: center; gap: 10px; margin-top: 30px;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--navy);"></div>
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--cyan);"></div>
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--red);"></div>
                    </div>
                </div>
            `;
        }, 600);

        // 4. The 15-Second Business Hook!
        if (decisionPopup) {
            setTimeout(() => {
                decisionPopup.classList.add('active');
            }, 15000); // 15 seconds
        }
    };

    // 🎧 Listeners for Search & Pills
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

    // Helper function to dismiss the browser and scroll smoothly
    const resetAndScroll = (targetSectionId) => {
        // 1. Hide the decision overlay
        if (decisionPopup) decisionPopup.classList.remove('active');
        
        // 2. Slide the browser window back down
        if (previewStage) previewStage.classList.remove('active');
        
        // 3. Restore the main hero section to its full glory
        if (hero) hero.classList.remove('minimized');

        // 4. Wait for the animation to clear, then scroll to the target
        setTimeout(() => {
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 400); // 400ms gives the browser window time to slide out of the way
    };

    // The "Nah" Button -> Sends them to the Portfolio
    if (btnNah) {
        btnNah.addEventListener('click', (e) => {
            e.preventDefault();
            resetAndScroll('portfolio'); // Matches the id="portfolio" in your HTML
        });
    }

    // The "LFG!" Button -> Sends them to the Contact Form
    if (btnLfg) {
        btnLfg.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 🔥 UX MAGIC: Pre-fill the contact form with their AI prompt!
            const detailsField = document.getElementById('client-details');
            if (detailsField && input.value) {
                detailsField.value = "My vision: " + input.value + "\n\nLet's make this happen!";
            }
            
            resetAndScroll('contact'); // Matches the id="contact" in your HTML
        });
    }
    
});