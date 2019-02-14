const Joi = require('joi');
const { objectIdValidator } = require('./variable');

module.exports = async function (payload, id = '') {
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        courseNo: Joi.number().min(100).max(999).required(),
        creditHour: Joi.string().regex(/^(\d{1})$|(^(\d{1})([+]{1})(\d{1})$)/),
        program: Joi.string().required(),
        courseType: Joi.string().valid(['compulsory', 'optional', 'special']).required(),
        preRequisite: Joi.string(),
        content: Joi.string(),
        BookSuggestion: Joi.array().items(Joi.string())
    });

    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    else if (id && !await objectIdValidator(id))
        return 'Error: id is not valid';
    else if (!await objectIdValidator(payload.program))
        return 'Error: program id is not valid';
    else if (payload.preRequisite && !await objectIdValidator(payload.preRequisite))
        return 'Error: preRequisite(id) is not valid';
    return error;
};