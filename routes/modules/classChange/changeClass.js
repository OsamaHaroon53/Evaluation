const _ = require('lodash');
const Student = require('../../../models/Student');
const Section = require('../../../models/Section');
const validate = require('../Validation/classChange');

module.exports = async function (req, res, next) {
    var error = await validate(req.body);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }

    var record = await Section.findById(req.body.section);
    if (!record) {
        return res.status(400).send({
            status: 304,
            msg: "Section Not Found"
        });
    }

    record = await Student.updateMany({ $or: req.body.students }, _.pick(req.body, 'section', 'batch'));
    if(!record.ok){
        res.status(500).send({
            error: record,
            msg: "server error",
            status: 500
        })
    }
    if (record.ok && record.nModified)
        return res.status(200).send({
            status: 200,
            data: record.n+ ' Student updated',
            msg: "successfully change Classes"
        });
    return res.status(400).send({
        status: 400,
        msg: "Fail to update all students",
        error: record
    });
}