const Joi = require('joi');
const { objectIdValidator } = require('./variable');

async function validate(payload) {
    const schema = Joi.object().keys({
        programName: Joi.string().required(),
        program: Joi.string().min(2).max(6).regex(/^([a-zA-Z]{2,6})$/).required(),
        semesters: Joi.number().min(1).max(10).required(),
        shift: Joi.string().valid(['both', 'morning', 'evening']).required()
    });
    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    return error;
}

async function validatePut(payload) {
    const schema = Joi.object().keys({
        programNameOld: Joi.string().required(),
        programOld: Joi.string().min(2).max(6).regex(/^([a-zA-Z]{2,6})$/).required(),
        programName: Joi.string().required(),
        program: Joi.string().min(2).max(6).regex(/^([a-zA-Z]{2,6})$/).required(),
        semesters: Joi.number().min(1).max(10).required(),
        shift: Joi.string().valid(['both', 'morning', 'evening']).required()
    });
    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    return error;
}

async function validateDelete(payload) {
    const schema = Joi.object().keys({
        programName: Joi.string().required(),
        program: Joi.string().min(2).max(6).regex(/^([a-zA-Z]{2,6})$/).required()
    });
    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    return error;
}

async function validateGet(payload) {
    const schema = Joi.object().keys({
        program: Joi.string().min(2).max(6).regex(/^([a-zA-Z]{2,6})$/).required(),
        shift: Joi.string().valid(['morning', 'evening']).required()
    });
    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    return error;
}
module.exports = {
    validate,
    validatePut,
    validateDelete,
    validateGet
}