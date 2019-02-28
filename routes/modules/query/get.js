const Query = require('../../../models/Query');

module.exports = async function (req, res, next) {

    var assignments = await Query.find()
        .populate({
            path: 'teacher',
            populate: {
                path: 'course teacher',
                select: '-__v -password -block -isActive -img'
            },
            select: '-__v'
        })
        .select('-__v');
    res.status(200).send({
        status: 200,
        msg: "Get queries Succesfully",
        data: assignments
    });
}