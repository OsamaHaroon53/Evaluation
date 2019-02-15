const Joi = require('joi');
const { objectIdValidator } = require('./variable')

module.exports = async function validate(payload, id = '') {
    const schema = Joi.object().keys({
        programName: Joi.string().required(),
        program: Joi.string().min(2).max(6).regex(/^([a-zA-Z]{2,6})$/).required(),
        semester: Joi.number().min(1).max(10).required(),
        shift: Joi.string().valid(['both', 'morning', 'evening']).required(),
        description: Joi.string()
    });
    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    else if (id && !await objectIdValidator(id)) {
        return 'Error: id is not valid';
    }
    return error;
}