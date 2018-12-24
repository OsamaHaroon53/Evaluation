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
    },
    creditHour: {
        type: String,
        required: [true, 'course title required'],
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                setTimeout(function () {
                    var valid = (/^(\d{1})([+]{1})(\d{1})$/.test(v)) || (/^\d{1}$/.test(v));
                    var msg = v + ' is not a valid course number!';
                    cb(valid, msg);
                }, 5);
            },
            // Default error message, overridden by 2nd argument to `cb()` above
            message: 'Request Time out'
        },
    },
    program: {
        type: String,
        required: [true, 'Program is required'],
        enum: ['BSSE', 'BSCS', 'MCS', 'PGD', 'MS', 'Phd', 'MS/Phd']
    },
    semester: {
        type: Number,
        required: [true, 'semester required'],
        min: 1,
        max: 8
    },
    preRequisite: {
        type: String,
        default: 'None'
    },
    content: {
        type: String,
        default: 'Contact to office staff'
    },
    BookSuggestion: {
        type: [String]
    },
});

module.exports = mongoose.model('course', courseSchema);
