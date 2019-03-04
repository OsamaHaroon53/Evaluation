const Timetable = require('../../../models/Timetable');

module.exports = async function (req, res, next) {

    var timeTable = await Timetable.find({
        effectiveDate: Number(req.params.effectiveDate),
        section: req.params.section
        })
        .populate({
            path: 'course',
            select: 'title courseNo creditHour courseType program'
        })
        .populate({
            path: 'teacher labTeacher',
            select: '-__v -password -contact_no -img -block'
        })
        .select('-__v');
    if (!timeTable.length) {
        return res.status(200).send({
            status: 304,
            msg: "TimeTable Detail Not Found"
        });
    }
    res.status(200).send({
        status: 200,
        msg: "Get TimeTable Details Succesfully",
        data: timeTable
    });
}