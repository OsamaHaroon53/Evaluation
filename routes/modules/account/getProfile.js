const _ = require('lodash');
const Admin = require('../../../models/Admin');
const Teacher = require('../../../models/Teacher');
const Student = require('../../../models/Student');

module.exports = async function (req, res, next) {
    let role = await checkRole(req.user.role);
    if(!role){
        return res.status(403).send({
            msg: "Permission denied",
            error: "Invalid role",
            status: 403
        });
    }
    role = await role.findById(req.user._id).select('-password -__v');
    if(!role){
        return res.status(400).send({
            status: 304,
            msg: "Profile Not Found"
        });
    }
    res.status(200).send({
        status: 200,
        msg: "Get Profile Succesfully",
        data: role
    });
}

async function checkRole(role){
    if(role === 1)
        return Admin;
    else if(role === 2)
        return Teacher;
    else if(role === 3)
        return Student;
    else
        return null;
}