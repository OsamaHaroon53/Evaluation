const _ = require('lodash');
const Timetable = require('../../../../models/Timetable');
const Document = require('../../../../models/Document');
const validate = require('../../Validation/documentTeacher');

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

    record = await Timetable.findById(body.class);
    if (!record) {
        return res.status(400).send({
            status: 304,
            msg: "Class Not Found"
        });
    }
    body.type = 1;
    record = await Document.findOne(_.pick(body,'class','type'));
    if (record) {
        if(record.teacher != req.user._id){
            return res.status(400).send({
                status: 400,
                msg: "Permission Denied."
            });
        }
        record = await Document.findOneAndUpdate({_id: record._id},body)
        .then(data => {
            data ? res.status(200).send({
                status: 200,
                data: (() => {
                    body["teacher"] = req.user._id;
                    return body;
                })(),
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

    body.teacher = req.user._id;
    record = new Document(body);

    await record.save()
        .then(data => res.status(200).send({
            data: _.omit(data.toObject(), '__v','teacher','type'),
            msg: "Assignment added succesfully",
            status: 200
        }))
        .catch(error => res.status(500).send({
            error: error,
            msg: "Server Error",
            status: 500
        }));
}