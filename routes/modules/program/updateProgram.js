const Program = require('../../../models/Program');
const validate= require('../Validation/program');

module.exports = async (req, res) => {
    var { body } = req;
    var { id } = req.params;
    var error = await validate(body,id);
    console.log(error);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }
    await Program.findOneAndUpdate({ _id: id }, body)
        .then(data => {
            console.log(data)
            data ? res.status(200).send({
                status: 200,
                data: (() => {
                    body["_id"] = id;
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