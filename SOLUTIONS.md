# 🔐 CTF Solutions Guide
## ⚠️ SPOILER ALERT - Solutions Below!

This guide contains complete solutions for all 5 levels. Only use this if you're truly stuck or want to verify your approach!

---

## Level 1: Linux Basics
**Flag**: `CTF{f1rst_st3ps_1n_l1nux}`

### Solution Steps:
1. Type `ls` to see visible files
2. Type `ls -la` to see all files including hidden ones
3. Notice the `.hidden_flag` file
4. Type `cat .hidden_flag` to read it
5. Copy the flag and submit it

### Commands:
```bash
ls -la
cat .hidden_flag
```

---

## Level 2: Network Reconnaissance
**Flag**: `CTF{p0rt_sc4nn1ng_pr0}`

### Solution Steps:
1. Type `nmap localhost` to scan for open ports
2. Notice ports 22, 80, and 3306 are open
3. Navigate to `/etc` directory: `cd /etc`
4. Type `cat services.conf` to read the service configuration
5. Find the flag in the file contents

### Commands:
```bash
nmap localhost
cd /etc
cat services.conf
```

---

## Level 3: Cryptography Challenge
**Flag**: `CTF{d3c0d3d_b4s364_fl4g}`

### Solution Steps:
1. Type `ls` to see files in home directory
2. Type `cat encrypted.txt` to see the Base64 encoded string
3. The string is: `Q1RGe2QzYzBkM2RfYjRzMzY0X2ZsNGd9`
4. Decode it: `base64 -d Q1RGe2QzYzBkM2RfYjRzMzY0X2ZsNGd9`
5. Submit the decoded flag

### Commands:
```bash
ls
cat encrypted.txt
base64 -d Q1RGe2QzYzBkM2RfYjRzMzY0X2ZsNGd9
```

### Alternative:
You can also decode Base64 online or use browser console:
```javascript
atob('Q1RGe2QzYzBkM2RfYjRzMzY0X2ZsNGd9')
```

---

## Level 4: Web Exploitation
**Flag**: `CTF{sql_1nj3ct10n_m4st3r}`

### Solution Steps:
1. Navigate to web directory: `cd /var/www`
2. Type `cat index.html` to view the web page source
3. Look for HTML comments in the output
4. Find the flag in the comments
5. Submit the flag

### Commands:
```bash
cd /var/www
cat index.html
```

### Learning Point:
The HTML comments show a SQL injection vulnerability. In real scenarios, you'd exploit this with:
```sql
admin' OR '1'='1
```

---

## Level 5: Privilege Escalation
**Flag**: `CTF{pr1v_3sc_m4st3r}`

### Solution Steps:
1. Navigate to `/etc`: `cd /etc`
2. Type `cat passwd` to view user accounts
3. Look through the user entries
4. Find the `admin` user entry
5. The flag is embedded in the admin user's information
6. Submit the flag

### Commands:
```bash
cd /etc
cat passwd
```

### Alternative:
```bash
grep admin /etc/passwd
```

---

## 🎓 Learning Takeaways

### Level 1 - Linux Basics
- Hidden files start with `.`
- Use `ls -a` or `ls -la` to see them
- `cat` reads file contents

### Level 2 - Network Reconnaissance
- `nmap` scans for open ports and services
- Configuration files often contain sensitive info
- `/etc` directory holds system configurations

### Level 3 - Cryptography
- Base64 is encoding, not encryption
- Common in web applications and data transfer
- Easy to decode with built-in tools

### Level 4 - Web Exploitation
- Always check HTML source code
- Comments may contain sensitive information
- SQL injection is a common vulnerability

### Level 5 - Privilege Escalation
- `/etc/passwd` contains user account info
- Enumeration is key to finding vulnerabilities
- System files often reveal security weaknesses

---

## 🏆 Perfect Score Strategy

To achieve the highest score:

1. **Speed**: Complete each level in under 2 minutes
2. **No Hints**: Try to solve without using hints
3. **Efficiency**: Use the minimum number of commands

### Optimal Command Sequence:

**Level 1** (3 commands):
```bash
ls -la
cat .hidden_flag
# Submit flag
```

**Level 2** (3 commands):
```bash
nmap localhost
cd /etc
cat services.conf
```

**Level 3** (2 commands):
```bash
cat encrypted.txt
base64 -d Q1RGe2QzYzBkM2RfYjRzMzY0X2ZsNGd9
```

**Level 4** (2 commands):
```bash
cd /var/www
cat index.html
```

**Level 5** (2 commands):
```bash
cd /etc
cat passwd
```

**Total**: 12 commands, 0 hints = Maximum score!

---

## 🔍 Additional Challenges (Self-Study)

Try these extra challenges:

1. **Find all flags at once**: Use `grep -r "CTF{" /` to search the entire filesystem
2. **Explore the filesystem**: Navigate to different directories and explore
3. **Try other commands**: Experiment with `find`, `grep`, `echo`, etc.
4. **Speed run**: Complete all 5 levels as fast as possible
5. **No chatbot**: Complete without any chatbot assistance

---

## 💻 Real-World Applications

These CTF skills translate to real cybersecurity work:

- **Linux Basics**: Essential for server administration and penetration testing
- **Network Recon**: First step in any security assessment
- **Cryptography**: Understanding encoding/encryption in security
- **Web Exploitation**: Finding and fixing web vulnerabilities
- **Privilege Escalation**: Critical for penetration testing and red teaming

---

**Congratulations on completing CyberQuest CTF! 🎉**

Keep learning, keep hacking (ethically!), and keep improving your cybersecurity skills!
