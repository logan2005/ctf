# CyberQuest CTF Platform

An interactive, multi-level Capture The Flag (CTF) platform with an integrated AI chatbot assistant. Learn cybersecurity through hands-on challenges!

## 🚀 Features

- **5 Progressive CTF Levels**: From Linux basics to privilege escalation
- **Terminal Simulation**: Realistic command-line interface with virtual filesystem
- **AI Chatbot Assistant**: Context-aware hints and step-by-step guidance
- **Score Tracking**: Points based on completion time and hints used
- **Beautiful UI**: Cybersecurity-themed dark design with matrix-green aesthetics
- **Progress Persistence**: Your progress is saved automatically

## 🎯 Challenge Levels

1. **Linux Basics** - Master file navigation and find hidden files
2. **Network Reconnaissance** - Use nmap to discover services and ports
3. **Cryptography** - Decode Base64 and crack ciphers
4. **Web Exploitation** - Identify SQL injection vulnerabilities
5. **Privilege Escalation** - Find flags in system files

## 🛠️ Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- Node.js (for running the local server)

### Installation & Running

1. Navigate to the project directory:
```bash
cd ctf-platform
```

2. Start the local server:
```bash
npx -y http-server ./ -p 8080
```

3. Open your browser and navigate to:
```
http://localhost:8080
```

## 🎮 How to Play

### Terminal Commands
The terminal supports various Linux commands:
- `ls [-la]` - List directory contents
- `cd [dir]` - Change directory
- `cat [file]` - Display file contents
- `pwd` - Print working directory
- `grep [pattern] [file]` - Search for patterns
- `find [name]` - Find files
- `nmap [target]` - Network scanner
- `base64 [-d] [text]` - Encode/decode base64
- `help` - Show all available commands

### Chatbot Assistant
The AI assistant on the right side can help you:
- Click **"Hint"** for progressive hints (3 per level)
- Click **"Objective"** to see current goals
- Click **"Help"** for general assistance
- Type questions directly in the chat

### Submitting Flags
When you find a flag (format: `CTF{...}`):
1. Enter it in the flag submission box
2. Click "Submit"
3. If correct, you'll advance to the next level!

## 🏆 Scoring System

- **Base Score**: 1000 points per level
- **Speed Bonus**: Up to 500 points for fast completion
- **Hint Penalty**: -100 points per hint used

## 💡 Tips

- Start each level by clicking "Objective" in the chatbot
- Use `help` in the terminal to see available commands
- Hidden files start with a dot (.)
- Read file contents carefully - flags might be hidden in comments
- Don't be afraid to ask the chatbot for hints!

## 🎨 Design Features

- **Dark Theme**: Easy on the eyes for long hacking sessions
- **Matrix Green**: Classic hacker aesthetic
- **Glassmorphism**: Modern, semi-transparent UI elements
- **Smooth Animations**: Polished user experience
- **Responsive Design**: Works on desktop and tablet

## 🔧 Technical Stack

- **Frontend**: Pure HTML, CSS, JavaScript (no frameworks)
- **Styling**: Custom CSS with CSS variables
- **Fonts**: Fira Code (terminal), Inter (UI)
- **Storage**: LocalStorage for progress persistence

## 📁 Project Structure

```
ctf-platform/
├── index.html          # Main application page
├── css/
│   └── style.css       # All styling and design system
├── js/
│   ├── app.js          # Main application controller
│   ├── terminal.js     # Terminal simulation engine
│   ├── challenges.js   # Challenge definitions and validation
│   ├── chatbot.js      # AI chatbot assistant
│   └── progress.js     # Progress tracking and scoring
└── README.md           # This file
```

## 🎓 Learning Outcomes

By completing this CTF, you'll learn:
- Linux command-line navigation
- Network reconnaissance techniques
- Basic cryptography (Base64, Caesar cipher)
- Web vulnerability identification
- Privilege escalation concepts
- Problem-solving and research skills

## 🐛 Troubleshooting

**Terminal not responding?**
- Click inside the terminal area to focus it
- Press Escape to refocus the terminal input

**Lost your progress?**
- Progress is saved automatically in your browser
- Clear browser data will reset progress

**Stuck on a level?**
- Use the chatbot's hint system
- Type `help` in the terminal for available commands
- Check the objectives by clicking "Objective"

## 🎉 Easter Eggs

There are hidden features and messages throughout the platform. Open your browser's developer console to find some surprises!

## 📝 License

This is an educational project. Feel free to use and modify for learning purposes.

## 🤝 Contributing

This is a demonstration project. Feel free to fork and enhance it with:
- More challenge levels
- Additional terminal commands
- New vulnerability types
- Multiplayer features
- Leaderboards

---

**Good luck, hacker! May your flags be plentiful and your exploits successful! 🚀**
