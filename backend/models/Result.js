// models/Result.js

const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100,  // Assuming marks are between 0 and 100
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Result', resultSchema);
