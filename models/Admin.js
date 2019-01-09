const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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
    }
});

adminSchema.methods.getToken = ()=>{
    return jwt.sign({
        _id: this._id,
        role: 1
    },'UBIT');
}

module.exports = mongoose.model("Admins", adminSchema);