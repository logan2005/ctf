// Challenge System
class ChallengeSystem {
    constructor() {
        this.currentLevel = 1;
        this.challenges = this.defineChallenges();
        this.levelProgress = {};
        this.commandsExecuted = [];

        this.initializeLevel(1);
        this.attachEventListeners();
    }

    defineChallenges() {
        return {
            1: {
                title: 'Level 1: Linux Basics',
                description: 'Welcome to your first challenge! Master basic Linux commands and find the hidden flag.',
                objectives: [
                    'Navigate the filesystem using cd and ls',
                    'Find hidden files (hint: use ls -la)',
                    'Read file contents with cat',
                    'Locate the flag in the hidden file'
                ],
                flag: 'CTF{f1rst_st3ps_1n_l1nux}',
                hints: [
                    'Hidden files in Linux start with a dot (.). Try using ls with the -a flag.',
                    'Look in your home directory (/home/user). Use ls -la to see all files.',
                    'Found the hidden file? Use cat to read its contents!'
                ],
                requiredCommands: ['ls', 'cat'],
                validation: (commands) => {
                    return commands.includes('ls') &&
                        (commands.includes('cat .hidden_flag') || commands.some(cmd => cmd.includes('.hidden')));
                }
            },
            2: {
                title: 'Level 2: Network Reconnaissance',
                description: 'Time to scan the network! Use your reconnaissance skills to discover open ports and services.',
                objectives: [
                    'Use nmap to scan the target system',
                    'Identify all open ports',
                    'Find the vulnerable service',
                    'Locate the flag in the service configuration'
                ],
                flag: 'CTF{p0rt_sc4nn1ng_pr0}',
                hints: [
                    'Network scanning tools like nmap can discover open ports. Try: nmap localhost',
                    'Check the /etc directory for service configuration files.',
                    'Look for a file named services.conf and read it with cat.'
                ],
                requiredCommands: ['nmap'],
                validation: (commands) => {
                    return commands.includes('nmap') &&
                        commands.some(cmd => cmd.includes('cat') && cmd.includes('services'));
                }
            },
            3: {
                title: 'Level 3: Cryptography Challenge',
                description: 'Decode encrypted messages using various cryptographic techniques.',
                objectives: [
                    'Find the encrypted files in your home directory',
                    'Decode the Base64 encoded message',
                    'Crack the Caesar cipher',
                    'Submit the decoded flag'
                ],
                flag: 'CTF{d3c0d3d_b4s364_fl4g}',
                hints: [
                    'Base64 is a common encoding scheme. Use: base64 -d [encoded_text]',
                    'The encrypted.txt file contains a Base64 string. Decode it!',
                    'Remember: base64 -d Q1RGe2QzYzBkM2RfYjRzMzY0X2ZsNGd9'
                ],
                requiredCommands: ['base64', 'cat'],
                validation: (commands) => {
                    return commands.some(cmd => cmd.includes('base64') && cmd.includes('-d'));
                }
            },
            4: {
                title: 'Level 4: Web Exploitation',
                description: 'Discover and exploit a SQL injection vulnerability in a web application.',
                objectives: [
                    'Examine the web application source code',
                    'Identify the SQL injection vulnerability',
                    'Find the flag in the HTML comments',
                    'Understand how SQL injection works'
                ],
                flag: 'CTF{sql_1nj3ct10n_m4st3r}',
                hints: [
                    'Web applications are often stored in /var/www/. Check there!',
                    'Use cat to read the index.html file in /var/www/',
                    'Look for HTML comments (<!-- -->) that might contain useful information.'
                ],
                requiredCommands: ['cat'],
                validation: (commands) => {
                    return commands.some(cmd => cmd.includes('cat') && cmd.includes('www'));
                }
            },
            5: {
                title: 'Level 5: Privilege Escalation',
                description: 'Final challenge! Find a way to escalate your privileges and capture the root flag.',
                objectives: [
                    'Enumerate the system for privilege escalation vectors',
                    'Check /etc/passwd for user information',
                    'Find users with elevated privileges',
                    'Extract the flag from the admin user entry'
                ],
                flag: 'CTF{pr1v_3sc_m4st3r}',
                hints: [
                    'The /etc/passwd file contains user account information.',
                    'Use cat /etc/passwd to view all users on the system.',
                    'Look for the admin user - the flag is hidden in their entry!'
                ],
                requiredCommands: ['cat'],
                validation: (commands) => {
                    return commands.some(cmd => cmd.includes('cat') && cmd.includes('passwd'));
                }
            }
        };
    }

