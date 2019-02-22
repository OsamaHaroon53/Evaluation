const courseModel = require('../../../models/Course');

module.exports = async (req, res) => {

    var record = await courseModel.find().select("-__v");
    if (!record || (record && !record.length)) {
        return res.status(200).send({
            status: 304,
            msg: 'Courses Not Found'
        })
    }

    res.send({
        status: 200,
        data: record,
        msg: 'Courses get succesfully'
    });
}