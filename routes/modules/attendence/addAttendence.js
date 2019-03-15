const _ = require('lodash');
const Student = require('../../../models/Student');
const Course = require('../../../models/Timetable');
const Attendence = require('../../../models/Attendence');
const validate = require('../Validation/attendence')

module.exports = async function (req, res, next) {
    var error = await validate(req.body);
    console.log(error);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }

    var record = await Course.findById(req.body.class);
    if (!record) {
        return res.status(400).send({
            status: 304,
            msg: "Class Not Found"
        });
    }

    record = new Attendence(req.body);

    await record.save()
        .then(data => res.status(200).send({
            data: _.omit(data.toObject(), '__v'),
            msg: "Attendence added succesfully",
            status: 200
        }))
        .catch(error => res.status(500).send({
            error: error,
            msg: "Server Error",
            status: 500
        }));
}