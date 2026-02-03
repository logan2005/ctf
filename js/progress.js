// Progress Tracking System
class ProgressTracker {
    constructor() {
        this.score = 0;
        this.levelsCompleted = [];
        this.startTime = Date.now();
        this.levelStartTime = Date.now();
        this.statistics = {
            totalCommands: 0,
            totalHints: 0,
            levelTimes: {},
            levelScores: {}
        };

        this.loadProgress();
        this.updateDisplay();
    }

    completeLevel(level) {
        if (this.levelsCompleted.includes(level)) {
            return; // Already completed
        }

        this.levelsCompleted.push(level);

        // Calculate level score
        const levelTime = Date.now() - this.levelStartTime;
        const hintsUsed = window.chatbot ? window.chatbot.hintsUsedThisLevel : 0;
        const levelScore = this.calculateLevelScore(levelTime, hintsUsed);

        this.score += levelScore;
        this.statistics.levelTimes[level] = levelTime;
        this.statistics.levelScores[level] = levelScore;

        // Save progress
        this.saveProgress();
        this.updateDisplay();

        // Reset for next level
        this.levelStartTime = Date.now();

        // Notify chatbot
        if (window.chatbot) {
            window.chatbot.celebrateCompletion();
        }
    }

    calculateLevelScore(timeMs, hintsUsed) {
        // Base score
        let score = 1000;

        // Time bonus (faster = more points)
        const minutes = timeMs / 60000;
        if (minutes < 2) {
            score += 500; // Speed demon!
        } else if (minutes < 5) {
            score += 300;
        } else if (minutes < 10) {
            score += 100;
        }

        // Hint penalty
        score -= (hintsUsed * 100);

        // Ensure minimum score
        return Math.max(score, 100);
    }

    updateDisplay() {
        const scoreDisplay = document.getElementById('scoreValue');
        if (scoreDisplay) {
            scoreDisplay.textContent = this.score.toLocaleString();
        }
    }

    saveProgress() {
        const progressData = {
            score: this.score,
            levelsCompleted: this.levelsCompleted,
            statistics: this.statistics,
            lastPlayed: Date.now()
        };

        try {
            localStorage.setItem('ctf_progress', JSON.stringify(progressData));
        } catch (e) {
            console.error('Failed to save progress:', e);
        }
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('ctf_progress');
            if (saved) {
                const data = JSON.parse(saved);
                this.score = data.score || 0;
                this.levelsCompleted = data.levelsCompleted || [];
                this.statistics = data.statistics || {
                    totalCommands: 0,
                    totalHints: 0,
                    levelTimes: {},
                    levelScores: {}
                };
            }
        } catch (e) {
            console.error('Failed to load progress:', e);
        }
    }

    resetProgress() {
        this.score = 0;
        this.levelsCompleted = [];
        this.statistics = {
            totalCommands: 0,
            totalHints: 0,
            levelTimes: {},
            levelScores: {}
        };
        this.saveProgress();
        this.updateDisplay();
    }

    getStatistics() {
        return {
            ...this.statistics,
            totalScore: this.score,
            levelsCompleted: this.levelsCompleted.length,
            totalTime: Date.now() - this.startTime
        };
    }

    formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        }
        return `${seconds}s`;
    }
}

// Export for use in app.js
window.ProgressTracker = ProgressTracker;
