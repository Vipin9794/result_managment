const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    studentID: String,
    class: String,
    results: [
        {
            subject: String,
            score: Number,
        },
    ],
});

module.exports = mongoose.model('Student', studentSchema);
