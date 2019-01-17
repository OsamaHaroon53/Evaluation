const Teacher = require('../../../models/Teacher');

module.exports = async function (req, res, next) {
    var teacher = await Teacher.find().select('-password -__v');
    if(!teacher.length){
        return res.status(200).send({
            status: 304,
            msg: "Teachers Not Found"
        });
    }
    res.status(200).send({
        status: 200,
        msg: "Get Teachers Succesfully",
        data: teacher
    });
}