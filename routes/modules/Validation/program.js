const Joi = require('joi');
const objectValidator = require('./objectID')

module.exports = async function validate(payload, id = '') {
    const schema = Joi.object().keys({
        programName: Joi.string().required(),
        program: Joi.string().min(2).max(6).required(),
        semester: Joi.number().min(1).max(10).required(),
        description: Joi.string()
    });
    let { error } = Joi.validate(payload, schema);
    console.log(id,await objectValidator(id),id && !await objectValidator(id));
    if (error !== null)
        delete error['isJoi'];
    else if (id && !await objectValidator(id)) {
        return 'Error: id is not valid';
    }
    return error;
}