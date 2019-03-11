const Attendence = require('../../../models/Attendence');

module.exports = async function (req, res, next) {
    var data = await Attendence.find()
        .populate({
            path: 'class',
            populate: [{
                path: 'section',
                populate: {
                    path: 'program',
                    select: '-__v'
                },
                select: '-__v'
            },{
                path: 'teacher labTeacher',
                select: '-__v -password -contact_no -img -block'
            }],
            select: '-__v'
        })
        .select('-__v');
    if (!data.length) {
        return res.status(200).send({
            status: 304,
            msg: "Attendence Not Found"
        });
    }
    res.status(200).send({
        status: 200,
        msg: "Get Attendence Succesfully",
        data: data
    });
}