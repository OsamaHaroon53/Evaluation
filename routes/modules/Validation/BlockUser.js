const Joi = require('joi');
const { objectIdValidator } = require('./variable');

module.exports = async function validate(payload) {
    const schema = Joi.object().keys({
        role: Joi.string().valid(["student","admin","teacher"]).required(),
        _id: Joi.string().required(),
        block: Joi.boolean().required()
    });
    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    else if (!await objectIdValidator(payload._id))
        return 'Error: _id is not valid';
    return error;
}