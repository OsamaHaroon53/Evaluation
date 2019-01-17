const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    fname: {
        type: String
    },
    designation: {
        type: String
    },
    qualification: {
        type: String
    },
    type:{
        type: String,
        enum: ['permenant','visiting'],
        default: 'visiting'
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

teacherSchema.methods.generateToken = function(){
    return jwt.sign({
        _id: this._id,
        role: 2
    },config.get('jwtPrivateKey'));
}

module.exports = mongoose.model('teacher', teacherSchema);
