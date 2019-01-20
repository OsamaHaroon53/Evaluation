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
    var role = await findUserType(req.body.role);
    role = await role.findOne(_.pick(req.body,'email','password'));
    if(!role){
        return res.status(400).send({
            status: 400,
            msg: "Email or password is incorrect"
        });
    }
    console.log(role);
    res.header("x-auth-token",await role.generateToken()).status(200).send({
        status: 200,
        msg: `login succesfully`,
        data: _.pick(role,'email','name','form_no')
    });
}

async function findUserType(role) {
    if (role === 'admin') {
        return Admin;
    }
    else if (role === 'teacher') {
        return Teacher;
    }
    else if (role === 'student') {
        return Student;
    }
    return null;
}

async function validate(payload){
        const schema = Joi.object().keys({
            email: Joi.string().email().regex(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i).required(),
            role: Joi.string().valid(['admin','teacher','student']).required(),
            password: Joi.string().min(5).max(12).required()
        });
        let { error } = Joi.validate(payload, schema);
        if(error !== null)
            delete error['isJoi'];
        return error;
}