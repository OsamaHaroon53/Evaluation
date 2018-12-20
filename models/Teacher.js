const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    teacher_name: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    Designation: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    contact_no: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('teacher', teacherSchema);
