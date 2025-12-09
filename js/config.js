// js/config.js - Centralized Configuration
// ⚠️ In production, move Firebase config to environment variables

const CONFIG = {
    // Firebase configuration - should be in .env file for production
    firebase: {
        apiKey: "AIzaSyC09JNZa9-bO6fWT2q2QrgRRXsK5gN0MTs",
        authDomain: "sleep-sound-c687b.firebaseapp.com",
        projectId: "sleep-sound-c687b",
        storageBucket: "sleep-sound-c687b.firebasestorage.app",
        messagingSenderId: "357153598122",
        appId: "1:357153598122:web:0efaa6ffa45b219aac7ed3"
    },

    // UPI Configuration - should use server-side payment gateway
    upi: {
        // ⚠️ Never expose real UPI credentials in frontend
        // This is for demo only - use payment gateway SDK in production
        merchantId: 'DEMO_MERCHANT',
        merchantName: 'Fashion Hub',
        note: 'Order Payment'
    },

    // Security settings
    security: {
        maxLoginAttempts: 5,
        loginCooldownMs: 300000, // 5 minutes
        sessionTimeoutMs: 3600000, // 1 hour
        passwordMinLength: 8,
        otpLength: 6,
        otpValidityMs: 60000 // 1 minute
    },

    // Rate limiting
    rateLimit: {
        maxRequestsPerMinute: 60,
        maxFailedLoginAttempts: 3
    },

    // App settings
    app: {
        name: 'Fashion Hub',
        version: '1.0.0',
        environment: 'production', // 'development' | 'staging' | 'production'
        enableLogging: true,
        enableAnalytics: false
    },

    // Feature flags
    features: {
        enableRealPayments: false, // Set to true when payment gateway integrated
        enableStockNotifications: true,
        enableOrderTracking: true,
        enableAdminApproval: true
    }
};

// Freeze config to prevent modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.firebase);
Object.freeze(CONFIG.security);
Object.freeze(CONFIG.rateLimit);
Object.freeze(CONFIG.app);
Object.freeze(CONFIG.features);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// Global access for non-module scripts
window.CONFIG = CONFIG;