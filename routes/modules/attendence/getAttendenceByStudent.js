const Attendence = require('../../../models/Attendence');
const { Types } = require('mongoose');

module.exports = async function (req, res, next) {
    await Attendence.aggregate([
        {
            $match: {
                class: Types.ObjectId(req.params.class)
            }
        },
        {
            $unwind: "$attendence"
        },
        {
            $match: {
                "attendence.studentID": Types.ObjectId(req.params.student)
            }
        },
        {
            $group: {
                _id: "$isTheory",
                request: {
                    $addToSet: {
                        class: "$class",
                        studentID: "$attendence.studentID"
                    }
                },
                present: { $sum: { $cond: { if: "$attendence.status", then: 1, else: 0 } } },
                absent: { $sum: { $cond: { if: "$attendence.status", then: 0, else: 1 } } },
                total: { $sum: 1}
            }
        },
        {
            $project:
             {
                isTheory: "$_id",
                class: { $arrayElemAt: [ "$request.class", 0 ] },
                studentID: { $arrayElemAt: [ "$request.studentID", 0 ] },
                present: "$present",
                absent: "$absent",
                total: "$total",
                _id: 0
             }
        }
    ], function (err, result) {
        if (err) {
            res.status(500).send({
                status: 500,
                msg: "Server Error",
                error: err
            })
            return;
        }
        if (!result.length) {
            return res.status(200).send({
                status: 304,
                msg: "No Attendence Found"
            });
        }
        res.status(200).send({
            status: 200,
            msg: "Get Attendences Succesfully",
            data: result
        });
    });
}