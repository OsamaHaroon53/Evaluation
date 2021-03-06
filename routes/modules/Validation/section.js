const Joi = require('joi');
const { objectIdValidator } = require('./variable');

module.exports = async function validate(payload, id = '') {
    const schema = Joi.object().keys({
        program: Joi.string().required(),
        section: Joi.string().min(1).max(3).required()
    });
    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    else if (id && !await objectIdValidator(id))
        return 'Error: id is not valid';
    else if (!await objectIdValidator(payload.program))
        return 'Error: program id is not valid';
    return error;
}