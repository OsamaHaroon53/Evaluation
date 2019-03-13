const Joi = require('joi');
const { objectIdValidator } = require('./variable');

module.exports = async function validate(payload, id) {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        fname: Joi.string().required(),
        designation: Joi.string().required(),
        qualification: Joi.string().required(),
        contact_no: Joi.string().allow([""]),
        type: Joi.string().valid(['permenant','visiting']).required(),
        img: Joi.string().allow([""])
    });
    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    else if (id && !await objectIdValidator(id))
        return 'id is not valid';
    return error;
}