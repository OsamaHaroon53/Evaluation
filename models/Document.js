const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var document = new Schema({
    type: {
        type: Number,
        required: true
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'timeTables',
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'teacher',
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

module.exports = mongoose.model("documents", document);