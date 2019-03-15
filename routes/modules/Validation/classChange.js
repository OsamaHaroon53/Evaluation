const Joi = require('joi');
const { objectIdValidator } = require('./variable');

module.exports = async function (payload) {
    const schema = Joi.object().keys({
        section: Joi.string().required(),
        students: Joi.array().items(
            Joi.object().keys({
                _id: Joi.string().required()
            }).required()
        ).required(),
        batch: Joi.number().required()
    });

    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    else if (!await objectIdValidator(payload.section))
        return 'Error: section id is not valid';

    return error;
};