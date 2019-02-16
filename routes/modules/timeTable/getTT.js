const Timetable = require('../../../models/Timetable');

module.exports = async function (req, res, next) {
    var timeTable = await Timetable.find().select('-password -__v');
    if(!timeTable.length){
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