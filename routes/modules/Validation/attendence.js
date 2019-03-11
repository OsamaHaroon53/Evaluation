const Joi = require('joi');
const { objectIdValidator } = require('./variable');

module.exports = async function (payload) {
    const schema = Joi.object().keys({
        class: Joi.string().required(),
        attendence: Joi.array().items(
            Joi.object().keys({
                studentID: Joi.string().required(),
                status: Joi.boolean().required()
            }).required()
        ).required(),
        date: Joi.number().required(),
        isTheory: Joi.boolean()
    });

    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    else if (!await objectIdValidator(payload.class))
        return 'Error: class id is not valid';

    return error;
};