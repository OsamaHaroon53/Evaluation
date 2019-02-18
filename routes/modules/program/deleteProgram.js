const Program = require('../../../models/Program');
const { validateDelete: validate } = require('../Validation/program');

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
    record = await Program.deleteMany(body);
    if(record['ok'] == 1 && !record['n']){
        return res.status(400).send({
            status: 400,
            msg: "Program Not Found"
        });
    }
    if(record['ok'] == 1 && record['n']){
        return res.status(200).send({
            status: 200,
            msg: "Program Delete Successfully",
            data: record
        });
    }
    res.status(500).send({
        status: 500,
        msg: "Server Error",
        error: record
    });
};