const Joi = require('joi');
const { objectIdValidator } = require('./variable');

module.exports = async function validate(payload) {
    const schema = Joi.object().keys({
        teacher: Joi.string().required(),
        title: Joi.string().required(),
        query: Joi.string().required()
    });
    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    else if (!await objectIdValidator(payload.teacher))
        return 'Error: Timetable id is Invalid.';
    return error;
}