const Student = require('../../../models/Student');

module.exports = async function (req, res, next) {
    var data = await Student.find({ section: req.params.class })
        .populate({
            path: 'section',
            populate: {
                path: 'program',
                select: '-__v'
            },
            select: '-__v'
        })
        .select('-block -password -isActive -__v');
    if (!data.length) {
        return res.status(200).send({
            status: 304,
            msg: "Student Not Found"
        });
    }
    res.status(200).send({
        status: 200,
        msg: "Get Students Succesfully",
        data: data
    });
}