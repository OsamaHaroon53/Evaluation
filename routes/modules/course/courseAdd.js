const courseModel = require('../../../models/Course');
const validate = require('../Validation/course');
const Program = require('../../../models/Program');
const createCourseNo = require('./createCourseNo');
const _ = require('lodash');

module.exports = async (req, res) => {
    var { body: payload } = req;

    var error = await validate(payload);
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
    payload = _.assign(payload,await createCourseNo(payload.courseNo, record));
    
    record = await courseModel.findOne(payload);
    if (record) {
        return res.status(400).send({
            status: 400,
            msg: "course already exist"
        });
    }

    record = new courseModel(payload);

    await record.save()
        .then(data => res.status(200).send({
            data: _.omit(data.toObject(), '__v'),
            msg: "course added succesfully",
            status: 200
        }))
        .catch(error => res.status(500).send({
            error: error,
            msg: "Server Error",
            status: 500
        }));
};

