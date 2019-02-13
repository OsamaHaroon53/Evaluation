const Program = require('../../../models/Program');

module.exports = async function (req, res) {
    await Program.aggregate([
        {
            $group: {
                _id: "$program",
                semesters: { $addToSet: { semesterNo: "$semester", _id: "$_id" } }
            }
        },
        {
            $addFields: { program: "$_id" }
        },
        {
            $project: { _id: 0 }
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
        res.status(200).send({
            status: 200,
            msg: "Get Programs Succesfully",
            data: result
        });
    });
}