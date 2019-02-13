const Section = require('../../../models/Section');
const { Types } = require('mongoose');

module.exports = async function (req, res, next) {
    await Section.aggregate([
        {
            $match: {
                program: Types.ObjectId(req.params.id)
            }
        },
        {
            $group: {
                _id: "$program",
                sections: { $addToSet: { section: "$section", _id: "$_id" } }
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