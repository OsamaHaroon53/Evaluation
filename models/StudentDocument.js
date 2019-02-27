const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var document = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    assignment: {
        type: Schema.Types.ObjectId,
        ref: 'documents',
        required: true
    },
    document:{
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description:{
        type: String
    }
});

module.exports = mongoose.model("studentdocuments", document);