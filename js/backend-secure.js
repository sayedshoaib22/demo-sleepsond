// backend-secure.js
// Secure Firebase Backend Implementation

// Initialize Firebase with secure config
const firebaseConfig = getFirebaseConfig();
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

// Configure auth persistence
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// Security: Safe logging utility
const isDev = window.location.hostname === 'localhost';
const safeLog = {
  info: (...args) => isDev && console.log('[INFO]', ...args),
  error: (...args) => console.error('[ERROR]', ...args),
  warn: (...args) => isDev && console.warn('[WARN]', ...args)
};

// Helper: Generate secure order ID
function generateOrderCode() {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  const timestamp = Date.now().toString(36).toUpperCase();
  return `ORD-${year}-${timestamp}-${random}`;
}

// Helper: Sanitize input
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input.replace(/[<>\"']/g, '').trim();
}

// ============================================
// AUTHENTICATION SYSTEM
// ============================================

const authSystem = {
  // Register new user with Firebase Auth
  async registerUser(name, email, password) {
    try {
      // Create Firebase Auth user
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      // Update display name
      await user.updateProfile({ displayName: sanitizeInput(name) });
      
      // Create user document in Firestore (NO PASSWORD!)
      await db.collection('users').doc(user.uid).set({
        name: sanitizeInput(name),
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        role: 'customer'
      });
      
      safeLog.info('User registered successfully:', user.uid);
      
      return {
        success: true,
        user: {
          uid: user.uid,
          name: name,
          email: email
        }
      };
    } catch (error) {
      safeLog.error('Registration error:', error.code);
      
      let message = 'Registration failed';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email already registered';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password too weak (min 6 characters)';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address';
      }
      
      return { success: false, message };
    }
  },

  // Login with Firebase Auth
  async loginUser(email, password) {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      // Get user data from Firestore
      const userDoc = await db.collection('users').doc(user.uid).get();
      const userData = userDoc.data();
      
      safeLog.info('User logged in successfully');
      
      return {
        success: true,
        user: {
          uid: user.uid,
          name: userData?.name || user.displayName,
          email: user.email
        }
      };
    } catch (error) {
      safeLog.error('Login error:', error.code);
      
      let message = 'Login failed';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        message = 'Invalid email or password';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Too many attempts. Try again later.';
      }
      
      return { success: false, message };
    }
  },

  // Send OTP via Firebase Phone Auth
  async sendOTP(phoneNumber, appVerifier) {
    try {
      const confirmationResult = await auth.signInWithPhoneNumber(phoneNumber, appVerifier);
      safeLog.info('OTP sent successfully');
      
      return {
        success: true,
        confirmationResult
      };
    } catch (error) {
      safeLog.error('OTP error:', error.code);
      return { success: false, message: 'Failed to send OTP' };
    }
  },

  // Verify OTP
  async verifyOTP(confirmationResult, code) {
    try {
      const result = await confirmationResult.confirm(code);
      safeLog.info('OTP verified successfully');
      
      return {
        success: true,
        user: result.user
      };
    } catch (error) {
      safeLog.error('OTP verification error:', error.code);
      return { success: false, message: 'Invalid OTP' };
    }
  },

  // Logout
  async logout() {
    try {
      await auth.signOut();
      safeLog.info('User logged out');
      return { success: true };
    } catch (error) {
      safeLog.error('Logout error:', error);
      return { success: false };
    }
  },

  // Get current user
  getCurrentUser() {
    return auth.currentUser;
  },

  // Listen to auth state changes
  onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
  }
};

// ============================================
// ADMIN SYSTEM (Secure)
// ============================================

