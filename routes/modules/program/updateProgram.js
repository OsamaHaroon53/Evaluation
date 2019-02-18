const Program = require('../../../models/Program');
const { validatePut: validate } = require('../Validation/program');
const _ = require('lodash');


module.exports = async (req, res,next) => {
    var { body } = req;
    var error = await validate(body);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }
    record = await Program.deleteMany({ programName: body.programNameOld, program: body.programOld });
    if(record['ok'] == 1 && !record['n']){
        return res.status(400).send({
            status: 400,
            msg: "Program Not Found"
        });
    }
    if(record['ok'] == 1 && record['n']){
        req.body = _.omit(body, "programNameOld", "programOld");
        req.url = "/program/add";
        next();
        return;
    }
    res.send({
        status: 500,
        msg: "Server Error",
        error: record
    });
};