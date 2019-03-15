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

    var role = await Code.findOne(_.pick(req.body,['code','email']))
    if(!role){
        return res.status(400).send({
            status: 400,
            msg: "code or email is incorrect or may be expired"
        });
    }
    role = await findUser(role);
    if(!role){
        return res.status(403).send({
            status: 403,
            msg: "User not found"
        });
    }
    
    res.header("X-Auth-Token",await role.generateToken()).status(200).send({
        status: 200,
        msg: 'Code verification successfully',
        data: _.pick(role,'email','name')
    });
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
            code: Joi.string().min(5).max(5).required()
        });
        let { error } = Joi.validate(payload, schema);
        if(error !== null)
            delete error['isJoi'];
        return error;
}