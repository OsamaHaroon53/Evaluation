const _ = require('lodash');
const Program = require('../../../models/Program');
const validate= require('../Validation/program');

module.exports = async function (req, res, next) {
    var error = await validate(req.body);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }
    var record = await Program.findOne(_.omit(req.body, 'programName description'));
    if (record) {
        return res.status(400).send({
            status: 400,
            msg: "Program already exist"
        });
    }

    record = new Program(req.body);

    await record.save()
        .then(data => res.status(200).send({
            data: _.omit(data.toObject(), '__v'),
            msg: "Program added succesfully",
            status: 200
        }))
        .catch(error => res.status(500).send({
            error: error,
            msg: "Server Error",
            status: 500
        }));
}