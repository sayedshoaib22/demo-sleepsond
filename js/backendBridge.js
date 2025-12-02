// Lightweight helper layer around your Flask API.
// This does NOT modify any existing functions; it only adds a new global `backendAPI`.

(function () {
    const API_BASE = "http://localhost:5000"; // adjust if you run Flask on a different host/port

    async function jsonFetch(path, options = {}) {
        const headers = {
            "Content-Type": "application/json",
            ...(options.headers || {})
        };

        const resp = await fetch(API_BASE + path, {
            method: options.method || "GET",
            headers,
            body: options.body ? JSON.stringify(options.body) : undefined,
        });

        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) {
            // normalize error shape a bit
            throw { status: resp.status, ...data };
        }
        return data;
    }

    // Expose high-level methods your existing code can call when/if you want.
    window.backendAPI = {
        // USER SYSTEM
        registerUser(payload) {
            // payload: { name, email, password }
            return jsonFetch("/api/users/register", {
                method: "POST",
                body: payload,
            });
        },
        loginUser(payload) {
            // payload: { email, password }
            return jsonFetch("/api/users/login", {
                method: "POST",
                body: payload,
            });
        },

        // ADMIN SYSTEM
        adminRegister(payload) {
            // payload: { username, password }
            return jsonFetch("/api/admin/register", {
                method: "POST",
                body: payload,
            });
        },
        adminLogin(payload) {
            // payload: { username, password }
            return jsonFetch("/api/admin/login", {
                method: "POST",
                body: payload,
            });
        },
        getPendingAdmins(adminToken) {
            // adminToken: string like "admin-1"
            return jsonFetch("/api/admin/pending", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });
        },
        approveAdmin(id, adminToken) {
            return jsonFetch(`/api/admin/approve/${id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });
        },
        rejectAdmin(id, adminToken) {
            return jsonFetch(`/api/admin/reject/${id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });
        },
        removeAdmin(id, adminToken) {
            return jsonFetch(`/api/admin/remove/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });
        },

        // ORDER SYSTEM
        createOrder(payload) {
            // payload: { branch, items, customer, total }
            return jsonFetch("/api/orders", {
                method: "POST",
                body: payload,
            });
        },
        getOrder(id) {
            return jsonFetch(`/api/orders/${encodeURIComponent(id)}`, {
                method: "GET",
            });
        },
        getAdminOrders(adminToken) {
            return jsonFetch("/api/admin/orders", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            });
        },
        updateOrderStatus(id, status, adminToken) {
            return jsonFetch(`/api/admin/orders/${encodeURIComponent(id)}/status`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
                body: { status },
            });
        }
    };
})();