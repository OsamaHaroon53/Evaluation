const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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
    },
    isActive:{
        type: String,
        enum: ['inactive','active','sent'],
        default: 'inactive'
    }
});

teacherSchema.methods.getToken = ()=>{
    return jwt.sign({
        _id: this._id,
        role: 2
    },'UBIT');
}

module.exports = mongoose.model('teacher', teacherSchema);
