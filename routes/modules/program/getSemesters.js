const Program = require('../../../models/Program');
const { validateGet: validate } =require('../Validation/program')
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

    var record = await Program.find(body).select("semester");
    if (!record || !record.length) {
        return res.status(400).send({
            status: 400,
            msg: "Semesters Not Found"
        });
    }

    res.status(200).send({
        status: 200,
        data: record,
        msg: "Get Semesters successfully"
    });
    
};