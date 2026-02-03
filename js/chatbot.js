// Chatbot Assistant
class Chatbot {
    constructor() {
        this.messagesContainer = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.sendBtn = document.getElementById('sendChatBtn');
        this.hintsUsedThisLevel = 0;
        this.currentHintIndex = 0;

        this.attachEventListeners();
        this.sendWelcomeMessage();
    }

    attachEventListeners() {
        this.sendBtn.addEventListener('click', () => this.handleUserMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleUserMessage();
            }
        });

        // Quick action buttons
        const quickActions = document.querySelectorAll('.quick-action-btn');
        quickActions.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.handleQuickAction(action);
            });
        });
    }

    handleUserMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        this.sendMessage(message, 'user');
        this.input.value = '';

        // Process user message and respond
        setTimeout(() => {
            this.respondToUser(message.toLowerCase());
        }, 500);
    }

    respondToUser(message) {
        if (message.includes('hint') || message.includes('help me') || message.includes('stuck')) {
            this.provideHint();
        } else if (message.includes('objective') || message.includes('goal') || message.includes('what') && message.includes('do')) {
            this.explainObjective();
        } else if (message.includes('command') || message.includes('how')) {
            this.provideCommandHelp(message);
        } else if (message.includes('hello') || message.includes('hi')) {
            this.sendMessage('Hello! I\'m here to help you complete the CTF challenges. Ask me for hints, objectives, or command help anytime!', 'bot');
        } else if (message.includes('thank')) {
            this.sendMessage('You\'re welcome! Keep up the great work! 💪', 'bot');
        } else {
            this.sendMessage('I\'m here to help! Try asking for a "hint", "objective", or specific command help. You can also use the quick action buttons below!', 'bot');
        }
    }

    handleQuickAction(action) {
        switch (action) {
            case 'help':
                this.provideGeneralHelp();
                break;
            case 'hint':
                this.provideHint();
                break;
            case 'objective':
                this.explainObjective();
                break;
        }
    }

    provideGeneralHelp() {
        const helpMessage = `
🤖 I'm your AI assistant for this CTF challenge!

I can help you with:
• Hints for the current level
• Explaining objectives
• Command syntax and usage
• General guidance

Just ask me anything, or use the quick action buttons!
        `.trim();

        this.sendMessage(helpMessage, 'bot');
    }

    provideHint() {
        if (!window.challengeSystem) return;

        const hint = window.challengeSystem.getHint(this.currentHintIndex);

        if (hint) {
            const hintNumber = this.currentHintIndex + 1;
            this.sendMessage(`💡 Hint ${hintNumber}/3: ${hint}`, 'bot');
            this.currentHintIndex++;
            this.hintsUsedThisLevel++;

            if (this.currentHintIndex >= 3) {
                this.sendMessage('That was the last hint for this level. You\'ve got this! 🚀', 'bot');
            }
        } else {
            this.sendMessage('You\'ve used all available hints for this level. Keep trying - you\'re close!', 'bot');
        }
    }

    explainObjective() {
        if (!window.challengeSystem) return;

        const challenge = window.challengeSystem.getCurrentChallenge();
        if (challenge) {
            let message = `📋 Current Challenge: ${challenge.title}\n\n`;
            message += `Objectives:\n`;
            challenge.objectives.forEach((obj, index) => {
                message += `${index + 1}. ${obj}\n`;
            });

            this.sendMessage(message.trim(), 'bot');
        }
    }

    provideCommandHelp(message) {
        let helpText = '';

        if (message.includes('ls')) {
            helpText = '📖 ls command:\n• ls - List files in current directory\n• ls -a - Show hidden files (starting with .)\n• ls -l - Long format with details\n• ls -la - Combine both flags';
        } else if (message.includes('cd')) {
            helpText = '📖 cd command:\n• cd [directory] - Change to directory\n• cd .. - Go up one level\n• cd ~ - Go to home directory\n• cd / - Go to root directory';
        } else if (message.includes('cat')) {
            helpText = '📖 cat command:\n• cat [file] - Display file contents\n• Example: cat filename.txt';
        } else if (message.includes('grep')) {
            helpText = '📖 grep command:\n• grep [pattern] [file] - Search for pattern in file\n• Example: grep "flag" file.txt';
        } else if (message.includes('find')) {
            helpText = '📖 find command:\n• find [filename] - Search for files\n• Example: find flag.txt';
        } else if (message.includes('nmap')) {
            helpText = '📖 nmap command:\n• nmap [target] - Scan network ports\n• Example: nmap localhost';
        } else if (message.includes('base64')) {
            helpText = '📖 base64 command:\n• base64 [text] - Encode to base64\n• base64 -d [encoded] - Decode from base64\n• Example: base64 -d Q1RGe2ZsYWd9';
        } else {
            helpText = 'Type "help" in the terminal to see all available commands, or ask me about a specific command!';
        }

        this.sendMessage(helpText, 'bot');
    }

    onLevelStart(level) {
        this.currentHintIndex = 0;
        this.hintsUsedThisLevel = 0;

        const challenge = window.challengeSystem.getCurrentChallenge();
        if (!challenge) return;

        setTimeout(() => {
            let welcomeMessage = `🎯 ${challenge.title}\n\n`;
            welcomeMessage += `${challenge.description}\n\n`;
            welcomeMessage += `Ready to begin? Check your objectives and start exploring! Type "help" in the terminal for available commands.`;

            this.sendMessage(welcomeMessage, 'bot');
        }, 500);

        // Provide initial guidance based on level
        setTimeout(() => {
            this.provideInitialGuidance(level);
        }, 2000);
    }

    provideInitialGuidance(level) {
        let guidance = '';

        switch (level) {
            case 1:
                guidance = '👉 Start by exploring your current directory. Try using "ls" to see what files are here. Remember, some files might be hidden!';
                break;
            case 2:
                guidance = '👉 Network reconnaissance is all about discovering what\'s running on a system. The nmap command is your friend here!';
                break;
            case 3:
                guidance = '👉 Cryptography challenges often involve encoded or encrypted data. Look for files that might contain encoded information!';
                break;
            case 4:
                guidance = '👉 Web applications often have vulnerabilities. Check the web server directory (/var/www) for clues!';
                break;
            case 5:
                guidance = '👉 Privilege escalation requires understanding user permissions. The /etc/passwd file contains valuable information about system users!';
                break;
        }

        if (guidance) {
            this.sendMessage(guidance, 'bot');
        }
    }

    sendMessage(text, sender = 'bot') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;

        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = this.getCurrentTime();

        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    sendWelcomeMessage() {
        const welcome = `
👋 Welcome to CyberQuest CTF!

I'm your AI assistant, here to guide you through these cybersecurity challenges.

🎯 What I can do:
• Provide hints when you're stuck
• Explain objectives and goals
• Help with command syntax
• Give encouragement!

Let's start your hacking journey! Click "Objective" to see your first challenge.
        `.trim();

        this.sendMessage(welcome, 'bot');
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    scrollToBottom() {
        // Use setTimeout to ensure DOM has updated
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 10);
    }

    // Public method to send automated messages
    notify(message) {
        this.sendMessage(message, 'bot');
    }

    // Celebration message for level completion
    celebrateCompletion() {
        const celebrations = [
            '🎉 Excellent work! You found the flag!',
            '🏆 Outstanding! Level completed!',
            '⭐ Brilliant! You\'re a natural hacker!',
            '🚀 Amazing! On to the next challenge!',
            '💪 Fantastic job! Keep it up!'
        ];

        const message = celebrations[Math.floor(Math.random() * celebrations.length)];
        this.sendMessage(message, 'bot');
    }
}

// Export for use in app.js
window.Chatbot = Chatbot;
