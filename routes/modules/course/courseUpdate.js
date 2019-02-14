const courseModel = require('../../../models/Course');
const validate = require('../Validation/course');
const Program = require('../../../models/Program');
const createCourseNo = require('./createCourseNo');
const _ = require('lodash');

module.exports = async (req, res) => {
    var { body: payload } = req;
    var { id } = req.params;
    var error = await validate(payload,id);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }
    console.log(error)

    var record = await Program.findById(payload.program).select('program');
    if (!record) {
        return res.status(400).send({
            status: 304,
            msg: "Program Not Found"
        });
    }
    payload = _.assign(payload, await createCourseNo(payload.courseNo, record));

    await courseModel.findOneAndUpdate({ _id: id }, payload)
        .then(data => {
            data ? res.status(200).send({
                status: 200,
                data: (() => {
                    payload["_id"] = id;
                    return payload;
                })(),
                msg: 'Course Update succesfully'
            }) : res.send({
                status: 304,
                msg: 'Course not found'
            });
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                msg: 'Server Error',
                error: err
            });
        });
};