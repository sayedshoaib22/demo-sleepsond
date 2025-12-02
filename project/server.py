from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app)  # allow frontend origin(s) via CORS

# ---------- In-Memory "Database" (Demo Only) ----------

# Simple in-memory stores. In production, replace with a real DB.
users = []   # {id, name, email, password}
admins = [
    {
        "id": 1,
        "username": "admin",
        "password": "sleep123",
        "role": "super",
        "status": "approved",
        "isMain": True,
    }
]
orders = []  # {id, date, total, status, branch, items, customer}


# ---------- Helpers ----------

def make_order_id():
    """Generate IDs like SS-2025-XXXX (year + 4-char code)."""
    year = datetime.now().year
    return f"SS-{year}-{uuid.uuid4().hex[:4].upper()}"


def _get_admin_from_token():
    """
    Read admin token from Authorization header.
    Expected format: "Bearer admin-<id>" (returned by /api/admin/login).
    """
    auth_header = request.headers.get("Authorization", "").strip()
    if not auth_header:
        return None

    # support both "Bearer admin-1" and just "admin-1"
    token = auth_header
    if auth_header.lower().startswith("bearer "):
        token = auth_header.split(" ", 1)[1].strip()

    if not token.startswith("admin-"):
        return None

    try:
        admin_id = int(token.split("-", 1)[1])
    except ValueError:
        return None

    for a in admins:
        if a["id"] == admin_id:
            return a
    return None


def require_admin(main_only: bool = False):
    """
    Simple guard for admin-only endpoints.
    - If main_only=True, only the main admin (isMain=True) is allowed.
    Returns (admin, error_response_or_None).
    """
    admin = _get_admin_from_token()
    if not admin:
        return None, (jsonify({"ok": False, "message": "Admin token required"}), 401)

    if admin.get("status") != "approved":
        return None, (jsonify({"ok": False, "message": "Admin not approved"}), 403)

    if main_only and not admin.get("isMain"):
        return None, (jsonify({"ok": False, "message": "Only main admin allowed"}), 403)

    return admin, None


# ---------- USER SYSTEM ----------

@app.route("/api/users/register", methods=["POST"])
def register_user():
    data = request.get_json() or {}
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not all([name, email, password]):
        return jsonify({"ok": False, "message": "Missing fields"}), 400

    if any(u["email"] == email for u in users):
        return jsonify({"ok": False, "message": "Email already registered"}), 400

    new_user = {
        "id": len(users) + 1,
        "name": name,
        "email": email,
        "password": password,
    }
    users.append(new_user)
    return jsonify({"ok": True, "user": new_user}), 201


@app.route("/api/users/login", methods=["POST"])
def login_user():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    for u in users:
        if u["email"] == email and u["password"] == password:
            # very simple token: "user-<id>"
            return jsonify({
                "ok": True,
                "user": {"id": u["id"], "name": u["name"], "email": u["email"]},
                "token": f"user-{u['id']}"
            })
    return jsonify({"ok": False, "message": "Invalid email or password"}), 401


# ---------- ADMIN SYSTEM ----------

@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")

    for a in admins:
        if a["username"] == username and a["password"] == password:
            if a["status"] == "pending":
                return jsonify({"ok": False, "message": "Pending approval"}), 403
            if a["status"] == "rejected":
                return jsonify({"ok": False, "message": "Rejected by main admin"}), 403

            # very simple token: "admin-<id>"
            return jsonify({
                "ok": True,
                "admin": a,
                "token": f"admin-{a['id']}"
            })
    return jsonify({"ok": False, "message": "Invalid credentials"}), 401


@app.route("/api/admin/register", methods=["POST"])
def admin_register():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"ok": False, "message": "Missing fields"}), 400

    if any(a["username"] == username for a in admins):
        return jsonify({"ok": False, "message": "Username already taken"}), 400

    # Newly registered admins are always pending
    new_admin = {
        "id": len(admins) + 1,
        "username": username,
        "password": password,
        "role": "admin",
        "status": "pending",
        "isMain": False,
    }
    admins.append(new_admin)
    return jsonify({"ok": True, "admin": new_admin}), 201


