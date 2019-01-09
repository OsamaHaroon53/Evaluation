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
    req.body.password = Math.random().toString(36).substring(5);
    var role = await uniqueEmail(req.body);
    if(!role){
        return res.status(400).send({
            status: 400,
            msg: "Email already exist"
        });
    }

    // save record

    await role.save()
        .then(student => req.body.data = student)
        .catch(error => res.send(error));
    // send mail
    if (req['body']['data']) {
        req.signUp = true;
        req.url = "/admin/sendpassword";
        next();
    }
}

async function uniqueEmail(body) {
    var record = null;
    if (body.role === 'admin') {
        record = await Admin.findOne(_.pick(body,'email'));
        if (record) {
            return null;
        }
        record = _.pick(body, ['email', 'name','password']);
        record = new Admin(record);
    }
    else if (body.role === 'teacher') {
        record = await Teacher.findOne(_.pick(body,'email'));
        if(record){
            return null;
        }
        record = _.pick(body, ['email', 'name','password']);
        record = new Teacher(record);
    }
    else if (body.role === 'student') {
        record = await Student.findOne(_.pick(body,'email'));
        if(record){
            return null;
        }
        record = _.pick(body, ['email', 'form_no','password']);
        record = new Admin(record);
    }
    return record;
}

async function validate(payload){
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            form_no: Joi.number(),
            role: Joi.string().valid(['admin','teacher','student']).required(),
            name: Joi.string()
        }).xor('form_no','name');
        let { error } = Joi.validate(payload, schema);
        if(error !== null)
            delete error['isJoi'];
        return error;
}