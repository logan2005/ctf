// Main Application Controller
class CTFApp {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all components
        this.initializeComponents();

        // Setup global references
        this.setupGlobalReferences();

        // Add visual effects
        this.initializeVisualEffects();

        // Setup keyboard shortcuts
        this.setupKeyboardShortcuts();

        // Setup collapse/expand functionality
        this.setupCollapsibleSections();

        console.log('%c🚀 CyberQuest CTF Platform Initialized', 'color: #00ff41; font-size: 16px; font-weight: bold;');
        console.log('%cGood luck, hacker!', 'color: #00ff41; font-size: 12px;');
    }

    initializeComponents() {
        // Initialize in correct order (dependencies matter)
        window.animationSystem = new AnimationSystem();
        window.educationSystem = new EducationSystem();
        window.terminal = new Terminal();
        window.progressTracker = new ProgressTracker();
        window.challengeSystem = new ChallengeSystem();
        window.chatbot = new Chatbot();

        // Create quick reference panel
        window.educationSystem.createQuickReference();

        // Enhance matrix effect
        window.animationSystem.enhanceMatrixEffect();

        console.log('✓ All components initialized successfully');
    }

    setupGlobalReferences() {
        // Make components accessible globally
        window.app = this;
    }

    initializeVisualEffects() {
        // Matrix rain effect (optional, lightweight)
        this.createMatrixEffect();

        // Add terminal focus on click
        const terminalContainer = document.getElementById('terminalContainer');
        const terminalInput = document.getElementById('terminalInput');

        terminalContainer.addEventListener('click', () => {
            terminalInput.focus();
        });

        // Add glow effect to active elements
        this.addGlowEffects();
    }

    createMatrixEffect() {
        const matrixBg = document.getElementById('matrixBg');
        if (!matrixBg) return;

        // Create subtle matrix characters
        const chars = '01';
        let matrixHTML = '';

        for (let i = 0; i < 50; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const left = Math.random() * 100;
            const animationDelay = Math.random() * 5;
            const fontSize = 10 + Math.random() * 10;

            matrixHTML += `<span style="
                position: absolute;
                left: ${left}%;
                top: -20px;
                font-size: ${fontSize}px;
                color: rgba(0, 255, 65, 0.1);
                animation: matrixFall ${5 + Math.random() * 10}s linear infinite;
                animation-delay: ${animationDelay}s;
            ">${char}</span>`;
        }

        matrixBg.innerHTML = matrixHTML;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes matrixFall {
                0% { transform: translateY(-20px); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(100vh); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    addGlowEffects() {
        // Add pulsing glow to important elements
        const glowElements = document.querySelectorAll('.level-indicator, .score-display');

        glowElements.forEach(el => {
            el.style.transition = 'all 0.3s ease';
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to clear terminal
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (window.terminal) {
                    window.terminal.clear();
                }
            }

            // Ctrl/Cmd + H for hint
            if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
                e.preventDefault();
                if (window.chatbot) {
                    window.chatbot.provideHint();
                }
            }

            // Escape to focus terminal
            if (e.key === 'Escape') {
                const terminalInput = document.getElementById('terminalInput');
                if (terminalInput) {
                    terminalInput.focus();
                }
            }
        });
    }

    setupCollapsibleSections() {
        // Progress Tracker collapse
        const collapseProgress = document.getElementById('collapseProgress');
        const progressTracker = document.getElementById('progressTracker');

        if (collapseProgress && progressTracker) {
            collapseProgress.addEventListener('click', (e) => {
                e.stopPropagation();
                progressTracker.classList.toggle('collapsed');
                collapseProgress.textContent = progressTracker.classList.contains('collapsed') ? '+' : '−';
            });
        }

        // Challenge Description collapse
        const collapseChallenge = document.getElementById('collapseChallenge');
        const challengeDescription = document.getElementById('challengeDescription');

        if (collapseChallenge && challengeDescription) {
            collapseChallenge.addEventListener('click', (e) => {
                e.stopPropagation();
                challengeDescription.classList.toggle('collapsed');
                collapseChallenge.textContent = challengeDescription.classList.contains('collapsed') ? '+' : '−';
            });
        }
    }

    // Utility methods
    showNotification(message, type = 'info') {
        // Could implement toast notifications here
        console.log(`[${type.toUpperCase()}] ${message}`);
    }

    resetGame() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            localStorage.removeItem('ctf_progress');
            location.reload();
        }
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CTFApp();
    });
} else {
    new CTFApp();
}

// Prevent accidental page refresh during challenges
window.addEventListener('beforeunload', (e) => {
    if (window.challengeSystem && window.challengeSystem.currentLevel > 1) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

// Easter egg in console
console.log('%c', 'font-size: 1px; padding: 100px 150px; background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIj48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSI0MCIgZmlsbD0iIzAwZmY0MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+Q1lCRVJRVUVTVDwvdGV4dD48L3N2Zz4=) no-repeat;');
console.log('%c🔐 Looking for secrets in the console? Nice try, hacker! 😉', 'color: #00ff41; font-size: 14px;');
console.log('%cBut the real flags are in the challenges... Good luck! 🚀', 'color: #00ff41; font-size: 12px;');
