const Program = require('../../../models/Program');

module.exports = async function (req, res) {
    await Program.aggregate([
        {
            $group: {
                _id: { program: "$program", programName: "$programName", shift: "$shift" },
                semesters: { $addToSet: { semesterNo: "$semester", _id: "$_id" } }
            }
        },
        {
            $project: { 
                program: "$_id.program",
                programName: "$_id.programName",
                shift: "$_id.shift",
                semesters: "$semesters",
                _id: 0 
            }
        },
        {
            $group: {
                _id: { program: "$program", programName: "$programName"},
                shifts: { $addToSet: { shift: "$shift", semesters: "$semesters" } }
            }
        },
        {
            $addFields: { program: "$_id.program", programName: "$_id.programName"}
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