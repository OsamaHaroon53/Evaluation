var nodemailer = require("nodemailer");
const Admin = require('../../../models/Admin');
const Teacher = require('../../../models/Teacher');
const Student = require('../../../models/Student');
const _ = require('lodash');
const Joi = require('joi');
const config = require('config');
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secureConnection: true,
    auth: {
        user: config.get('Guser'),
        pass: config.get('Gpass')
    }
});

module.exports = async function (req, res) {
    if (!req['signUp']) {
        let error = await validate(req.body);
        if (error) {
            return res.status(402).send({
                status: 402,
                error: error,
                msg: "Validation Error"
            });
        }
    }
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
    // return res.send('ok');
    var mailOptions = {
        to: req.body.email,
        subject: "UBIT - Account Created",
        // text: ` Email: ${req.body.email}\n password: ${req.body.password}`
        html: `
                <div style="text-align:center;">
                    <h3>Welcome to UBIT!</h3>
                    <p>Your account has been Created</p><br />
                    <div><img width="300px" src="cid:UBIT"/></div><br /><br />
                    <div><strong>Email:</strong> <span style="padding:10px 5px;border: 1px solid grey;">${req.body.email}</span></div>
                    <br /> <br />
                    <div><strong>password:</strong> <span style="padding:8px 5px;border: 1px solid grey;">${req.body.password}</span></div><br />
                </div>`,
        attachments: [{
            filename: 'UBITImage.jpg',
            path: process.cwd() + '/images/UBITImage.jpg',
            cid: 'UBIT' //same cid value as in the html img src
        }]
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

async function validate(payload) {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        role: Joi.string().valid(['admin', 'teacher', 'student']).required()
    });
    let { error } = Joi.validate(payload, schema);
    console.log('error', error);
    if (error !== null)
        delete error['isJoi'];
    return error;
}