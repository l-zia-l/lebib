"use strict";

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. THE "DREAM LAB" AI SIMULATOR
    // ==========================================================================
    const generateBtn = document.getElementById("generate-vision-btn");
    const businessInput = document.getElementById("business-idea");
    const loadingState = document.getElementById("ai-loading-state");
    const resultState = document.getElementById("ai-result-state");
    const generatedTextDisplay = document.getElementById("ai-generated-text");
    const hiddenConceptInput = document.getElementById("hidden-ai-concept");

    // Pre-set AI responses based on keywords
    const aiTemplates = {
        food: "For your food business, we suggest a mouth-watering visual layout with warm tones, a built-in digital menu, and an integrated 'Order Ahead' or reservation system.",
        retail: "For your retail shop, we recommend a clean, high-contrast e-commerce aesthetic, featuring a custom AppSheet inventory tracker for your backend and seamless checkout for your customers.",
        tech: "For your tech idea, we envision a sleek, dark-mode interface with neon accents, a clear feature breakdown, and an interactive lead-capture form.",
        default: "For your business, we suggest a modern, minimalist aesthetic that builds instant trust, featuring clear service breakdowns and a direct WhatsApp integration for fast client communication."
    };

    function analyzeInput(input) {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes("food") || lowerInput.includes("restaurant") || lowerInput.includes("coffee") || lowerInput.includes("cafe")) {
            return aiTemplates.food;
        } else if (lowerInput.includes("shop") || lowerInput.includes("store") || lowerInput.includes("sell") || lowerInput.includes("clothes")) {
            return aiTemplates.retail;
        } else if (lowerInput.includes("app") || lowerInput.includes("software") || lowerInput.includes("tech")) {
            return aiTemplates.tech;
        } else {
            return aiTemplates.default;
        }
    }

    if (generateBtn && businessInput) {
        generateBtn.addEventListener("click", () => {
            const userIdea = businessInput.value.trim();
            
            if (userIdea === "") {
                businessInput.style.borderColor = "var(--crimson)";
                businessInput.placeholder = "Please enter an idea first...";
                return;
            }

            // Reset border if previously empty
            businessInput.style.borderColor = "transparent";

            // Hide previous results, show loading
            resultState.classList.add("hidden");
            loadingState.classList.remove("hidden");
            
            // Scroll down slightly to show loading state
            loadingState.scrollIntoView({ behavior: "smooth", block: "center" });

            // Simulate AI Processing time (2 seconds)
            setTimeout(() => {
                // Generate content based on keywords
                const generatedConcept = analyzeInput(userIdea);
                
                // Update DOM
                generatedTextDisplay.textContent = generatedConcept;
                
                // Pass data to the hidden form field for Formspree
                hiddenConceptInput.value = `User Idea: ${userIdea} | AI Concept: ${generatedConcept}`;

                // Hide loading, show results
                loadingState.classList.add("hidden");
                resultState.classList.remove("hidden");
                
                // Scroll to results
                resultState.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }, 2000);
        });
    }

    // ==========================================================================
    // 2. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================================================
    // This watches the portfolio cards and slides them up when they enter the screen
    const animateOnScrollElements = document.querySelectorAll(".portfolio-card");

    const scrollObserverOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add an inline style to trigger the CSS animation we built
                entry.target.style.animationPlayState = "running";
                entry.target.style.opacity = "1";
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, scrollObserverOptions);

    animateOnScrollElements.forEach(el => {
        // Pause animation initially
        el.style.animationPlayState = "paused";
        el.style.opacity = "0";
        scrollObserver.observe(el);
    });

    // ==========================================================================
    // 3. AUTO-UPDATE DROPDOWN ON "PLACE ORDER" CLICK
    // ==========================================================================
    // If they click "I love this! Let's build it", auto-select the AI Concept in the contact form
    const loveItBtn = document.querySelector(".btn-success[href='#place-order']");
    const projectTypeDropdown = document.getElementById("contact-project-type");

    if (loveItBtn && projectTypeDropdown) {
        loveItBtn.addEventListener("click", () => {
            projectTypeDropdown.value = "ai_concept";
        });
    }
});