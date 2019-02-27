const _ = require('lodash');
const Document = require('../../../../models/Document');
const StudentDocument = require('../../../../models/StudentDocument');
const validate = require('../../Validation/documentByStudent');

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

    if(body.description===""){
        delete body.description;
    }

    record = await Document.findById(body.assignment);
    if (!record) {
        return res.status(400).send({
            status: 304,
            msg: "Assignment Not Found"
        });
    }
    
    record = await StudentDocument.findOne(_.assign(_.pick(body,'assignment'),{ student: req.user._id }));
    if (record) {
        if(record.student != req.user._id){
            return res.status(400).send({
                status: 400,
                msg: "Permission Denied."
            });
        }
        record = await StudentDocument.findOneAndUpdate({_id: record._id},body)
        .then(data => {
            data ? res.status(200).send({
                status: 200,
                data: body,
                msg: 'Assignment Update succesfully'
            }) : res.status(200).send({
                status: 304,
                msg: 'Assignment not found'
            });
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                msg: 'Server Error update',
                error: err
            });
        });
        return;
    }

    body.student = req.user._id;
    record = new StudentDocument(body);

    await record.save()
        .then(data => res.status(200).send({
            data: _.omit(data.toObject(), '__v','student'),
            msg: "Assignment added succesfully",
            status: 200
        }))
        .catch(error => res.status(500).send({
            error: error,
            msg: "Server Error",
            status: 500
        }));
}