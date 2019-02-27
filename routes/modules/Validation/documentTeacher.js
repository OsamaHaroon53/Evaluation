const Joi = require('joi');
const { objectIdValidator } = require('./variable');

module.exports = async function validate(payload) {
    const schema = Joi.object().keys({
        document: Joi.array().items(Joi.string().required()).required(),
        class: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().allow([""])
    });
    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    else if (!await objectIdValidator(payload.class))
        return 'Error: Class is not valid';
    return error;
}