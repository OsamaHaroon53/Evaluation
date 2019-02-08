const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'course title required']
    },
    courseNo: {
        type: String,
        required: [true, 'course no. required'],
        unique: true,
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                setTimeout(function () {    
                    var valid = (/^((MSCS)|(CS)|(CS[(]SE[)])|(BSCS)|(PGD))([-]{1})(\d{3})$/.test(v));
                    var msg = v + ' is not a valid course number!';
                    cb(valid, msg);
                }, 5);
            },
            // Default error message, overridden by 2nd argument to `cb()` above
            message: 'Request Time out'
        }
    },
    creditHour: {
        type: String,
        required: [true, 'course title required'],
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                setTimeout(function () {    
                    var valid = (/^(\d{1})$|(^(\d{1})([+]{1})(\d{1})$)/.test(v));
                    var msg = v + ' is not a valid course credit hour!';
                    cb(valid, msg);
                }, 5);
            },
            // Default error message, overridden by 2nd argument to `cb()` above
            message: 'Request Time out'
        }
    },
    courseType:{
        type: String,
        required: [true, 'course type required'],
        enum: ['compulsory','optional','special']
    },
    program: {
        type: String,
        required: [true, 'program is required'],
        enum: ['BSSE', 'BSCS', 'MCS', 'PGD', 'MS', 'Phd']
    },
    semester: {
        type: Number,
        required: [true, 'semester required'],
        min: 1,
        max: 8
    },
    preRequisite: {
        type: Schema.Types.ObjectId,
        ref: 'course'
    },
    content: {
        type: String,
        default: 'contact to office staff'
    },
    BookSuggestion: {
        type: [String]
    },
});

module.exports = mongoose.model('course', courseSchema);
