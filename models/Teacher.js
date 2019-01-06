const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    fname: {
        type: String
    },
    Designation: {
        type: String
    },
    qualification: {
        type: String
    },
    contact_no: {
        type: Number
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    img:{
        type: String
    }
});

module.exports = mongoose.model('teacher', teacherSchema);
