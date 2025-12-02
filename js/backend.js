// js/backend.js

// 1) Yahan apna actual config paste karo (Firebase console se)
const firebaseConfig = {
  apiKey: "AIzaSyC09JNZa9-bO6fWT2q2QrgRRXsK5gN0MTs",
  authDomain: "sleep-sound-c687b.firebaseapp.com",
  projectId: "sleep-sound-c687b",
  storageBucket: "sleep-sound-c687b.firebasestorage.app",
  messagingSenderId: "357153598122",
  appId: "1:357153598122:web:0efaa6ffa45b219aac7ed3"
};

// 2) Firebase init
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Helper: random order ID (SS-YYYY-XXXX)
function generateOrderCode() {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `SS-${year}-${random}`;
}

const backend = {
  // =====================
  // ORDER SYSTEM (already)
  // =====================
  async createOrder(payload) {
    const { items, branch, customer } = payload;

    if (!items || !items.length) {
      return { success: false, message: "Cart is empty" };
    }
    if (!branch) {
      return { success: false, message: "Branch missing" };
    }

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const orderCode = generateOrderCode();
    const now = new Date();

    const orderDoc = {
      orderCode,
      date: now.toISOString(),
      total,
      status: "Order Placed",
      branch,
      items,
      customer: customer || {
        name: "Guest",
        email: "guest@example.com"
      }
    };

    try {
      await db.collection("orders").doc(orderCode).set(orderDoc);

      return {
        success: true,
        order: {
          id: orderCode,
          date: orderDoc.date,
          total,
          status: orderDoc.status,
          branch,
          items,
          customer: orderDoc.customer
        }
      };
    } catch (err) {
      console.error("Error saving order:", err);
      return { success: false, message: "Failed to save order" };
    }
  },

  async trackOrder(orderCode) {
    if (!orderCode) return { success: false, message: "Order ID required" };

    try {
      const snap = await db.collection("orders").doc(orderCode).get();

      if (!snap.exists) return { success: false, message: "Order not found" };

      const data = snap.data();
      // Ensure the returned order has both id and orderCode properties
      data.id = snap.id; // Document ID is the orderCode
      if (!data.orderCode) {
        data.orderCode = snap.id; // Fallback if orderCode field is missing
      }
      return { success: true, order: data };
    } catch (err) {
      return { success: false, message: "Server error" };
    }
  },

  // =====================
  // ADMIN SYSTEM (NEW)
  // =====================

  // 1) Second admin request from any device
  async registerAdmin(username, password) {
    const snap = await db
      .collection("admins")
      .where("username", "==", username)
      .get();

    if (!snap.empty) {
      return { success: false, message: "Username already taken" };
    }

    await db.collection("admins").add({
      username,
      password,
      role: "admin",
      isMain: false,
      status: "pending",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    return { success: true, message: "Request sent to main admin for approval" };
  },

  // 2) Admin login (any device)
  async adminLogin(username, password) {
    const snap = await db
      .collection("admins")
      .where("username", "==", username)
      .where("password", "==", password)
      .limit(1)
      .get();

    if (snap.empty) return { success: false, message: "Invalid username or password" };

    const doc = snap.docs[0];
    const data = doc.data();

    if (data.status === "pending") {
      return { success: false, message: "Waiting for main admin approval" };
    }

    if (data.status === "rejected") {
      return { success: false, message: "Your request was rejected" };
    }

    return {
      success: true,
      admin: {
        id: doc.id,
        username: data.username,
        isMain: data.isMain,
        role: data.role,
        status: data.status
      }
    };
  },

  // 3) Main admin fetch pending requests
  async listPendingAdmins() {
    const snap = await db
      .collection("admins")
      .where("status", "==", "pending")
      .get();

    const admins = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return { success: true, admins };
  },

  // 4) Main admin approve / reject
  async updateAdminStatus(id, decision) {
    if (!["approved", "rejected"].includes(decision)) {
      return { success: false };
    }

    const docRef = db.collection("admins").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return { success: false, message: "Admin not found" };
    const data = doc.data();
    // Prevent changing status of main admin
    if (data.isMain) {
      return { success: false, message: "Cannot change status of main admin" };
    }

    await docRef.update({ status: decision });
    return { success: true };
  },

  // 5) Get all admin accounts from Firestore
  async getAdmins() {
    try {
      const snap = await db.collection("admins").get();
      const admins = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return { success: true, admins };
    } catch (err) {
      console.error("Error fetching admins:", err);
      return { success: false, admins: [] };
    }
  }
};

// Expose backend globally
window.backend = backend;
