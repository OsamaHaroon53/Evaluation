const Timetable = require('../../../models/Timetable');
const Student = require('../../../models/Student');

module.exports = async function (req, res, next) {
    var student = await Student.findById(req.user._id).select('batch section -_id');
    var courses = await Timetable.find(student)
        .populate({
            path: 'section',
            populate: {
                path: 'program',
                select: '-__v'
            },
            select: '-__v'
        })
        .populate({
            path: 'course',
            select: 'title courseNo creditHour courseType program'
        })
        .select('-__v');

    if (!courses.length) {
        return res.status(200).send({
            status: 304,
            msg: "course not found"
        });
    }
    res.status(200).send({
        status: 200,
        msg: "Get Courses Succesfully",
        data: courses
    });
}