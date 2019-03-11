const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var attendence = new Schema({
    class: {
        type: Schema.Types.ObjectId,
        ref: 'timeTables',
        required: [true, 'student required']
    },
    attendence: [{
        studentID: {
            type: Schema.Types.ObjectId,
            ref: 'student',
            required: [true, 'Student required']
        },
        status: {
            type: Boolean,
            required: [true, 'Status is required']
        }
    }],
    date: {
        type: Number,
        required: true
    },
    isTheory: {
        type: Boolean,
        default: true
    }
});

attendence.index({ class: 1, date: 1, isTheory: 1 }, { unique: true });

module.exports = mongoose.model("Attendences", attendence);