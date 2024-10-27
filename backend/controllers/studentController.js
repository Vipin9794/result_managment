// controllers/studentController.js

const Student = require('../models/student');
const Result = require('../models/Result');
const jwt = require('jsonwebtoken');

// Student Login
exports.studentLogin = async (req, res) => {
    const { rollNumber, password } = req.body;
    try {
        const student = await Student.findOne({ rollNumber, password });
        if (!student) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// View Result
exports.viewResult = async (req, res) => {
    const studentId = req.user.id;  // Assuming req.user is set after JWT auth middleware
    try {
        const results = await Result.find({ studentId });
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
