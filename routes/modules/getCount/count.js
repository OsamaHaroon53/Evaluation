const Student = require('../../../models/Student');
const Teacher = require('../../../models/Teacher');
const Evaluation = require('../../../models/evaluationCourse');
const Query = require('../../../models/Query');

module.exports = async function (req, res, next) {
    let student = await Student.estimatedDocumentCount();
    let teacher = await Teacher.estimatedDocumentCount();
    let evaluation = await Evaluation.estimatedDocumentCount();
    let query = await Query.estimatedDocumentCount();
    res.status(200).send({
        status: 200,
        msg: "Get counts Succesfully",
        data: {
            students: student,
            teachers: teacher,
            courseEvaluations: evaluation,
            complain: query
        }
    });
}
