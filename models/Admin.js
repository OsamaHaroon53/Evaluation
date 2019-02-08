const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

var adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                setTimeout(function () {    
                    var valid = (/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(v));
                    var msg = v + ' is not a valid email number!';
                    cb(valid, msg);
                }, 5);
            },
            message: 'Request Time out'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 12
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
    },config.get('jwtPrivateKey'), { expiresIn: '30d' });
}

module.exports = mongoose.model("Admins", adminSchema);