const Joi = require('joi');
const { objectIdValidator } = require('./variable');

module.exports = async function validate(payload) {
    const schema = Joi.object().keys({
        document: Joi.array().items(Joi.string().required()).required(),
        assignment: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().allow([""])
    });
    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    else if (!await objectIdValidator(payload.assignment))
        return 'Error: Assignment id is Invalid.';
    return error;
}