const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Schema = mongoose.Schema;

var adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActive:{
        type: String,
        enum: ['inactive','active','sent'],
        default: 'inactive'
    }
});

adminSchema.methods.generateToken = function(){
    return jwt.sign({
        _id: this._id,
        role: 1
    },config.get('jwtPrivateKey'));
}

module.exports = mongoose.model("Admins", adminSchema);