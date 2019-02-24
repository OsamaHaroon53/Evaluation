const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseEvaluation = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'courses',
        required: [true, 'course required']
    },
    student: {
        type: Schema.ObjectId.ObjectId,
        ref: 'students',
        required: [true, 'student required']
    },
    availability: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'program id is required']
    },
    clearityOfSpeech: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'program id is required']
    },
    explanation: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'program id is required']
    },
    questionResponse: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'program id is required']
    },
    teachingStyle: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'program id is required']
    },
    subjectKnowledge: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'program id is required']
    },
    theoryComments: {
        type: String
    },
    labComments: {
        type: String
    }
});

programSchema.index({ course: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('evaluationcourses', courseEvaluation);z