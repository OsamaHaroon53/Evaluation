const Joi = require('joi');

var validatePost = function(payload) {
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        courseNo: Joi.number().min(100).max(999).required(),
        creditHour: Joi.string().regex(/^(\d{1})$|(^(\d{1})([+]{1})(\d{1})$)/),
        program: Joi.string().valid(['BSSE', 'BSCS', 'MCS', 'PGD', 'MS', 'Phd']).required(),
        semester: Joi.number().min(1).max(8).required(),
        courseType: Joi.string().valid(['compulsory', 'optional', 'special']).required(),
        preRequisite: Joi.string(),
        content: Joi.string(),
        BookSuggestion: Joi.array().items(Joi.string())
    });

    let error = Joi.validate(payload, schema);
    if(error['error'] !== null)
        delete error['error']['isJoi'];
    return error;
};

var validatePut = function(payload) {
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        courseNo: Joi.string().min(6).max(10).regex(/^((MSCS)|(CS)|(CS[(]SE[)])|(BSCS)|(PGD))([-]{1})(\d{3})$/).required(),
        creditHour: Joi.string().regex(/^(\d{1})$|(^(\d{1})([+]{1})(\d{1})$)/),
        program: Joi.string().valid(['BSSE', 'BSCS', 'MCS', 'PGD', 'MS', 'Phd']).required(),
        semester: Joi.number().min(1).max(8).required(),
        courseType: Joi.string().valid(['compulsory', 'optional', 'special']).required(),
        preRequisite: Joi.string().allow(null).required(),
        content: Joi.string().required(),
        BookSuggestion: Joi.array().items(Joi.string()).required()
    });

    let error = Joi.validate(payload, schema);
    if(error['error'] !== null)
        delete error['error']['isJoi'];
    return error;
}; 
module.exports = { validatePost, validatePut }