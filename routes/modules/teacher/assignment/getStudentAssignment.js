const StudentDocument = require('../../../../models/StudentDocument');

module.exports = async function (req, res, next) {
    let options = {
        assignment: req.params.assignment
    }
    var assignments = await StudentDocument.find(options)
        .populate("student","-password -__v -phone_no -block")
        .select('-teacher -__v');
    res.status(200).send({
        status: 200,
        msg: "Get Student assignments Succesfully",
        data: assignments
    });
}