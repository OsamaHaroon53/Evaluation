const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TTSchema = new Schema({
    day: {
        type: Number,
        required: true,
        min: 0,
        max: 6
    },
    section: {
        type: Schema.Types.ObjectId,
        ref: 'sections',
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    effectiveDate: {
        type: Number,
        required: true
    },
    batch: {
        type: String,
        default: function(){
            return new Date(this.effectiveDate).getFullYear()
        }
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'teacher',
        required: true
    },
    labStartTime: {
        type: String
    },
    labEndTime: {
        type: String
    },
    labTeacher: {
        type: Schema.Types.ObjectId,
        ref: 'teacher'
    }
});

TTSchema.index({ effectiveDate: 1, section: 1 }, { unique: true });

module.exports = mongoose.model('timeTables', TTSchema);