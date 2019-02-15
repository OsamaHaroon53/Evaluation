const Student = require('../../../models/Student');
const Section = require('../../../models/Section');
const validate = require('../Validation/student');

module.exports = async (req, res) => {
    var { body } = req;
    var { _id: id } = req.user;

    var error = await validate(body,id);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }

    var record = await Section.findById(body.section);
    if (!record) {
        return res.status(400).send({
            status: 304,
            msg: "Section is Invalid"
        });
    }

    var record = await Student.findById(id);
    if (!record) {
        return res.status(400).send({
            status: 304,
            msg: "Program Not Found"
        });
    }

    if(record.isActive === 'sent')
        body.isActive = 'active';
    
    await Student.findOneAndUpdate({ _id: id }, body)
        .then(data => {
            console.log(data)
            data ? res.status(200).send({
                status: 200,
                data: (() => {
                    body["_id"] = id;
                    return body;
                })(),
                msg: 'Student Update succesfully'
            }) : res.status(200).send({
                status: 304,
                msg: 'Student not found'
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