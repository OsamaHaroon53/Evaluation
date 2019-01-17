const mongoose = require('mongoose');

var codeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin','teacher','student'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
codeSchema.index({createdAt: 1},{expireAfterSeconds: 3600});
module.exports = mongoose.model("codes", codeSchema);