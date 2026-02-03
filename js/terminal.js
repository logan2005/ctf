// Terminal Simulation Engine
class Terminal {
    constructor() {
        this.history = [];
        this.historyIndex = -1;
        this.currentDirectory = '/home/user';
        this.filesystem = this.createFilesystem();
        this.commandHistory = [];
        
        this.initializeElements();
        this.attachEventListeners();
        this.printWelcome();
    }
    
    initializeElements() {
        this.input = document.getElementById('terminalInput');
        this.output = document.getElementById('terminalOutput');
        this.prompt = document.getElementById('terminalPrompt');
    }
    
    attachEventListeners() {
        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }
    
    createFilesystem() {
        return {
            '/': {
                type: 'directory',
                children: {
                    'home': {
                        type: 'directory',
                        children: {
                            'user': {
                                type: 'directory',
                                children: {
                                    'welcome.txt': {
                                        type: 'file',
                                        content: 'Welcome to CyberQuest CTF!\nYour mission: Complete all 5 levels.\nGood luck, hacker!'
                                    },
                                    '.hidden_flag': {
                                        type: 'file',
                                        content: 'CTF{f1rst_st3ps_1n_l1nux}'
                                    },
                                    'documents': {
                                        type: 'directory',
                                        children: {
                                            'notes.txt': {
                                                type: 'file',
                                                content: 'Remember to check hidden files with ls -la'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'etc': {
                        type: 'directory',
                        children: {
                            'passwd': {
                                type: 'file',
                                content: 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:user:/home/user:/bin/bash\nadmin:x:1001:1001:CTF{pr1v_3sc_m4st3r}:/home/admin:/bin/bash'
                            },
                            'services.conf': {
                                type: 'file',
                                content: 'SSH: Port 22 - OPEN\nHTTP: Port 80 - OPEN\nFTP: Port 21 - CLOSED\nMySQL: Port 3306 - OPEN (Vulnerable!)\nFlag: CTF{p0rt_sc4nn1ng_pr0}'
                            }
                        }
                    },
                    'var': {
                        type: 'directory',
                        children: {
                            'www': {
                                type: 'directory',
                                children: {
                                    'index.html': {
                                        type: 'file',
                                        content: '<!-- SQL Injection vulnerable -->\n<!-- Try: admin\' OR \'1\'=\'1 -->\n<!-- Flag: CTF{sql_1nj3ct10n_m4st3r} -->'
                                    }
                                }
                            },
                            'log': {
                                type: 'directory',
                                children: {
                                    'auth.log': {
                                        type: 'file',
                                        content: 'Failed login attempts detected\nSuspicious activity from 192.168.1.100\nPossible brute force attack'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
    }
    
    handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = this.input.value.trim();
            if (command) {
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
                this.executeCommand(command);
                this.input.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            // Tab completion could be implemented here
        }
    }
    
    executeCommand(command) {
        this.printLine(`${this.getPromptText()} ${command}`, 'command');
        
        const parts = command.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        // Emit command event for challenge tracking
        window.dispatchEvent(new CustomEvent('terminalCommand', { 
            detail: { command: cmd, args, fullCommand: command } 
        }));
        
        switch (cmd) {
            case 'ls':
                this.ls(args);
                break;
            case 'cd':
                this.cd(args);
                break;
            case 'cat':
                this.cat(args);
                break;
            case 'pwd':
                this.pwd();
                break;
            case 'whoami':
                this.whoami();
                break;
            case 'clear':
                this.clear();
                break;
            case 'help':
                this.help();
                break;
            case 'grep':
                this.grep(args);
                break;
            case 'find':
                this.find(args);
                break;
            case 'nmap':
                this.nmap(args);
                break;
            case 'curl':
                this.curl(args);
                break;
            case 'echo':
                this.echo(args);
                break;
            case 'base64':
                this.base64(args);
                break;
            case 'md5sum':
                this.md5sum(args);
                break;
            case 'sudo':
                this.sudo(args);
                break;
            default:
                this.printLine(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
        }
        
        this.scrollToBottom();
    }
    
    ls(args) {
        const showHidden = args.includes('-a') || args.includes('-la') || args.includes('-al');
        const longFormat = args.includes('-l') || args.includes('-la') || args.includes('-al');
        
        const currentDir = this.getDirectory(this.currentDirectory);
        if (!currentDir || currentDir.type !== 'directory') {
            this.printLine('Error: Invalid directory', 'error');
            return;
        }
        
        const items = [];
        for (const [name, item] of Object.entries(currentDir.children || {})) {
            if (!showHidden && name.startsWith('.')) continue;
            
            if (longFormat) {
                const type = item.type === 'directory' ? 'd' : '-';
                const perms = item.type === 'directory' ? 'rwxr-xr-x' : 'rw-r--r--';
                const size = item.type === 'file' ? (item.content?.length || 0) : 4096;
                items.push(`${type}${perms} 1 user user ${size.toString().padStart(8)} Jan 30 12:00 ${name}`);
            } else {
                items.push(name);
            }
        }
        
        if (items.length === 0) {
            this.printLine('(empty directory)');
        } else {
            this.printLine(longFormat ? items.join('\n') : items.join('  '));
        }
    }
    
    cd(args) {
        if (args.length === 0) {
            this.currentDirectory = '/home/user';
            this.updatePrompt();
            return;
        }
        
        let newPath = args[0];
        if (!newPath.startsWith('/')) {
            newPath = this.resolvePath(this.currentDirectory, newPath);
        }
        
        const dir = this.getDirectory(newPath);
        if (!dir) {
            this.printLine(`cd: ${args[0]}: No such file or directory`, 'error');
        } else if (dir.type !== 'directory') {
            this.printLine(`cd: ${args[0]}: Not a directory`, 'error');
        } else {
            this.currentDirectory = newPath;
            this.updatePrompt();
        }
    }
    
    cat(args) {
        if (args.length === 0) {
            this.printLine('cat: missing file operand', 'error');
            return;
        }
        
        const filePath = this.resolvePath(this.currentDirectory, args[0]);
        const file = this.getDirectory(filePath);
        
        if (!file) {
            this.printLine(`cat: ${args[0]}: No such file or directory`, 'error');
        } else if (file.type !== 'file') {
            this.printLine(`cat: ${args[0]}: Is a directory`, 'error');
        } else {
            this.printLine(file.content || '');
        }
    }
    
    pwd() {
        this.printLine(this.currentDirectory);
    }
    
    whoami() {
        this.printLine('user');
    }
    
    clear() {
        this.output.innerHTML = '';
    }
    
    help() {
        const commands = [
            'Available commands:',
            '  ls [-la]        - List directory contents',
            '  cd [dir]        - Change directory',
            '  cat [file]      - Display file contents',
            '  pwd             - Print working directory',
            '  whoami          - Display current user',
            '  grep [pattern]  - Search for patterns',
            '  find [name]     - Find files',
            '  nmap [target]   - Network scanner',
            '  curl [url]      - Transfer data from URL',
            '  echo [text]     - Display text',
            '  base64 [text]   - Encode/decode base64',
            '  md5sum [text]   - Calculate MD5 hash',
            '  sudo [cmd]      - Execute command as root',
            '  clear           - Clear terminal',
            '  help            - Show this help message'
        ];
        this.printLine(commands.join('\n'), 'info');
    }
    
    grep(args) {
        if (args.length < 2) {
            this.printLine('Usage: grep [pattern] [file]', 'error');
            return;
        }
        
        const pattern = args[0];
        const filePath = this.resolvePath(this.currentDirectory, args[1]);
        const file = this.getDirectory(filePath);
        
        if (!file || file.type !== 'file') {
            this.printLine(`grep: ${args[1]}: No such file`, 'error');
            return;
        }
        
        const lines = file.content.split('\n');
        const matches = lines.filter(line => line.toLowerCase().includes(pattern.toLowerCase()));
        
        if (matches.length > 0) {
            this.printLine(matches.join('\n'), 'success');
        } else {
            this.printLine('No matches found');
        }
    }
    
    find(args) {
        if (args.length === 0) {
            this.printLine('Usage: find [filename]', 'error');
            return;
        }
        
        const searchName = args[0];
        const results = this.searchFilesystem('/', searchName);
        
        if (results.length > 0) {
            this.printLine(results.join('\n'), 'success');
        } else {
            this.printLine('No files found');
        }
    }
    
    nmap(args) {
        if (args.length === 0) {
            this.printLine('Usage: nmap [target]', 'error');
            return;
        }
        
        this.printLine('Starting Nmap scan...', 'info');
        setTimeout(() => {
            const scanResults = [
                'PORT     STATE    SERVICE',
                '22/tcp   open     ssh',
                '80/tcp   open     http',
                '3306/tcp open     mysql',
                '',
                'Nmap scan complete. 3 ports open.'
            ];
            this.printLine(scanResults.join('\n'), 'success');
        }, 1000);
    }
    
    curl(args) {
        if (args.length === 0) {
            this.printLine('Usage: curl [url]', 'error');
            return;
        }
        
        this.printLine('Fetching data...', 'info');
        setTimeout(() => {
            this.printLine('<html><body>Server response received</body></html>');
        }, 500);
    }
    
    echo(args) {
        this.printLine(args.join(' '));
    }
    
    base64(args) {
        if (args.length === 0) {
            this.printLine('Usage: base64 [text] or base64 -d [encoded]', 'error');
            return;
        }
        
        if (args[0] === '-d') {
            try {
                const decoded = atob(args.slice(1).join(' '));
                this.printLine(decoded, 'success');
            } catch (e) {
                this.printLine('Error: Invalid base64 string', 'error');
            }
        } else {
            const encoded = btoa(args.join(' '));
            this.printLine(encoded);
        }
    }
    
    md5sum(args) {
        if (args.length === 0) {
            this.printLine('Usage: md5sum [text]', 'error');
            return;
        }
        
        // Simple hash simulation (not real MD5)
        const text = args.join(' ');
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = ((hash << 5) - hash) + text.charCodeAt(i);
            hash = hash & hash;
        }
        const hexHash = Math.abs(hash).toString(16).padStart(32, '0');
        this.printLine(hexHash);
    }
    
    sudo(args) {
        if (args.length === 0) {
            this.printLine('Usage: sudo [command]', 'error');
            return;
        }
        
        this.printLine('[sudo] password for user: ', 'info');
        this.printLine('Sorry, user is not in the sudoers file. This incident will be reported.', 'error');
    }
    
    // Helper methods
    getDirectory(path) {
        const parts = path.split('/').filter(p => p);
        let current = this.filesystem['/'];
        
        for (const part of parts) {
            if (!current.children || !current.children[part]) {
                return null;
            }
            current = current.children[part];
        }
        
        return current;
    }
    
    resolvePath(currentPath, relativePath) {
        if (relativePath.startsWith('/')) {
            return relativePath;
        }
        
        const parts = currentPath.split('/').filter(p => p);
        const relParts = relativePath.split('/');
        
        for (const part of relParts) {
            if (part === '..') {
                parts.pop();
            } else if (part !== '.') {
                parts.push(part);
            }
        }
        
        return '/' + parts.join('/');
    }
    
    searchFilesystem(path, searchName) {
        const results = [];
        const dir = this.getDirectory(path);
        
        if (!dir || dir.type !== 'directory') return results;
        
        for (const [name, item] of Object.entries(dir.children || {})) {
            const fullPath = path === '/' ? `/${name}` : `${path}/${name}`;
            
            if (name.includes(searchName)) {
                results.push(fullPath);
            }
            
            if (item.type === 'directory') {
                results.push(...this.searchFilesystem(fullPath, searchName));
            }
        }
        
        return results;
    }
    
    updatePrompt() {
        const shortPath = this.currentDirectory.replace('/home/user', '~');
        this.prompt.textContent = `user@cyberquest:${shortPath}$`;
    }
    
    getPromptText() {
        const shortPath = this.currentDirectory.replace('/home/user', '~');
        return `user@cyberquest:${shortPath}$`;
    }
    
    printLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.textContent = text;
        this.output.appendChild(line);
    }
    
    printWelcome() {
        const welcome = [
            '╔═══════════════════════════════════════════════════════╗',
            '║         Welcome to CyberQuest CTF Terminal           ║',
            '║                                                       ║',
            '║  Type "help" for available commands                  ║',
            '║  Type "ls" to see files in current directory         ║',
            '║                                                       ║',
            '║  Good luck, hacker!                                   ║',
            '╚═══════════════════════════════════════════════════════╝',
            ''
        ];
        this.printLine(welcome.join('\n'), 'info');
    }
    
    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }
    
    // Public method to add files dynamically (for challenges)
    addFile(path, content) {
        const parts = path.split('/').filter(p => p);
        const fileName = parts.pop();
        const dirPath = '/' + parts.join('/');
        
        const dir = this.getDirectory(dirPath);
        if (dir && dir.type === 'directory') {
            dir.children[fileName] = {
                type: 'file',
                content: content
            };
        }
    }
    
    // Public method to update filesystem for different levels
    updateFilesystemForLevel(level) {
        // This can be called by the challenge system to modify the filesystem
        switch (level) {
            case 2:
                // Add network-related files
                this.addFile('/home/user/scan_results.txt', 'Run nmap to discover open ports');
                break;
            case 3:
                // Add crypto files
                this.addFile('/home/user/encrypted.txt', 'Q1RGe2QzYzBkM2RfYjRzMzY0X2ZsNGd9');
                this.addFile('/home/user/cipher.txt', 'Uryyb Jbeyq! Guvf vf n Pnrfne pvcure.');
                break;
            case 4:
                // Add web exploit files
                this.addFile('/home/user/webapp_info.txt', 'Check /var/www/index.html for vulnerabilities');
                break;
            case 5:
                // Add privilege escalation hints
                this.addFile('/home/user/suid_hint.txt', 'Check /etc/passwd for interesting users');
                break;
        }
    }
}

// Export for use in app.js
window.Terminal = Terminal;