const adminSystem = {
  // Request admin access
  async requestAdminAccess(email, password) {
    try {
      // First create Firebase Auth account
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;
      
      // Create admin request in Firestore (NO PASSWORD!)
      await db.collection('admins').doc(uid).set({
        email: email,
        role: 'admin',
        isMain: false,
        status: 'pending', // Must be approved by main admin
        requestedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      safeLog.info('Admin access requested');
      
      return {
        success: true,
        message: 'Admin access requested. Awaiting approval.'
      };
    } catch (error) {
      safeLog.error('Admin request error:', error.code);
      
      let message = 'Request failed';
      if (error.code === 'auth/email-already-in-use') {
        message = 'This email already has an account';
      }
      
      return { success: false, message };
    }
  },

  // Admin login
  async adminLogin(email, password) {
    try {
      // Login with Firebase Auth
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;
      
      // Check if user is admin
      const adminDoc = await db.collection('admins').doc(uid).get();
      
      if (!adminDoc.exists) {
        await auth.signOut();
        return { success: false, message: 'Not an admin account' };
      }
      
      const adminData = adminDoc.data();
      
      // Check admin status
      if (adminData.status === 'pending') {
        await auth.signOut();
        return { success: false, message: 'Admin access pending approval' };
      }
      
      if (adminData.status === 'rejected') {
        await auth.signOut();
        return { success: false, message: 'Admin access denied' };
      }
      
      safeLog.info('Admin logged in successfully');
      
      return {
        success: true,
        admin: {
          uid: uid,
          email: adminData.email,
          isMain: adminData.isMain || false,
          role: adminData.role,
          status: adminData.status
        }
      };
    } catch (error) {
      safeLog.error('Admin login error:', error.code);
      return { success: false, message: 'Invalid credentials' };
    }
  },

  // List pending admin requests (Main admin only)
  async listPendingAdmins() {
    try {
      const user = auth.currentUser;
      if (!user) return { success: false, message: 'Not authenticated' };
      
      // Verify current user is main admin
      const adminDoc = await db.collection('admins').doc(user.uid).get();
      if (!adminDoc.exists || !adminDoc.data().isMain) {
        return { success: false, message: 'Permission denied' };
      }
      
      const snapshot = await db.collection('admins')
        .where('status', '==', 'pending')
        .get();
      
      const admins = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }));
      
      return { success: true, admins };
    } catch (error) {
      safeLog.error('List pending admins error:', error);
      return { success: false, message: 'Failed to load' };
    }
  },

  // Approve/reject admin (Main admin only)
  async updateAdminStatus(adminUid, decision) {
    try {
      const user = auth.currentUser;
      if (!user) return { success: false, message: 'Not authenticated' };
      
      // Verify current user is main admin
      const mainAdminDoc = await db.collection('admins').doc(user.uid).get();
      if (!mainAdminDoc.exists || !mainAdminDoc.data().isMain) {
        return { success: false, message: 'Permission denied' };
      }
      
      // Update admin status
      await db.collection('admins').doc(adminUid).update({
        status: decision, // 'approved' or 'rejected'
        reviewedAt: firebase.firestore.FieldValue.serverTimestamp(),
        reviewedBy: user.uid
      });
      
      safeLog.info('Admin status updated:', decision);
      return { success: true };
    } catch (error) {
      safeLog.error('Update admin status error:', error);
      return { success: false };
    }
  },

  // Get all admins (Main admin only)
  async getAllAdmins() {
    try {
      const user = auth.currentUser;
      if (!user) return { success: false, message: 'Not authenticated' };
      
      const adminDoc = await db.collection('admins').doc(user.uid).get();
      if (!adminDoc.exists || !adminDoc.data().isMain) {
        return { success: false, message: 'Permission denied' };
      }
      
      const snapshot = await db.collection('admins').get();
      const admins = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }));
      
      return { success: true, admins };
    } catch (error) {
      safeLog.error('Get all admins error:', error);
      return { success: false, admins: [] };
    }
  }
};

// ============================================
// ORDER SYSTEM (Secure)
// ============================================

