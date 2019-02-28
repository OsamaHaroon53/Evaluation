const _ = require('lodash');
const TimeTable = require('../../../models/Timetable');
const Query = require('../../../models/Query');
const validate = require('../Validation/query');

module.exports = async function (req, res, next) {
    var { body } = req;
    var error = await validate(body);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }

    record = await TimeTable.findById(body.teacher);
    if (!record) {
        return res.status(400).send({
            status: 304,
            msg: "Course Detail Not Found"
        });
    }

    body.student = req.user._id;
    record = new Query(body);

    await record.save()
        .then(data => res.status(200).send({
            data: _.omit(data.toObject(), '__v','student'),
            msg: "Query added succesfully",
            status: 200
        }))
        .catch(error => res.status(500).send({
            error: error,
            msg: "Server Error",
            status: 500
        }));
}