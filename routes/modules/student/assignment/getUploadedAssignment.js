const StudentDocument = require('../../../../models/StudentDocument');

module.exports = async function (req, res, next) {
    let options = {
        student: req.user._id,
        assignment: req.params.assignment
    }
    var assignments = await StudentDocument.find(options)
        .select('-student -__v');
    res.status(200).send({
        status: 200,
        msg: "Get Uploaded assignment Succesfully",
        data: assignments
    });
}