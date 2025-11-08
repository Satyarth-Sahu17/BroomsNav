const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'broomnav-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

// In-memory storage (replace with Firebase/MongoDB in production)
const users = [];
const reports = [];

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (\!token) return res.status(401).json({ error: 'Access denied' });
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Register endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (\!name || \!email || \!password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };
        
        users.push(user);
        
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        
        res.json({
            success: true,
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (\!email || \!password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        
        const user = users.find(u => u.email === email);
        if (\!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (\!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        
        res.json({
            success: true,
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Get user reports
app.get('/api/reports', (req, res) => {
    res.json({ success: true, reports });
});

// Submit safety report
app.post('/api/reports', authenticateToken, (req, res) => {
    try {
        const { lat, lng, type, description, city } = req.body;
        
        if (\!lat || \!lng || \!type || \!city) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const report = {
            id: Date.now().toString(),
            userId: req.user.id,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            type,
            description: description || '',
            city,
            timestamp: new Date().toISOString(),
            votes: 0
        };
        
        reports.push(report);
        
        res.json({ success: true, report });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit report' });
    }
});

// Vote on report
app.post('/api/reports/:id/vote', authenticateToken, (req, res) => {
    try {
        const reportId = req.params.id;
        const report = reports.find(r => r.id === reportId);
        
        if (\!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        
        report.votes += 1;
        
        res.json({ success: true, report });
    } catch (error) {
        res.status(500).json({ error: 'Failed to vote' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🧹 BroomNav server running on http://localhost:${PORT}`);
});
