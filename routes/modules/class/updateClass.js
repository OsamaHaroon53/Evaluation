const Class = require('../../../models/Class');
const Joi = require('joi');

module.exports = async (req, res) => {
    var { body } = req;
    var error = await validate(body);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }
    await Class.findOneAndUpdate({ _id: req.params.id }, body)
        .then(data => {
            console.log(data)
            data ? res.status(200).send({
                status: 200,
                data: (() => {
                    body["_id"] = req.params.id;
                    return body;
                })(),
                msg: 'Data Update succesfully'
            }) : res.status(200).send({
                status: 304,
                msg: 'Data not found'
            });
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                msg: 'Server Error',
                error: err
            });
        });
};

async function validate(payload) {
    const schema = Joi.object().keys({
        program: Joi.string().required(),
        semester: Joi.number().min(1).max(8).required(),
        section: Joi.string().min(1).max(3)
    });
    let { error } = Joi.validate(payload, schema);
    if (error !== null)
        delete error['isJoi'];
    return error;
}