const _ = require('lodash');
const Program = require('../../../models/Program');
const { validate } = require('../Validation/program');

module.exports = async function (req, res, next) {
    var { body } = req;
    var error = await validate(body);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }
    var record = await Program.findOne(_.pick(body, 'program'));
    if (record) {
        return res.status(400).send({
            status: 400,
            msg: "Program already exist"
        });
    }

    if (body.shift === "both") {
        record = _.range(1, body.semesters + 1).map(s => _.assign(_.omit(body, "semesters"), { semester: s }, { shift: "morning" }));
        let clone = _.cloneDeep(record)
        record = [...clone, ...record.map(p => _.assign(p, { shift: "evening" }))]
    }
    else
        record = _.range(1, body.semesters + 1).map(s => _.assign({ semester: s }, _.omit(body, "semesters")));

    await Program.insertMany(record)
        .then(data => res.status(200).send({
            data: data,
            msg: "Program added succesfully",
            status: 200
        }))
        .catch(error => res.status(500).send({
            error: error,
            msg: "Server Error",
            status: 500
        }));
}