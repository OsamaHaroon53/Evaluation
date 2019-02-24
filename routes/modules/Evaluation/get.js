const Evaluation = require('../../../models/evaluationCourse');

module.exports = async function (req, res, next) {
    var data = await Evaluation.find().populate('student course').select('-__v');
    if(!data.length){
        return res.status(200).send({
            status: 304,
            msg: "Course Evaluation Not Found"
        });
    }
    res.status(200).send({
        status: 200,
        msg: "Get Course Evaluation Succesfully",
        data: data
    });
}