const Program = require('../../../models/Program');

module.exports = async function (req, res) {
    await Program.aggregate([
        {
            $group: {
                _id: { program: "$program", programName: "$programName" },
                semesters: { $sum: 1 },
                shift: {$addToSet: "$shift"}
            }
        },
        {
            $project: { 
                program: "$_id.program",
                ProgramName: "$_id.programName",
                semesters: { $divide: [ "$semesters", { $size: "$shift"} ] },
                shift: {
                    $cond: { if: { $ne: [{ $size: "$shift"},1] }, then: "both", else: { $arrayElemAt: [ "$shift", 0 ] } }
                },
            }
        },
        {
            $project: {
                _id: 0,
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
        res.status(200).send({
            status: 200,
            msg: "Get Programs Succesfully",
            data: result
        });
    });
}