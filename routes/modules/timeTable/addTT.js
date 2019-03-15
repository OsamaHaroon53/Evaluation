const _ = require('lodash');
const Timetable = require('../../../models/Timetable');
const Section = require('../../../models/Section');
const Teacher = require('../../../models/Teacher');
const Course = require('../../../models/Course');
const validate = require('../Validation/timeTable');

module.exports = async function (req, res, next) {
    var { body } = req;
    var error = await validate(body);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }

    record = await Section.findById(body.section);
    if (!record) {
        return res.status(400).send({
            status: 304,
            msg: "Section Not Found"
        });
    }

    record = await Course.findById(body.course);
    if (!record) {
        return res.status(400).send({
            status: 304,
            msg: "Course Not Found"
        });
    }

    record = await Teacher.findById(body.teacher);
    if (!record) {
        return res.status(400).send({
            status: 304,
            msg: "Teacher Not Found"
        });
    }

    if(body["labTeacher"]){
        record = await Teacher.findById(body.labTeacher);
        if (!record) {
            return res.status(400).send({
                status: 304,
                msg: "Lab Teacher Not Found"
            });
        }   
    }
    else{
        body = _.omit(body,"labStartTime","labEndTime","labTeacher","labDay");
    }

    record = await Timetable.findOne(body);
    if (record) {
        return res.status(400).send({
            status: 400,
            msg: "Timetable already exist"
        });
    }

    record = new Timetable(body);

    await record.save()
        .then(data => res.status(200).send({
            data: _.omit(data.toObject(), '__v'),
            msg: "Timetable added succesfully",
            status: 200
        }))
        .catch(error => res.status(500).send({
            error: error,
            msg: "Server Error",
            status: 500
        }));
}