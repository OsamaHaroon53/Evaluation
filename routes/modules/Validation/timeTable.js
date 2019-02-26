const Joi = require('joi');
const { objectIdValidator } = require('./variable');

module.exports = async function validate(payload) {
    const schema = Joi.object().keys({
        day: Joi.number().min(0).max(6).required(),
        section: Joi.string().required(),
        startTime: Joi.string().required(),
        endTime: Joi.string().required(),
        course: Joi.string().required(),
        teacher: Joi.string().required(),
        effectiveDate: Joi.number().required(),
        labStartTime: Joi.string(),
        labEndTime: Joi.string(),
        labTeacher: Joi.string()
    });
    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    else if (!await objectIdValidator(payload.course))
        return 'Course is invalid';
    else if (payload.section && !await objectIdValidator(payload.section))
        return 'section is invalid';
    else if (!await objectIdValidator(payload.teacher))
        return 'Teacher is invalid';
    else if (payload.labTeacher && !await objectIdValidator(payload.labTeacher))
        return 'Lab Teacher is invalid';
    return error;
}