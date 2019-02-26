const _ = require('lodash');
const Admin = require('../../../models/Admin');
const Teacher = require('../../../models/Teacher');
const Student = require('../../../models/Student');
const Joi = require('joi');

module.exports = async function (req, res) {
    var error = await validate(req.body);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }
    var role = await findRole(req.user.role);
    if(!role){
        return res.status(401).send({
            msg: "Invalid user",
            status: 401
        });
    }
    role = await role.findOneAndUpdate({
        _id: req.user._id,
        password: req.body.oldPassword
    },{password: req.body.password}).select('email name -_id');
    if(!role){
        return res.status(401).send({
            msg: "Invalid password",
            status: 401
        });
    }
    res.status(200).send({
        msg: "password change successfully",
        status: 200,
        data: role
    })
}

async function findRole(role) {
    if(role == 1){
        return Admin;
    }
    else if(role == 2){
        return Teacher;
    }
    else if(role == 3){
        return Student;
    }
    else{
        return null;
    }
}

async function validate(payload){
        const schema = Joi.object().keys({
            password: Joi.string().min(5).max(12).required(),
            oldPassword: Joi.string().required()
        });
        let { error } = Joi.validate(payload, schema);
        if(error !== null)
            delete error['isJoi'];
        return error;
}