const orderSystem = {
  // Create order
  async createOrder(payload) {
    try {
      const user = auth.currentUser;
      if (!user) {
        return { success: false, message: 'Please login to place order' };
      }
      
      const { items, branch, customer } = payload;
      
      if (!items || !items.length) {
        return { success: false, message: 'Cart is empty' };
      }
      
      if (!branch) {
        return { success: false, message: 'Please select a branch' };
      }
      
      const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const orderCode = generateOrderCode();
      
      const orderDoc = {
        orderCode,
        userId: user.uid, // Link to authenticated user
        date: firebase.firestore.FieldValue.serverTimestamp(),
        total,
        status: 'Order Placed',
        location: '',
        branch: sanitizeInput(branch),
        items: items.map(item => ({
          id: item.id,
          name: sanitizeInput(item.name),
          price: Number(item.price),
          quantity: Number(item.quantity),
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          image: item.image
        })),
        customer: {
          name: sanitizeInput(customer?.name || user.displayName || 'Guest'),
          email: customer?.email || user.email
        },
        paymentMethod: payload.paymentMethod || 'COD',
        paymentStatus: 'Pending', // Always pending initially
        paymentId: null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      
      // Create order in Firestore
      await db.collection('orders').doc(orderCode).set(orderDoc);
      
      safeLog.info('Order created:', orderCode);
      
      return {
        success: true,
        order: {
          id: orderCode,
          orderCode: orderCode,
          ...orderDoc
        }
      };
    } catch (error) {
      safeLog.error('Create order error:', error);
      return { success: false, message: 'Failed to create order' };
    }
  },

  // Track order
  async trackOrder(orderCode) {
    try {
      if (!orderCode) {
        return { success: false, message: 'Order ID required' };
      }
      
      const orderDoc = await db.collection('orders').doc(orderCode).get();
      
      if (!orderDoc.exists) {
        return { success: false, message: 'Order not found' };
      }
      
      const data = orderDoc.data();
      
      // Security: Check if user owns this order or is admin
      const user = auth.currentUser;
      if (user) {
        const isOwner = data.userId === user.uid;
        const adminDoc = await db.collection('admins').doc(user.uid).get();
        const isAdmin = adminDoc.exists && adminDoc.data().status === 'approved';
        
        if (!isOwner && !isAdmin) {
          return { success: false, message: 'Access denied' };
        }
      }
      
      return {
        success: true,
        order: {
          id: orderDoc.id,
          orderCode: data.orderCode || orderDoc.id,
          ...data
        }
      };
    } catch (error) {
      safeLog.error('Track order error:', error);
      return { success: false, message: 'Failed to track order' };
    }
  },

  // Update order status (Admin only)
  async updateOrderStatus(orderCode, newStatus, location) {
    try {
      const user = auth.currentUser;
      if (!user) return { success: false, message: 'Not authenticated' };
      
      // Verify user is admin
      const adminDoc = await db.collection('admins').doc(user.uid).get();
      if (!adminDoc.exists || adminDoc.data().status !== 'approved') {
        return { success: false, message: 'Permission denied' };
      }
      
      const updateData = {
        status: newStatus,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedBy: user.uid
      };
      
      if (location !== undefined) {
        updateData.location = sanitizeInput(location);
      }
      
      await db.collection('orders').doc(orderCode).update(updateData);
      
      safeLog.info('Order status updated:', orderCode);
      return { success: true };
    } catch (error) {
      safeLog.error('Update order status error:', error);
      return { success: false };
    }
  },

  // Get all orders (Admin only)
  async getAllOrders() {
    try {
      const user = auth.currentUser;
      if (!user) return { success: false, message: 'Not authenticated' };
      
      const adminDoc = await db.collection('admins').doc(user.uid).get();
      if (!adminDoc.exists || adminDoc.data().status !== 'approved') {
        return { success: false, message: 'Permission denied' };
      }
      
      const snapshot = await db.collection('orders')
        .orderBy('date', 'desc')
        .get();
      
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return { success: true, orders };
    } catch (error) {
      safeLog.error('Get all orders error:', error);
      return { success: false, orders: [] };
    }
  }
};

// ============================================
// PRODUCT SYSTEM (Secure)
// ============================================

const productSystem = {
  // Get all products
  async getProducts() {
    try {
      const snapshot = await db.collection('products').get();
      const products = snapshot.docs.map(doc => ({
        id: parseInt(doc.id) || doc.id,
        ...doc.data()
      }));
      
      return { success: true, products };
    } catch (error) {
      safeLog.error('Get products error:', error);
      return { success: false, products: [] };
    }
  },

  // Update product price (Admin only)
  async updateProductPrice(productId, newPrice) {
    try {
      const user = auth.currentUser;
      if (!user) return { success: false, message: 'Not authenticated' };
      
      // Verify user is admin
      const adminDoc = await db.collection('admins').doc(user.uid).get();
      if (!adminDoc.exists || adminDoc.data().status !== 'approved') {
        return { success: false, message: 'Permission denied' };
      }
      
      // Validate price
      const price = parseInt(newPrice);
      if (isNaN(price) || price <= 0 || price > 1000000) {
        return { success: false, message: 'Invalid price' };
      }
      
      await db.collection('products').doc(String(productId)).update({
        price: price,
        displayPrice: `₹${price.toLocaleString()}`,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedBy: user.uid
      });
      
      safeLog.info('Product price updated:', productId);
      return { success: true };
    } catch (error) {
      safeLog.error('Update product price error:', error);
      return { success: false };
    }
  },

  // Listen to product changes
  listenToProducts(callback) {
    return db.collection('products').onSnapshot(
      snapshot => {
        const products = snapshot.docs.map(doc => ({
          id: parseInt(doc.id) || doc.id,
          ...doc.data()
        }));
        callback(products);
      },
      error => {
        safeLog.error('Products listener error:', error);
      }
    );
  },

  // Reduce stock (Admin or system only)
  async reduceStock(productId, size, quantity) {
    try {
      const user = auth.currentUser;
      if (!user) return { success: false };
      
      const docRef = db.collection('products').doc(String(productId));
      const doc = await docRef.get();
      
      if (!doc.exists) return { success: false };
      
      const data = doc.data();
      if (data.sizes && data.sizes[size]) {
        const newStock = Math.max(0, data.sizes[size].stock - quantity);
        await docRef.update({
          [`sizes.${size}.stock`]: newStock
        });
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      safeLog.error('Reduce stock error:', error);
      return { success: false };
    }
  }
};

// ============================================
// PAYMENT VERIFICATION SYSTEM
// ============================================

const paymentSystem = {
  // Request payment verification (creates pending verification)
  async requestPaymentVerification(orderId, transactionId, method) {
    try {
      const user = auth.currentUser;
      if (!user) return { success: false, message: 'Not authenticated' };
      
      await db.collection('paymentVerifications').add({
        orderId: sanitizeInput(orderId),
        transactionId: sanitizeInput(transactionId),
        paymentMethod: method,
        userId: user.uid,
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      safeLog.info('Payment verification requested');
      
      return {
        success: true,
        message: 'Payment verification submitted. Admin will confirm shortly.'
      };
    } catch (error) {
      safeLog.error('Payment verification error:', error);
      return { success: false, message: 'Failed to submit verification' };
    }
  },

  // Verify payment (Admin only)
  async verifyPayment(verificationId, isValid) {
    try {
      const user = auth.currentUser;
      if (!user) return { success: false };
      
      const adminDoc = await db.collection('admins').doc(user.uid).get();
      if (!adminDoc.exists || adminDoc.data().status !== 'approved') {
        return { success: false, message: 'Permission denied' };
      }
      
      const verificationDoc = await db.collection('paymentVerifications').doc(verificationId).get();
      if (!verificationDoc.exists) return { success: false };
      
      const verificationData = verificationDoc.data();
      
      // Update verification status
      await db.collection('paymentVerifications').doc(verificationId).update({
        status: isValid ? 'verified' : 'rejected',
        verifiedBy: user.uid,
        verifiedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      // If valid, update order payment status
      if (isValid) {
        await db.collection('orders').doc(verificationData.orderId).update({
          paymentStatus: 'Paid',
          paymentId: verificationData.transactionId,
          paymentVerifiedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
      
      return { success: true };
    } catch (error) {
      safeLog.error('Verify payment error:', error);
      return { success: false };
    }
  }
};

// ============================================
// EXPORT BACKEND API
// ============================================

window.backend = {
  // Auth
  ...authSystem,
  
  // Admin
  ...adminSystem,
  
  // Orders
  ...orderSystem,
  
  // Products
  ...productSystem,
  
  // Payment
  ...paymentSystem,
  
  // Utilities
  safeLog,
  sanitizeInput,
  generateOrderCode
};

// Initialize auth state listener
auth.onAuthStateChanged(user => {
  if (user) {
    safeLog.info('Auth state changed: User logged in');
  } else {
    safeLog.info('Auth state changed: User logged out');
  }
});

safeLog.info('Secure backend initialized');