const _ = require('lodash');
const Section = require('../../../models/Section');
const Program = require('../../../models/Program');
const validate = require('../Validation/section');

module.exports = async function (req, res, next) {
    var error = await validate(req.body);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }
    var record = await Program.findById(req.body.program);
    if (!record) {
        return res.status(400).send({
            status: 304,
            msg: "Program Not Found"
        });
    }

    record = await Section.findOne(req.body);
    if (record) {
        return res.status(400).send({
            status: 400,
            msg: "Section already exist"
        });
    }

    record = new Section(req.body);

    await record.save()
        .then(data => res.status(200).send({
            data: _.omit(data.toObject(), '__v'),
            msg: "Section added succesfully",
            status: 200
        }))
        .catch(error => res.status(500).send({
            error: error,
            msg: "Server Error",
            status: 500
        }));
}