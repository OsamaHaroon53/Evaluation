const _ = require('lodash');
const Admin = require('../../../models/Admin');
const Teacher = require('../../../models/Teacher');
const Student = require('../../../models/Student');
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
            msg: "Email or password is incorrect"
        });
    }
    res.status(200).send({
        status: 200,
        msg: `${req.body.role} login succesfully`,
        data: role
    });
}

async function findUser(body) {
    var record = null;
    if (body.role === 'admin') {
        record = await Admin.findOne(_.pick(body,'email','password')).select('-_id -__v -password');
    }
    else if (body.role === 'teacher') {
        record = await Teacher.findOne(_.pick(body,'email','password')).select('-_id -__v -password');
    }
    else if (body.role === 'student') {
        record = await Student.findOne(_.pick(body,'email','password')).select('-_id -__v -password');
    }
    return record;
}

async function validate(payload){
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            role: Joi.string().valid(['admin','teacher','student']).required(),
            password: Joi.string().required()
        });
        let { error } = Joi.validate(payload, schema);
        if(error !== null)
            delete error['isJoi'];
        return error;
}