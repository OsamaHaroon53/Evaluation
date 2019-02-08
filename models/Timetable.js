const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TTSchema = new Schema({
    Day: {
        type: Number,
        required: true,
        min: 0,
        max: 6
    },
    shift: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    Time: {
        type: String,
        required: true
    },
    
    course: {
        type: Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'teacher',
        required: true
    },
    labTime: {
        type: String
    },
    labTeacher: {
        type: Schema.Types.ObjectId,
        ref: 'teacher'
    }
});

module.exports = mongoose.model('timeTable', TTSchema);