// Animation and Visual Effects System

class AnimationSystem {
    constructor() {
        this.particleContainer = this.createParticleContainer();
        this.soundEnabled = localStorage.getItem('ctf_sound_enabled') !== 'false';
        this.initSoundToggle();
    }

    createParticleContainer() {
        const container = document.createElement('div');
        container.id = 'particle-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(container);
        return container;
    }

    // Particle explosion effect
    createParticleExplosion(x, y, color = '#00ff41', count = 30) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / count;
            const velocity = 2 + Math.random() * 3;
            const size = 3 + Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                box-shadow: 0 0 10px ${color};
                pointer-events: none;
            `;
            
            this.particleContainer.appendChild(particle);
            
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            this.animateParticle(particle, vx, vy);
        }
    }

    animateParticle(particle, vx, vy) {
        let x = parseFloat(particle.style.left);
        let y = parseFloat(particle.style.top);
        let opacity = 1;
        let gravity = 0.1;
        
        const animate = () => {
            x += vx;
            y += vy;
            vy += gravity;
            opacity -= 0.02;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Confetti effect for major achievements
    createConfetti(duration = 3000) {
        const colors = ['#00ff41', '#00cc33', '#10b981', '#3b82f6', '#f59e0b'];
        const confettiCount = 100;
        const interval = duration / confettiCount;
        
        let count = 0;
        const confettiInterval = setInterval(() => {
            if (count >= confettiCount) {
                clearInterval(confettiInterval);
                return;
            }
            
            const x = Math.random() * window.innerWidth;
            const color = colors[Math.floor(Math.random() * colors.length)];
            this.createConfettiPiece(x, color);
            count++;
        }, interval);
    }

    createConfettiPiece(x, color) {
        const confetti = document.createElement('div');
        const size = 8 + Math.random() * 6;
        
        confetti.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: -20px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            transform: rotate(${Math.random() * 360}deg);
            box-shadow: 0 0 10px ${color};
        `;
        
        this.particleContainer.appendChild(confetti);
        
        const duration = 2000 + Math.random() * 2000;
        const rotation = Math.random() * 720 - 360;
        const drift = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            { 
                transform: `translate(0, 0) rotate(0deg)`,
                opacity: 1
            },
            { 
                transform: `translate(${drift}px, ${window.innerHeight + 20}px) rotate(${rotation}deg)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => confetti.remove();
    }

    // Screen shake effect
    shakeScreen(intensity = 10, duration = 500) {
        const appContainer = document.querySelector('.app-container');
        if (!appContainer) return;
        
        const originalTransform = appContainer.style.transform;
        const startTime = Date.now();
        
        const shake = () => {
            const elapsed = Date.now() - startTime;
            if (elapsed > duration) {
                appContainer.style.transform = originalTransform;
                return;
            }
            
            const progress = elapsed / duration;
            const currentIntensity = intensity * (1 - progress);
            
            const x = (Math.random() - 0.5) * currentIntensity;
            const y = (Math.random() - 0.5) * currentIntensity;
            
            appContainer.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(shake);
        };
        
        shake();
    }

    // Glow pulse effect
    pulseGlow(element, color = '#00ff41', duration = 1000) {
        if (!element) return;
        
        element.animate([
            { boxShadow: `0 0 5px ${color}` },
            { boxShadow: `0 0 30px ${color}, 0 0 60px ${color}` },
            { boxShadow: `0 0 5px ${color}` }
        ], {
            duration: duration,
            iterations: 1,
            easing: 'ease-in-out'
        });
    }

    // Type writer effect
    typeWriter(element, text, speed = 50) {
        if (!element) return Promise.resolve();
        
        return new Promise((resolve) => {
            element.textContent = '';
            let i = 0;
            
            const type = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            };
            
            type();
        });
    }

    // Achievement popup
    showAchievement(title, description, icon = '🏆') {
        const achievement = document.createElement('div');
        achievement.className = 'achievement-popup';
        achievement.innerHTML = `
            <div class="achievement-icon">${icon}</div>
            <div class="achievement-content">
                <div class="achievement-title">${title}</div>
                <div class="achievement-description">${description}</div>
            </div>
        `;
        
        document.body.appendChild(achievement);
        
        // Play sound
        this.playSound('achievement');
        
        // Animate in
        setTimeout(() => achievement.classList.add('show'), 10);
        
        // Animate out
        setTimeout(() => {
            achievement.classList.remove('show');
            setTimeout(() => achievement.remove(), 300);
        }, 4000);
    }

    // Sound effects
    playSound(type) {
        if (!this.soundEnabled) return;
        
        const sounds = {
            success: { frequency: 800, duration: 200 },
            error: { frequency: 200, duration: 300 },
            achievement: { frequency: 1000, duration: 150 },
            click: { frequency: 600, duration: 50 },
            levelUp: { frequency: 1200, duration: 300 }
        };
        
        const sound = sounds[type];
        if (!sound) return;
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = sound.frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration / 1000);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + sound.duration / 1000);
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    initSoundToggle() {
        // Add sound toggle button to header
        const header = document.querySelector('.app-header .header-right');
        if (!header) return;
        
        const soundToggle = document.createElement('button');
        soundToggle.className = 'sound-toggle-btn';
        soundToggle.innerHTML = this.soundEnabled ? '🔊' : '🔇';
        soundToggle.title = 'Toggle Sound Effects';
        
        soundToggle.addEventListener('click', () => {
            this.soundEnabled = !this.soundEnabled;
            localStorage.setItem('ctf_sound_enabled', this.soundEnabled);
            soundToggle.innerHTML = this.soundEnabled ? '🔊' : '🔇';
            this.playSound('click');
        });
        
        header.insertBefore(soundToggle, header.firstChild);
    }

    // Matrix rain effect enhancement
    enhanceMatrixEffect() {
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.1;
            pointer-events: none;
        `;
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = '01アイウエオカキクケコサシスセソタチツテト';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        const draw = () => {
            ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        setInterval(draw, 50);
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Loading animation
    showLoadingAnimation(message = 'Loading...') {
        const loader = document.createElement('div');
        loader.className = 'loading-overlay';
        loader.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <div class="loading-text">${message}</div>
            </div>
        `;
        document.body.appendChild(loader);
        return loader;
    }

    hideLoadingAnimation(loader) {
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => loader.remove(), 300);
        }
    }
}

// Export for use in app.js
window.AnimationSystem = AnimationSystem;
