const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sectionSchema = new Schema({
    program: {
        type: Schema.Types.ObjectId,
        ref: 'programs',
        required: [true, 'program id is required']
    },
    section: {
        type: String,
        minlength: 1,
        maxlength: 3,
        required: [true, 'section is required']
    }
});

sectionSchema.index({ program: 1, section: 1 }, { unique: true });

module.exports = mongoose.model('sections', sectionSchema);
