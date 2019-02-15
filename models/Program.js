const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const programSchema = new Schema({
    programName: {
        type: String,
        required: [true, 'program Name is required']
    },
    program: {
        type: String,
        required: [true, 'program is required'],
        min: 2,
        max: 6
    },
    semester: {
        type: Number,
        required: [true, 'semester is required'],
        min: 1,
        max: 10
    },
    shift: {
        type: String,
        enum: ['both', 'morning', 'evening'],
        required: [true, 'shift is required']
    },
    description: {
        type: String
    }
});

programSchema.index({ program: 1, semester: 1, shift: 1 }, { unique: true });

module.exports = mongoose.model('programs', programSchema);
