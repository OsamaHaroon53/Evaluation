const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Admin = require('../../../models/Admin');
const Teacher = require('../../../models/Teacher');
const Student = require('../../../models/Student');

module.exports = async function (req, res) {
    role = req.body.role;
    if (role === 'admin') {
        let admin = await Admin.findOne(_.pick(req.body, "email"))
        if (admin) {
            return res.status(400).send("Admin already exist")
        }
        admin = new Admin(_.pick(req.body, ['email', 'password', 'name']))
        admin = await admin.save();
        res.send(admin);
    }
    else if (role === 'teacher') {
        let teacher = await Teacher.findOne(_.pick(req.body, "email"))
        if (teacher) {
            return res.status(400).send("Teacher already exist")
        }
        teacher = new Teacher(_.pick(req.body, ['email', 'password', 'name']))
        teacher = await teacher.save();
        res.send(teacher);
    }
    else if (role === 'student') {
        let student = await Student.findOne(_.pick(req.body, "email"))
        if (student) {
            return res.status(400).send("Student already exist")
        }
        student = new Student(_.pick(req.body, ['email', 'password', 'form_no']))
        await student.save()
            .then(student => res.send(student))
            .catch(error => res.send(error));
    }
    else {
        res.status(400).send('else');
    }
}