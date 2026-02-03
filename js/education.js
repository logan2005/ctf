// Educational Content System

class EducationSystem {
    constructor() {
        this.educationalContent = this.defineEducationalContent();
        this.createEducationModal();
    }

    defineEducationalContent() {
        return {
            1: {
                title: "Linux Basics & File Navigation",
                summary: "You've mastered the fundamentals of Linux file system navigation!",
                concepts: [
                    {
                        name: "Hidden Files in Linux",
                        explanation: "Files starting with a dot (.) are hidden in Linux. They're commonly used for configuration files and user preferences.",
                        example: ".bashrc, .gitignore, .ssh/"
                    },
                    {
                        name: "ls Command",
                        explanation: "The 'ls' command lists directory contents. The -a flag shows all files including hidden ones, and -l provides detailed information.",
                        example: "ls -la shows all files with permissions, owner, size, and date"
                    },
                    {
                        name: "File Permissions",
                        explanation: "Linux uses a permission system (rwx) for read, write, and execute access for owner, group, and others.",
                        example: "-rw-r--r-- means owner can read/write, others can only read"
                    }
                ],
                resources: [
                    { title: "Linux Command Line Basics", url: "https://ubuntu.com/tutorials/command-line-for-beginners" },
                    { title: "File System Hierarchy", url: "https://www.pathname.com/fhs/" },
                    { title: "Linux Journey - Command Line", url: "https://linuxjourney.com/lesson/the-shell" }
                ],
                tips: [
                    "Always use 'ls -la' to see all files when exploring directories",
                    "The 'cat' command displays file contents - very useful for reading flags",
                    "Use 'pwd' to know your current location in the file system",
                    "Tab completion can save time when typing file names"
                ],
                nextSteps: "Next, you'll learn about network reconnaissance and port scanning!"
            },
            2: {
                title: "Network Reconnaissance & Port Scanning",
                summary: "You've learned how to discover network services and open ports!",
                concepts: [
                    {
                        name: "Port Scanning",
                        explanation: "Port scanning identifies open ports on a target system. Each port corresponds to a specific service (HTTP on 80, SSH on 22, etc.).",
                        example: "nmap scans ports to find running services"
                    },
                    {
                        name: "Common Ports",
                        explanation: "Well-known ports: 22 (SSH), 80 (HTTP), 443 (HTTPS), 21 (FTP), 3306 (MySQL), 5432 (PostgreSQL)",
                        example: "Port 80 typically runs web servers"
                    },
                    {
                        name: "Service Enumeration",
                        explanation: "After finding open ports, enumerate services to identify versions and potential vulnerabilities.",
                        example: "nmap -sV provides service version detection"
                    }
                ],
                resources: [
                    { title: "Nmap Official Guide", url: "https://nmap.org/book/man.html" },
                    { title: "Port Numbers Reference", url: "https://www.iana.org/assignments/service-names-port-numbers/" },
                    { title: "Network Scanning Techniques", url: "https://www.offensive-security.com/metasploit-unleashed/port-scanning/" }
                ],
                tips: [
                    "Always scan systematically - start with common ports, then expand",
                    "Document all findings - open ports, services, versions",
                    "Different scan types reveal different information (-sS, -sT, -sU)",
                    "Be aware of legal implications - only scan systems you own or have permission to test"
                ],
                nextSteps: "Next up: Cryptography! You'll learn to decode and crack encrypted messages."
            },
            3: {
                title: "Cryptography & Encoding",
                summary: "You've decoded your first encrypted messages!",
                concepts: [
                    {
                        name: "Base64 Encoding",
                        explanation: "Base64 is an encoding scheme that converts binary data to ASCII text. It's not encryption, just encoding!",
                        example: "SGVsbG8gV29ybGQh decodes to 'Hello World!'"
                    },
                    {
                        name: "Caesar Cipher",
                        explanation: "A substitution cipher that shifts letters by a fixed number. ROT13 is a special case with a shift of 13.",
                        example: "With shift 3: A→D, B→E, C→F"
                    },
                    {
                        name: "Encryption vs Encoding",
                        explanation: "Encoding transforms data for compatibility (Base64). Encryption secures data with keys (AES, RSA).",
                        example: "Base64 is reversible without a key; AES requires the encryption key"
                    }
                ],
                resources: [
                    { title: "Cryptography Basics", url: "https://www.khanacademy.org/computing/computer-science/cryptography" },
                    { title: "CyberChef - Crypto Tool", url: "https://gchq.github.io/CyberChef/" },
                    { title: "Practical Cryptography", url: "http://practicalcryptography.com/" }
                ],
                tips: [
                    "Always try Base64 decoding first - it's the most common encoding",
                    "Look for patterns in encrypted text to identify the cipher type",
                    "ROT13 is self-inverse - encoding and decoding use the same operation",
                    "Keep a toolkit of crypto tools handy (CyberChef, hashcat, john)"
                ],
                nextSteps: "Time to exploit web vulnerabilities! SQL injection awaits you."
            },
            4: {
                title: "Web Exploitation & SQL Injection",
                summary: "You've identified a critical web vulnerability!",
                concepts: [
                    {
                        name: "SQL Injection",
                        explanation: "SQLi occurs when user input is improperly sanitized, allowing attackers to manipulate database queries.",
                        example: "' OR '1'='1 bypasses authentication by making the query always true"
                    },
                    {
                        name: "Input Validation",
                        explanation: "Proper input validation and parameterized queries prevent SQL injection attacks.",
                        example: "Use prepared statements instead of string concatenation"
                    },
                    {
                        name: "OWASP Top 10",
                        explanation: "SQL Injection is part of the OWASP Top 10 most critical web application security risks.",
                        example: "Other risks include XSS, broken authentication, and sensitive data exposure"
                    }
                ],
                resources: [
                    { title: "OWASP SQL Injection", url: "https://owasp.org/www-community/attacks/SQL_Injection" },
                    { title: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security/sql-injection" },
                    { title: "SQLMap Tutorial", url: "https://github.com/sqlmapproject/sqlmap/wiki/Usage" }
                ],
                tips: [
                    "Always test input fields with special characters: ', \", --, ;",
                    "Look for error messages that reveal database structure",
                    "Union-based SQLi can extract data from other tables",
                    "As a developer: ALWAYS use parameterized queries!"
                ],
                nextSteps: "Final challenge: Privilege Escalation! Learn to gain higher system access."
            },
            5: {
                title: "Privilege Escalation",
                summary: "Congratulations! You've completed all challenges and learned privilege escalation!",
                concepts: [
                    {
                        name: "Privilege Escalation",
                        explanation: "The process of exploiting vulnerabilities to gain elevated access (from user to root/admin).",
                        example: "Finding SUID binaries, exploiting sudo misconfigurations, kernel exploits"
                    },
                    {
                        name: "SUID/SGID Binaries",
                        explanation: "Files with SUID bit run with owner's privileges. Misconfigured SUID binaries are common escalation vectors.",
                        example: "find / -perm -4000 finds all SUID files"
                    },
                    {
                        name: "Least Privilege Principle",
                        explanation: "Users should have only the minimum privileges necessary. Violations of this principle create escalation opportunities.",
                        example: "Don't run services as root; use dedicated service accounts"
                    }
                ],
                resources: [
                    { title: "Linux Privilege Escalation", url: "https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Linux%20-%20Privilege%20Escalation.md" },
                    { title: "GTFOBins", url: "https://gtfobins.github.io/" },
                    { title: "Privilege Escalation Techniques", url: "https://www.hackingarticles.in/linux-privilege-escalation-using-suid-binaries/" }
                ],
                tips: [
                    "Always enumerate: check sudo rights, SUID files, cron jobs, writable files",
                    "LinPEAS and LinEnum are great automated enumeration tools",
                    "Check /etc/passwd and /etc/shadow for weak permissions",
                    "Look for credentials in config files, bash history, and environment variables"
                ],
                nextSteps: "You've completed the CyberQuest CTF! Continue learning with real-world platforms like HackTheBox, TryHackMe, and CTFtime."
            }
        };
    }

    createEducationModal() {
        const modal = document.createElement('div');
        modal.className = 'modal education-modal';
        modal.id = 'educationModal';
        modal.innerHTML = `
            <div class="modal-content education-content">
                <button class="modal-close" id="closeEducation">×</button>
                <div class="education-header">
                    <div class="education-icon">📚</div>
                    <h2 class="education-title" id="educationTitle">Learning Summary</h2>
                </div>
                <div class="education-body" id="educationBody">
                    <!-- Content will be dynamically inserted -->
                </div>
                <div class="education-footer">
                    <button class="education-btn secondary" id="skipEducation">Skip</button>
                    <button class="education-btn primary" id="continueEducation">Continue →</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Event listeners
        document.getElementById('closeEducation').addEventListener('click', () => this.hideEducation());
        document.getElementById('skipEducation').addEventListener('click', () => this.hideEducation());
        document.getElementById('continueEducation').addEventListener('click', () => this.hideEducation());
    }

    showEducation(level) {
        const content = this.educationalContent[level];
        if (!content) return;

        const modal = document.getElementById('educationModal');
        const title = document.getElementById('educationTitle');
        const body = document.getElementById('educationBody');

        title.textContent = content.title;
        body.innerHTML = this.generateEducationHTML(content);

        modal.classList.add('show');

        // Play achievement sound
        if (window.animationSystem) {
            window.animationSystem.playSound('achievement');
        }
    }

    generateEducationHTML(content) {
        return `
            <div class="education-summary">
                <p class="summary-text">${content.summary}</p>
            </div>

            <div class="education-section">
                <h3 class="section-title">🎯 Key Concepts Learned</h3>
                <div class="concepts-grid">
                    ${content.concepts.map(concept => `
                        <div class="concept-card">
                            <h4 class="concept-name">${concept.name}</h4>
                            <p class="concept-explanation">${concept.explanation}</p>
                            <div class="concept-example">
                                <span class="example-label">Example:</span>
                                <code>${concept.example}</code>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="education-section">
                <h3 class="section-title">💡 Pro Tips</h3>
                <ul class="tips-list">
                    ${content.tips.map(tip => `
                        <li class="tip-item">${tip}</li>
                    `).join('')}
                </ul>
            </div>

            <div class="education-section">
                <h3 class="section-title">📖 Learning Resources</h3>
                <div class="resources-grid">
                    ${content.resources.map(resource => `
                        <a href="${resource.url}" target="_blank" class="resource-card">
                            <span class="resource-icon">🔗</span>
                            <span class="resource-title">${resource.title}</span>
                            <span class="resource-arrow">→</span>
                        </a>
                    `).join('')}
                </div>
            </div>

            <div class="education-section next-steps">
                <h3 class="section-title">🚀 What's Next?</h3>
                <p class="next-steps-text">${content.nextSteps}</p>
            </div>
        `;
    }

    hideEducation() {
        const modal = document.getElementById('educationModal');
        modal.classList.remove('show');
    }

    // Quick reference panel
    createQuickReference() {
        const panel = document.createElement('div');
        panel.className = 'quick-reference-panel collapsed';
        panel.id = 'quickReference';
        panel.innerHTML = `
            <button class="quick-ref-toggle" id="toggleQuickRef">
                <span class="toggle-icon">📖</span>
                <span class="toggle-text">Quick Reference</span>
            </button>
            <div class="quick-ref-content">
                <h3>Common Commands</h3>
                <div class="command-list">
                    <div class="command-item">
                        <code>ls -la</code>
                        <span>List all files</span>
                    </div>
                    <div class="command-item">
                        <code>cat [file]</code>
                        <span>Read file</span>
                    </div>
                    <div class="command-item">
                        <code>cd [dir]</code>
                        <span>Change directory</span>
                    </div>
                    <div class="command-item">
                        <code>pwd</code>
                        <span>Current directory</span>
                    </div>
                    <div class="command-item">
                        <code>grep [pattern]</code>
                        <span>Search text</span>
                    </div>
                    <div class="command-item">
                        <code>find [name]</code>
                        <span>Find files</span>
                    </div>
                    <div class="command-item">
                        <code>nmap [target]</code>
                        <span>Scan ports</span>
                    </div>
                    <div class="command-item">
                        <code>base64 -d</code>
                        <span>Decode base64</span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(panel);

        // Toggle functionality
        document.getElementById('toggleQuickRef').addEventListener('click', () => {
            panel.classList.toggle('collapsed');
        });
    }
}

// Export for use in app.js
window.EducationSystem = EducationSystem;
