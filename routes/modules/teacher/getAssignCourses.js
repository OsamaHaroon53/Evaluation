const Timetable = require('../../../models/Timetable');

module.exports = async function (req, res, next) {
    var courses = await Timetable.find({ teacher: req.user._id })
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

    var labCourses = await Timetable.find({ labTeacher: req.user._id })
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

    if (!courses.length && !labCourses.length) {
        return res.status(200).send({
            status: 304,
            msg: "Not assign any course"
        });
    }
    res.status(200).send({
        status: 200,
        msg: "Get Courses Succesfully",
        data: { theory: courses, lab: labCourses }
    });
}