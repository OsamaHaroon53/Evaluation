const Joi = require('joi');
const { objectIdValidator } = require('./variable');

module.exports = async function validate(payload, id) {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        fname: Joi.string().required(),
        enrolnment_no: Joi.string().allow([""]),
        ep_no: Joi.string().required(),
        phone_no: Joi.string().allow([""]),
        batch: Joi.number().min(1995).max(9999),
        section: Joi.string(),
        img: Joi.string()
    });
    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    else if (id && !await objectIdValidator(id))
        return 'id is not valid';
    else if (payload.section && !await objectIdValidator(payload.section))
        return 'Section is not valid';
    return error;
}