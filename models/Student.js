const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
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
        type: String,
    },
    phone_no: {
        type: Number,
    },
    batch: {
        type: Number,
        min: 1995,
        max: 9999
    },
    section: {
        type: Schema.Types.ObjectId,
        ref: 'sections'
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
    img:{
        type: String
    },
    isActive:{
        type: String,
        enum: ['inactive','active','sent'],
        default: 'inactive'
    },
    block: {
        type: Boolean,
        default: false
    }
});

studentSchema.methods.generateToken = function(){
    return jwt.sign({
        _id: this._id,
        role: 3,
        status: this.isActive
    },config.get('jwtPrivateKey'), { expiresIn: '30d' });
}

module.exports = mongoose.model('student', studentSchema);
