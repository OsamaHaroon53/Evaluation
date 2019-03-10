const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseEvaluation = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'timeTables',
        required: [true, 'course required']
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student',
        required: [true, 'student required']
    },
    availability: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'availability is required']
    },
    clearityOfSpeech: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'clearityOfSpeech is required']
    },
    explanation: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'explanation is required']
    },
    questionResponse: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'questionResponse is required']
    },
    teachingStyle: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'teachingStyle is required']
    },
    subjectKnowledge: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'subjectKnowledge is required']
    },
    comments: {
        type: String
    },
    isTheory: {
        type: Boolean,
        default: true
    }
});

courseEvaluation.index({ course: 1, student: 1, isTheory: 1 }, { unique: true });

module.exports = mongoose.model('evaluationcourses', courseEvaluation);