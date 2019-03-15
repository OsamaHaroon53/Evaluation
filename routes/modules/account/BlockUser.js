const _ = require('lodash');
const Admin = require('../../../models/Admin');
const Teacher = require('../../../models/Teacher');
const Student = require('../../../models/Student');
const validate = require('../Validation/BlockUser')

module.exports = async function (req, res, next) {
    var error = await validate(req.body);
    if (error) {
        return res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }
    
    let { role, block, _id } = req.body;
    let roles = await checkRole(role);
    if (!roles) {
        return res.status(403).send({
            msg: "Permission denied",
            error: "Invalid role",
            status: 403
        });
    }
    roles = await roles.findOneAndUpdate({ _id: _id }, { block: block }).select('-password -__v');
    if (!roles) {
        return res.status(400).send({
            status: 304,
            msg: "User Not Found"
        });
    }
    roles.block = block;
    res.status(200).send({
        status: 200,
        msg: (block ? "Block" : "Unblock") + " User Succesfully",
        data: roles
    });
}

async function checkRole(role) {
    if (role === "admin")
        return Admin;
    else if (role === "teacher")
        return Teacher;
    else if (role === "student")
        return Student;
    else
        return null;
}