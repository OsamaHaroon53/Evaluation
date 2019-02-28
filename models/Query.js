const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var query = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'timeTables',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    query:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("query", query);