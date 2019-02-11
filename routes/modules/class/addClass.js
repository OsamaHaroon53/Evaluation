const _ = require('lodash');
const Class = require('../../../models/Class');
const Joi = require('joi');

module.exports = async function (req, res, next) {
    var error = await validate(req.body);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }
    var record = await Class.findOne(req.body);
    if(record){
        return res.status(400).send({
            status: 400,
            msg: "Class already exist"
        });
    }

    record = new Class(req.body);

    await record.save()
        .then(data => res.status(200).send({
            data: _.omit(data.toObject(),'__v'),
            msg: "Class added succesfully",
            status: 200
        }))
        .catch(error => res.status(500).send({
            error: error,
            msg: "Server Error",
            status: 500
        }));
}

async function validate(payload){
        const schema = Joi.object().keys({
            program: Joi.string().required(),
            semester: Joi.number().min(1).max(8).required(),
            section: Joi.string().min(1).max(3)
        });
        let { error } = Joi.validate(payload, schema);
        if(error !== null)
            delete error['isJoi'];
        return error;
}