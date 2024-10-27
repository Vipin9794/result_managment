// controllers/adminController.js

const Admin = require('../models/admin');
const Result = require('../models/Result');
const jwt = require('jsonwebtoken');

// Admin Login
exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username, password });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create or Update Result
exports.createOrUpdateResult = async (req, res) => {
    const { studentId, subject, marks } = req.body;
    try {
        let result = await Result.findOne({ studentId, subject });
        if (result) {
            result.marks = marks;
            await result.save();
        } else {
            result = new Result({ studentId, subject, marks });
            await result.save();
        }
        res.json({ message: 'Result updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// View All Results
exports.viewAllResults = async (req, res) => {
    try {
        const results = await Result.find().populate('studentId', 'name');
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
