const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const classSchema = new Schema({
    program: {
        type: String,
        required: [true, 'program is required'],
    },
    semester: {
        type: Number,
        required: [true, 'semester is required'],
        min: 1,
        max: 8
    },
    section: {
        type: String,
        minlength: 1,
        maxlength: 3,
        default: 'Not'
    }
});

module.exports = mongoose.model('class', classSchema);
