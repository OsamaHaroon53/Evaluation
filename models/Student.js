const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        // required: true
    },
    fname: {
        type: String
    },
    form_no: {
        type: Number,
        required: true
    },
    enrolnment_no: {
        type: String
    },
    ep_no: {
        type: Number,
        // required: true,
        unique: true
    },
    phone_no: {
        type: Number,
        // required: true
    },
    year: {
        type: Number,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    img:{
        type: String
    }

});

module.exports = mongoose.model('student', studentSchema);
