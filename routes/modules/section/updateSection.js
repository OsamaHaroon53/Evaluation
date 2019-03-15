const Section = require('../../../models/Section');
const Program = require('../../../models/Program');
const validate = require('../Validation/section');

module.exports = async (req, res) => {
    var { body } = req;
    var { id } = req.params;
    var error = await validate(body,id);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }
    var record = await Program.findById(body.program);
    if (!record) {
        return res.status(400).send({
            status: 304,
            msg: "Program Not Found"
        });
    }
    await Section.findOneAndUpdate({ _id: id }, body)
        .then(data => {
            data ? res.status(200).send({
                status: 200,
                data: (() => {
                    body["_id"] = id;
                    return body;
                })(),
                msg: 'Section Update succesfully'
            }) : res.status(200).send({
                status: 304,
                msg: 'Section not found'
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