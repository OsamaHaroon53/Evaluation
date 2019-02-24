const _ = require('lodash');
const Student = require('../../../models/Student');
const Course = require('../../../models/Course');
const Evaluation = require('../../../models/evaluationCourse');

module.exports = async function (req, res, next) {
    var record = await Course.findById(req.body.course);
    if (!record) {
        return res.status(400).send({
            status: 304,
            msg: "Course Not Found"
        });
    }

    record = await Student.findById(req.user._id);
    req.body.student = req.user._id;
    if (!record) {
        return res.status(400).send({
            status: 400,
            msg: "Student Not found"
        });
    }

    record = new Evaluation(req.body);

    await record.save()
        .then(data => res.status(200).send({
            data: _.omit(data.toObject(), '__v'),
            msg: "Course Evaluatiuon added succesfully",
            status: 200
        }))
        .catch(error => res.status(500).send({
            error: error,
            msg: "Server Error",
            status: 500
        }));
}