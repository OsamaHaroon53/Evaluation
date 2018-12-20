const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    stud_name: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    form_no: {
        type: Number,
        required: false
    },
    enrolnment_no: {
        type: String,
        required: true
    },
    ep_no: {
        type: Number,
        required: true
    },
    phone_no: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('student', studentSchema);