@app.route("/api/admin/pending", methods=["GET"])
def admin_pending():
    # Only main admin can see pending admins (can relax this if desired)
    _, error = require_admin(main_only=True)
    if error:
        return error

    pending = [a for a in admins if a["status"] == "pending"]
    return jsonify({"ok": True, "pending": pending})


@app.route("/api/admin/approve/<int:admin_id>", methods=["POST"])
def approve_admin(admin_id):
    # Only main admin can approve
    _, error = require_admin(main_only=True)
    if error:
        return error

    for a in admins:
        if a["id"] == admin_id:
            a["status"] = "approved"
            return jsonify({"ok": True, "admin": a})
    return jsonify({"ok": False, "message": "Admin not found"}), 404


@app.route("/api/admin/reject/<int:admin_id>", methods=["POST"])
def reject_admin(admin_id):
    # Only main admin can reject
    _, error = require_admin(main_only=True)
    if error:
        return error

    for a in admins:
        if a["id"] == admin_id:
            a["status"] = "rejected"
            return jsonify({"ok": True, "admin": a})
    return jsonify({"ok": False, "message": "Admin not found"}), 404


@app.route("/api/admin/remove/<int:admin_id>", methods=["DELETE"])
def remove_admin(admin_id):
    # Only main admin can delete other admins
    main_admin, error = require_admin(main_only=True)
    if error:
        return error

    global admins
    target = None
    for a in admins:
        if a["id"] == admin_id:
            target = a
            break

    if not target:
        return jsonify({"ok": False, "message": "Admin not found"}), 404

    # Main admin account itself can never be removed
    if target.get("isMain") or target.get("username") == main_admin.get("username") == "admin":
        return jsonify({"ok": False, "message": "Main admin cannot be removed"}), 400

    admins = [a for a in admins if a["id"] != admin_id]
    return jsonify({"ok": True})


# ---------- ORDER SYSTEM ----------

@app.route("/api/orders", methods=["POST"])
def create_order():
    data = request.get_json() or {}
    branch = data.get("branch")
    items = data.get("items", [])
    customer = data.get("customer") or {"name": "Guest", "email": "guest@example.com"}
    total = data.get("total")

    if not branch or not items or total is None:
        return jsonify({"ok": False, "message": "Missing fields"}), 400

    order_id = make_order_id()
    new_order = {
        "id": order_id,  # e.g. "SS-2025-ABCD"
        "date": datetime.utcnow().isoformat(),
        "total": total,
        "status": "Order Placed",
        "branch": branch,
        "items": items,
        "customer": customer,
    }
    # insert at start so newest orders come first
    orders.insert(0, new_order)
    return jsonify({"ok": True, "order": new_order}), 201


@app.route("/api/orders/<order_id>", methods=["GET"])
def get_order(order_id):
    for o in orders:
        if o["id"] == order_id:
            return jsonify({"ok": True, "order": o})
    return jsonify({"ok": False, "message": "Order not found"}), 404


@app.route("/api/admin/orders", methods=["GET"])
def list_orders():
    # Any approved admin can see orders
    _, error = require_admin(main_only=False)
    if error:
        return error

    return jsonify({"ok": True, "orders": orders})


@app.route("/api/admin/orders/<order_id>/status", methods=["PATCH"])
def update_order_status(order_id):
    # Any approved admin can update status
    _, error = require_admin(main_only=False)
    if error:
        return error

    data = request.get_json() or {}
    new_status = data.get("status")

    if not new_status:
        return jsonify({"ok": False, "message": "Missing status"}), 400

    for o in orders:
        if o["id"] == order_id:
            o["status"] = new_status
            return jsonify({"ok": True, "order": o})

    return jsonify({"ok": False, "message": "Order not found"}), 404


if __name__ == "__main__":
    # Run on localhost:5000 by default
    app.run(host="0.0.0.0", port=5000, debug=True)