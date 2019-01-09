const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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
        //unique: true
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
        required: true
    },
    password: {
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

studentSchema.methods.getToken = ()=>{
    return jwt.sign({
        _id: this._id,
        role: 3
    },'UBIT');
}

module.exports = mongoose.model('student', studentSchema);
