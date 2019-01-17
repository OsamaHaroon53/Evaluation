const _ = require('lodash');
const Admin = require('../../../models/Admin');
const Teacher = require('../../../models/Teacher');
const Student = require('../../../models/Student');
const Code = require('../../../models/VerificationCode');
const Joi = require('joi');

module.exports = async function (req, res, next) {
    var error = await validate(req.body);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }
    var role = await findUser(req.body);
    if(!role){
        return res.status(400).send({
            status: 400,
            msg: "Email is incorrect"
        });
    }
    req.text = {
        email: req.body.email,
        code: Math.random().toString(36).substring(7),
        role: req.body.role
    }
    role = new Code(req.text);
    await role.save()
        .then(response => {
            req.url = "/sendcode";
            next();
        })
        .catch(error => res.status(500).send({
            status: 500,
            msg: "code sending fail",
            error: error
        }));
}

async function findUser(body) {
    var record = null;
    if (body.role === 'admin') {
        record = await Admin.findOne(_.pick(body,'email'));
    }
    else if (body.role === 'teacher') {
        record = await Teacher.findOne(_.pick(body,'email'));
    }
    else if (body.role === 'student') {
        record = await Student.findOne(_.pick(body,'email'));
    }
    return record;
}

async function validate(payload){
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            role: Joi.string().valid(['admin','teacher','student']).required()
        });
        let { error } = Joi.validate(payload, schema);
        if(error !== null)
            delete error['isJoi'];
        return error;
}