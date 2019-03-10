const Joi = require('joi');
const { objectIdValidator } = require('./variable');

module.exports = async function (payload) {
    const schema = Joi.object().keys({
        course: Joi.string().required(),
        availability: Joi.number().min(1).max(5).required(),
        clearityOfSpeech: Joi.number().min(1).max(5).required(),
        explanation: Joi.number().min(1).max(5).required(),
        questionResponse: Joi.number().min(1).max(5).required(),
        teachingStyle: Joi.number().min(1).max(5).required(),
        subjectKnowledge: Joi.number().min(1).max(5).required(),
        comments: Joi.string().allow([""]),
        isTheory: Joi.boolean()
    });

    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    else if (!await objectIdValidator(payload.course))
        return 'Error: course id is not valid';
    return error;
};