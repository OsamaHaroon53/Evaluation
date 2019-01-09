var nodemailer = require("nodemailer");
const Admin = require('../../../models/Admin');
const Teacher = require('../../../models/Teacher');
const Student = require('../../../models/Student');
const _ = require('lodash');


/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secureConnection: true,
    auth: {
        user: "",
        pass: ""
    }
});

module.exports = async function (req, res) {

    var role = req.body.role;
    if (!req['signUp']) {
        req.body.password = await getPassword(role, _.pick(req.body, "email"));
        if (!req.body.password) {
            return res.status(400).send({
                status: 400,
                msg: "Bad Request"
            });
        }
    }
    var mailOptions = {
        to: req.body.email,
        subject: "UBIT - Account Created",
        text: ` Email: ${req.body.email}\n password: ${req.body.password}`
    }
    try {
        let mail = await smtpTransport.sendMail(mailOptions);
        console.log(mailOptions, mail);
        if (mail) {
            let msg = req['signUp'] ? "signUp and mail send successfully" : "mail send successfully";
            let record = await Update(role, _.pick(req.body, "email"));
            if (record) {
                return res.status(200).send({
                    status: 200,
                    msg: msg,
                    data: _.pick(record, 'email', 'name', 'form_no', 'isActive')
                });
            }
            else {
                return res.status(400).send({
                    status: 500,
                    msg: "Email has been sent but record not updated",
                    data: _.pick(req.body, 'email', 'name', 'form_no')
                });
            }
        }
        else {
            if (req['signUp']) {
                res.status(200).send({
                    status: 200,
                    msg: "signUp Succesfully and mail Not send",
                    data: _.pick(req.body.data, 'email', 'name', 'form_no')
                });
            }
            else {
                res.status(400).send({
                    status: 400,
                    msg: "mail Not send",
                    data: _.pick(req.body, 'email')
                });
            }
        }
    }
    catch (ex) {
        console.log(ex)
        if (req['signUp']) {
            res.status(200).send({
                status: 500,
                msg: "signUp Succesfully and mail Not send",
                data: _.pick(req.body.data, 'email'),
                error: ex
            });
        }
        else {
            res.status(500).send({
                status: 500,
                msg: "server Error",
                error: ex
            });
        }
    }
};

async function getPassword(role, email) {
    var record;
    if (role === 'admin') {
        record = await Admin.findOne(email)
    }
    else if (role === 'teacher') {
        record = await Teacher.findOne(email)
    }
    else if (role === 'student') {
        record = await Student.findOne(email)
    }
    if (record) {
        return record['password'];
    }
    return false;
}

async function Update(role, email) {
    var record = null;
    if (role === 'admin') {
        record = await Admin.findOneAndUpdate(email, { isActive: 'sent' })
    }
    else if (role === 'teacher') {
        record = await Teacher.findOneAndUpdate(email, { isActive: 'sent' })
    }
    else if (role === 'student') {
        record = await Student.findOneAndUpdate(email, { isActive: 'sent' })
    }
    if (record) {
        record.isActive = 'sent';
    }
    return record;
}

