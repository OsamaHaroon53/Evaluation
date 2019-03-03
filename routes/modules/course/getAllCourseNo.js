const courseModel = require('../../../models/Course');
const { objectIdValidator } = require('../Validation/variable');

module.exports = async (req, res) => {
    let { program } = req.params;

    if (!await objectIdValidator(program)) {
        return res.send({
            error: 'Program id is not valid',
            status: 402,
            msg: 'Validation Error'
        });
    }

    record = await courseModel.find({ program: program }).select("_id courseNo title creditHour");
    if (!record || (record && !record.length)) {
        return res.status(200).send({
            status: 304,
            msg: 'Course Not Found'
        })
    }

    res.send({
        status: 200,
        data: record,
        msg: 'Courses get succesfully'
    });
}