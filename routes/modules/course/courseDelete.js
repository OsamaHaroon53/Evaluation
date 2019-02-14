const courseModel = require('../../../models/Course');
const { objectIdValidator } = require('../Validation/variable');

module.exports = async (req, res) => {
    var { id } = req.params;

    if (!await objectIdValidator(id)) {
        return res.status(402).send({
            error: "course ID is not valid",
            status: 402,
            msg: 'Validation error'
        });
    }
    await courseModel.findByIdAndDelete(id)
        .then(data => {
            data ? res.status(200).send({
                status: 200,
                msg: 'Course Delete succesfully'
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