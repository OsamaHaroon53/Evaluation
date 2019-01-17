const Student = require('../../../models/Student');
const Joi = require('joi');

module.exports = async function (req, res, next) {
    var error = await validate(req.query);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }
    count = await Student.estimatedDocumentCount();
    var limit = parseInt(req.query.limit);
    var start = req.query.page?parseInt(req.query.page)*limit:0;
    if(count<=start){
        return res.send({
            status: 304,
            msg: "Data Not Found"
        })
    }
    var student = await Student.find().select('-password -__v').sort('_id').limit(limit).skip(start);
    if (!student.length) {
        return res.status(200).send({
            status: 304,
            msg: "students Not Found"
        });
    }
    res.status(200).send({
        status: 200,
        msg: "Get students Succesfully",
        data: student,
        pagesAvailable: Math.ceil(count/limit)
    });
}

async function validate(payload){
    const schema = Joi.object().keys({
        page: Joi.string().regex(/^[0-9]+$/).required(),
        limit: Joi.string().regex(/^[0-9]+$/).required()
    });
    let { error } = Joi.validate(payload, schema);
    if(error !== null)
        delete error['isJoi'];
    return error;
}