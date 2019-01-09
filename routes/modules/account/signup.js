const _ = require('lodash');
const Admin = require('../../../models/Admin');
const Teacher = require('../../../models/Teacher');
const Student = require('../../../models/Student');

module.exports = async function (req, res, next) {
    var role = req.body.role;
    req.body.password = Math.random().toString(36).substring(5);
    if (role === 'admin') {
        let admin = await Admin.findOne(_.pick(req.body, "email"))
        if (admin) {
            return res.status(400).send({
                status: 400,
                msg: "Admin already exist"
            });
        }
        admin = _.pick(req.body, ['email', 'name']);
        admin.password = req.body.password;
        role = new Admin(admin);
    }
    else if (role === 'teacher') {
        let teacher = await Teacher.findOne(_.pick(req.body, "email"))
        if (teacher) {
            return res.status(400).send({
                status: 400,
                msg: "Teacher already exist"
            });
        }
        teacher = _.pick(req.body, ['email', 'name']);
        teacher.password = req.body.password;
        role = new Teacher(teacher);
    }
    else if (role === 'student') {
        let student = await Student.findOne(_.pick(req.body, "email"))
        if (student) {
            return res.status(400).send({
                status: 400,
                msg: "Student already exist"
            });
        }
        student = _.pick(req.body, ['email', 'form_no']);
        student.password = req.body.password;
        role = new Student(student);
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
        req.signUp = true;
        req.url = "/admin/sendpassword";
        next();
    }
}