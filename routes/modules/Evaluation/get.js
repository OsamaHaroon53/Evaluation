const Evaluation = require('../../../models/evaluationCourse');

module.exports = async function (req, res, next) {
    var data = await Evaluation.find()
        .populate({ 
            path: 'course',
            populate: {
              path: 'program',
              select: '-__v'
            },
            select: 'title courseNo creditHour' 
        })
        .populate({ 
            path: 'student',
            populate: {
              path: 'section',
              select: '-__v'
            },
            select: 'isActive email ep_no name fname'
        })
        .select('-__v');
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