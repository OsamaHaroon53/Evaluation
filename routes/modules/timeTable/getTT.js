const Timetable = require('../../../models/Timetable');

module.exports = async function (req, res, next) {
    var timeTable = await Timetable.find()
        .populate({
            path: 'section',
            populate: {
                path: 'program',
                select: '-__v'
            },
            select: 'section'
        })
        .populate({
            path: 'course',
            select: 'title courseNo creditHour courseType program'
        })
        .populate({
            path: 'teacher labTeacher',
            select: '-__v -password -contact_no -img -block'
        })
        .select('-password -__v');
    if (!timeTable.length) {
        return res.status(200).send({
            status: 304,
            msg: "TimeTables Not Found"
        });
    }
    res.status(200).send({
        status: 200,
        msg: "Get TimeTables Succesfully",
        data: timeTable
    });
}