    attachEventListeners() {
        // Listen for terminal commands
        window.addEventListener('terminalCommand', (e) => {
            this.trackCommand(e.detail.fullCommand);
        });

        // Listen for flag submissions
        document.getElementById('submitFlagBtn').addEventListener('click', () => {
            this.checkFlag();
        });

        document.getElementById('flagInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkFlag();
            }
        });
    }

    initializeLevel(level) {
        this.currentLevel = level;
        this.commandsExecuted = [];

        const challenge = this.challenges[level];
        if (!challenge) return;

        // Update UI
        document.getElementById('challengeTitle').textContent = challenge.title;
        document.getElementById('challengeText').textContent = challenge.description;

        // Update objectives
        const objectivesContainer = document.getElementById('challengeObjectives');
        objectivesContainer.innerHTML = '<h3>Objectives:</h3><ul>' +
            challenge.objectives.map(obj => `<li>${obj}</li>`).join('') +
            '</ul>';

        // Update progress tracker
        this.updateProgressTracker();

        // Update level display
        document.getElementById('currentLevelDisplay').textContent = level;

        // Update terminal filesystem for this level
        if (window.terminal) {
            window.terminal.updateFilesystemForLevel(level);
        }

        // Notify chatbot of level change
        if (window.chatbot) {
            window.chatbot.onLevelStart(level);
        }
    }

    trackCommand(command) {
        this.commandsExecuted.push(command.toLowerCase());

        // Check if challenge requirements are being met
        const challenge = this.challenges[this.currentLevel];
        if (challenge && challenge.validation) {
            const isValid = challenge.validation(this.commandsExecuted);
            if (isValid && window.chatbot) {
                window.chatbot.sendMessage('Great progress! You\'re on the right track. Don\'t forget to submit the flag when you find it!', 'bot');
            }
        }
    }

    checkFlag() {
        const flagInput = document.getElementById('flagInput');
        const submittedFlag = flagInput.value.trim();
        const feedback = document.getElementById('flagFeedback');

        if (!submittedFlag) {
            this.showFeedback('Please enter a flag', 'error');
            return;
        }

        const challenge = this.challenges[this.currentLevel];

        if (submittedFlag === challenge.flag) {
            this.showFeedback('🎉 Correct! Flag accepted!', 'success');
            flagInput.value = '';

            // Visual effects!
            if (window.animationSystem) {
                // Particle explosion at submit button
                const submitBtn = document.getElementById('submitFlagBtn');
                const rect = submitBtn.getBoundingClientRect();
                window.animationSystem.createParticleExplosion(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2,
                    '#00ff41',
                    50
                );

                // Play success sound
                window.animationSystem.playSound('success');

                // Show achievement popup
                window.animationSystem.showAchievement(
                    `Level ${this.currentLevel} Complete!`,
                    challenge.title,
                    '🎯'
                );
            }

            // Award points
            if (window.progressTracker) {
                window.progressTracker.completeLevel(this.currentLevel);
            }

            // Show victory modal
            setTimeout(() => {
                this.showVictoryModal();
            }, 1000);
        } else {
            this.showFeedback('❌ Incorrect flag. Keep trying!', 'error');

            // Play error sound
            if (window.animationSystem) {
                window.animationSystem.playSound('error');
                window.animationSystem.shakeScreen(5, 300);
            }

            // Offer hint through chatbot
            if (window.chatbot) {
                window.chatbot.sendMessage('That\'s not the right flag. Would you like a hint? Click the "Hint" button!', 'bot');
            }
        }
    }

    showFeedback(message, type) {
        const feedback = document.getElementById('flagFeedback');
        feedback.textContent = message;
        feedback.className = `flag-feedback show ${type}`;

        setTimeout(() => {
            feedback.classList.remove('show');
        }, 5000);
    }

    showVictoryModal() {
        const modal = document.getElementById('victoryModal');
        const message = document.getElementById('victoryMessage');
        const stats = document.getElementById('victoryStats');

        const challenge = this.challenges[this.currentLevel];
        message.textContent = `You've completed ${challenge.title}!`;

        // Show stats
        const hintsUsed = window.chatbot ? window.chatbot.hintsUsedThisLevel : 0;
        const commandsUsed = this.commandsExecuted.length;

        stats.innerHTML = `
            <p><strong>Commands Used:</strong> ${commandsUsed}</p>
            <p><strong>Hints Used:</strong> ${hintsUsed}</p>
            <p><strong>Score:</strong> ${window.progressTracker ? window.progressTracker.score : 0}</p>
        `;

        modal.classList.add('show');

        // Play level up sound
        if (window.animationSystem) {
            window.animationSystem.playSound('levelUp');
        }

        // Setup next level button
        const nextBtn = document.getElementById('nextLevelBtn');
        nextBtn.onclick = () => {
            modal.classList.remove('show');

            // Show educational content before next level
            if (window.educationSystem) {
                window.educationSystem.showEducation(this.currentLevel);

                // Continue to next level after education modal is closed
                setTimeout(() => {
                    this.nextLevel();
                }, 500);
            } else {
                this.nextLevel();
            }
        };

        // Hide button if this is the last level
        if (this.currentLevel >= 5) {
            nextBtn.textContent = '🏆 Complete!';
            nextBtn.onclick = () => {
                modal.classList.remove('show');

                // Show final education content
                if (window.educationSystem) {
                    window.educationSystem.showEducation(this.currentLevel);
                }

                setTimeout(() => {
                    this.showFinalVictory();
                }, 500);
            };
        }
    }

    nextLevel() {
        if (this.currentLevel < 5) {
            this.initializeLevel(this.currentLevel + 1);
        }
    }

    showFinalVictory() {
        if (window.chatbot) {
            window.chatbot.sendMessage('🎊 CONGRATULATIONS! You\'ve completed all 5 CTF levels! You\'re now a certified CyberQuest champion! 🏆', 'bot');
        }

        // Epic confetti celebration!
        if (window.animationSystem) {
            window.animationSystem.createConfetti(5000);
            window.animationSystem.showAchievement(
                'CTF MASTER!',
                'All 5 Levels Completed!',
                '🏆'
            );
        }

        const terminal = window.terminal;
        if (terminal) {
            terminal.clear();
            terminal.printLine('═══════════════════════════════════════════════════════', 'success');
            terminal.printLine('         🏆 CYBERQUEST CTF COMPLETED! 🏆              ', 'success');
            terminal.printLine('═══════════════════════════════════════════════════════', 'success');
            terminal.printLine('', 'success');
            terminal.printLine('You have successfully completed all 5 levels!', 'success');
            terminal.printLine(`Final Score: ${window.progressTracker.score}`, 'success');
            terminal.printLine('', 'success');
            terminal.printLine('You are now a CyberQuest Master!', 'success');
            terminal.printLine('═══════════════════════════════════════════════════════', 'success');
        }
    }

    updateProgressTracker() {
        const items = document.querySelectorAll('.progress-item');
        items.forEach((item, index) => {
            const level = index + 1;
            item.classList.remove('active', 'completed');

            if (level < this.currentLevel) {
                item.classList.add('completed');
            } else if (level === this.currentLevel) {
                item.classList.add('active');
            }
        });
    }

    getCurrentChallenge() {
        return this.challenges[this.currentLevel];
    }

    getHint(hintIndex) {
        const challenge = this.challenges[this.currentLevel];
        if (challenge && challenge.hints && challenge.hints[hintIndex]) {
            return challenge.hints[hintIndex];
        }
        return null;
    }
}

// Export for use in app.js
window.ChallengeSystem = ChallengeSystem;
