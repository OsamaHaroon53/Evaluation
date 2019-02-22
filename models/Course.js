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
                    var valid = (/^([a-zA-Z]{2,6})([-]{1})(\d{3})$/.test(v));
                    var msg = v + ' is not a valid course number!';
                    cb(valid, msg);
                }, 5);
            },
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
            message: 'Request Time out'
        }
    },
    courseType: {
        type: String,
        required: [true, 'course type required'],
        enum: ['compulsory', 'optional', 'special']
    },
    program: {
        type: Schema.Types.ObjectId,
        ref: 'programs',
        required: [true, 'program id is required']
    },
    preRequisite: {
        type: Schema.Types.ObjectId,
        ref: 'courses'
    },
    content: {
        type: String,
        default: 'contact to office staff'
    },
    bookSuggestion: {
        type: [String]
    },
});

module.exports = mongoose.model('courses', courseSchema);
