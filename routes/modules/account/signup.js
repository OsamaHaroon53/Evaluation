const _ = require('lodash');
const Admin = require('../../../models/Admin');
const Teacher = require('../../../models/Teacher');
const Student = require('../../../models/Student');

module.exports = async function (req, res, next) {
    var role = req.body.role;
    if (role === 'admin') {
        let admin = await Admin.findOne(_.pick(req.body, "email"))
        if (admin) {
            return res.status(400).send({
                status: 400,
                msg: "Admin already exist"
            });
        }
        role = new Admin(_.pick(req.body, ['email', 'password', 'name']))
    }
    else if (role === 'teacher') {
        let teacher = await Teacher.findOne(_.pick(req.body, "email"))
        if (teacher) {
            return res.status(400).send({
                status: 400,
                msg: "Teacher already exist"
            });
        }
        role = new Teacher(_.pick(req.body, ['email', 'password', 'name']))
    }
    else if (role === 'student') {
        let student = await Student.findOne(_.pick(req.body, "email"))
        if (student) {
            return res.status(400).send({
                status: 400,
                msg: "Student already exist"
            });
        }
        role = new Student(_.pick(req.body, ['email', 'password', 'form_no']))
    }
    else {
        return res.status(400).send({
            status: 402,
            msg: "role is Invalid or empty"
        });
    }
    // save record

    await role.save()
        .then(student => req.body.data = student)
        .catch(error => res.send(error));
    // send mail
    if (req['body']['data']) {
        req.body.password = req.body.data.password;
        req.signUp = true;
        req.url = "/admin/sendpassword";
        next();
    }
}