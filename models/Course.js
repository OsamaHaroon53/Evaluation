const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    courseNo: {
        type: Number,
        required: true
    },
    creditHour: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('course', courseSchema);
