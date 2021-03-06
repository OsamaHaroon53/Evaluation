const Teacher = require('../../../models/Teacher');
const validate = require('../Validation/teacher');

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
    if(body.contact_no === ""){
        delete body.contact_no;
    }
    var record = await Teacher.findById(id);
    if (!record) {
        return res.status(400).send({
            status: 304,
            msg: "Program Not Found"
        });
    }

    if(record.isActive === 'sent')
        body.isActive = 'active';
    
    await Teacher.findOneAndUpdate({ _id: id }, body)
        .then(data => {
            data ? res.status(200).send({
                status: 200,
                data: (() => {
                    body["_id"] = id;
                    return body;
                })(),
                msg: 'Teacher Update succesfully'
            }) : res.status(200).send({
                status: 304,
                msg: 'Teacher not found'
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