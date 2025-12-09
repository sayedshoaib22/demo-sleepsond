// js/security.js - Simple Security Functions
// 🔒 Protects your website from hackers

const Security = {
    // 🔐 Make passwords safe (can't be stolen)
    async hashPassword(password) {
        // Converts "admin123" into random gibberish
        // Even if someone steals database, they can't read passwords
        const encoder = new TextEncoder();
        const data = encoder.encode(password + 'fashion_hub_secret_salt');
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    },

    // ✅ Check if password is correct
    async verifyPassword(password, savedHash) {
        const newHash = await this.hashPassword(password);
        return newHash === savedHash;
    },

    // 🛡️ Clean user input (stop hackers from injecting bad code)
    sanitizeInput(text) {
        if (typeof text !== 'string') return text;
        
        // Replace dangerous characters with safe ones
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;');
    },

    // 📧 Check if email is valid
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // 🚫 Stop hackers from trying 1000 passwords (Rate Limiter)
    rateLimiter: {
        attempts: new Map(), // Tracks who tried to login

        checkLimit(username) {
            const now = Date.now();
            const userAttempts = this.attempts.get(username) || [];
            
            // Remove old attempts (older than 15 minutes)
            const recentAttempts = userAttempts.filter(time => now - time < 900000);
            
            // If 3 or more attempts in 15 minutes = BLOCKED
            if (recentAttempts.length >= 3) {
                return {
                    allowed: false,
                    message: '❌ Too many failed attempts. Wait 15 minutes.'
                };
            }
            
            return { allowed: true };
        },

        recordAttempt(username) {
            const attempts = this.attempts.get(username) || [];
            attempts.push(Date.now());
            this.attempts.set(username, attempts);
        },

        reset(username) {
            this.attempts.delete(username);
        }
    },

    // 🔑 User Session (keeps you logged in)
    createSession(userId, userData) {
        const session = {
            userId,
            userData,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 // Expires in 1 hour
        };
        sessionStorage.setItem('userSession', JSON.stringify(session));
        return session;
    },

    getSession() {
        const data = sessionStorage.getItem('userSession');
        if (!data) return null;
        
        const session = JSON.parse(data);
        
        // If expired, logout automatically
        if (Date.now() > session.expiresAt) {
            this.clearSession();
            return null;
        }
        
        return session;
    },

    clearSession() {
        sessionStorage.removeItem('userSession');
    },

    // 📝 Track important actions (for security review)
    auditLog: {
        logs: [],
        
        log(action, details) {
            const entry = {
                time: new Date().toISOString(),
                action: action,
                details: details
            };
            this.logs.push(entry);
            console.log('🔍 [AUDIT]', entry);
        }
    }
};

// Make it available globally
window.Security = Security;