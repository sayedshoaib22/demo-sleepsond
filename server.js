
/**
 * BACKEND SERVER FOR ADMIN APPROVALS
 * 
 * Instructions:
 * 1. Install dependencies: npm install express cors body-parser
 * 2. Run server: node server.js
 * 3. Update app.js: Set USE_BACKEND = true;
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Mock Database (In-memory for demonstration)
let admins = [
    { id: 1, username: 'admin', password: 'sleep123', role: 'super', status: 'approved', isMain: true }
];

// 1. Admin Login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    const admin = admins.find(a => a.username === username && a.password === password);
    
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    if (admin.status === 'pending') return res.status(403).json({ error: 'Account pending approval' });
    if (admin.status === 'rejected') return res.status(403).json({ error: 'Account rejected' });

    res.json({ success: true, admin });
});

// 2. Register Admin (Create Pending Request)
app.post('/api/admin/register', (req, res) => {
    const { username, email, password } = req.body;
    if (admins.find(a => a.username === username)) {
        return res.status(400).json({ error: 'Username taken' });
    }

    const newAdmin = {
        id: Date.now(),
        username,
        email,
        password,
        role: 'admin',
        status: 'pending',
        isMain: false
    };
    admins.push(newAdmin);
    res.json({ success: true, message: 'Request submitted' });
});

// 3. Get All Admins (Protected)
app.get('/api/admin/all', (req, res) => {
    // In real app, check for Auth Token here
    res.json(admins);
});

// 4. Approve Admin
app.post('/api/admin/approve', (req, res) => {
    const { id } = req.body;
    const admin = admins.find(a => a.id === id);
    if (admin) {
        admin.status = 'approved';
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Admin not found' });
    }
});

// 5. Reject Admin
app.post('/api/admin/reject', (req, res) => {
    const { id } = req.body;
    admins = admins.filter(a => a.id !== id); // Remove from list
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
