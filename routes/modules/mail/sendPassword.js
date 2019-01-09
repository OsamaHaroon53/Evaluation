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
    auth: {
        user: "ubitad436@gmail.com",
        pass: "asdf9876;l"
    }
});

module.exports = async function (req, res) {

    var role = req.body.role;
    if (!req['signUp']) {
        req.body.password = await getPassword(role,_.pick(req.body, "email"));
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

            if (role === 'admin') {
                let admin = await Admin.findOneAndUpdate(_.pick(req.body, "email"), { isActive: 'sent' })
                if (admin) {
                    return res.status(200).send({
                        status: 200,
                        msg: "signUp and mail send successfully",
                        data: _.pick(req.body.data, 'email', 'name', 'isActive')
                    });
                }
                return res.status(200).send("signUp and mail send successfully");
            }
            else if (role === 'teacher') {
                let teacher = await Teacher.findOneAndUpdate(_.pick(req.body, "email"), { isActive: 'sent' })
                if (teacher) {
                    return res.status(400).send({
                        status: 200,
                        msg: "signUp and mail send successfully",
                        data: _.pick(req.body.data, 'email', 'name', 'isActive')
                    });
                }
            }
            else if (role === 'student') {
                let student = await Student.findOneAndUpdate(_.pick(req.body, "email"), { isActive: 'sent' })
                if (student) {
                    return res.status(400).send({
                        status: 200,
                        msg: "signUp and mail send successfully",
                        data: _.pick(req.body, 'email', 'form_no', 'isActive')
                    });
                }
            }
            else {
                return res.status(200).send({
                    status: 200,
                    msg: "mail send successfully",
                    data: _.pick(req.body, 'email')
                });
            }
        }
        else {
            if (req['signUp']){
                res.status(200).send({
                    status: 200,
                    msg: "signUp Succesfully and mail Not send",
                    data: _.pick(req.body.data, 'email', 'isActive')
                });
            }
            else{
                res.status(400).send({
                    status: 400,
                    msg: "mail Not send",
                    data: _.pick(req.body, 'email')
                });
            }
        }
        //     , function (error, response) {
        //     if (error) {
        //         console.log(error);
        //         res.end("error");
        //     } else {
        //         console.log("Message sent: " + response.message);
        //         res.end("sent");
        //     }
        // });
    }
    catch (ex) {
        console.log(ex)
        if (req['signUp']){
            res.status(200).send({
                status: 500,
                msg: "signUp Succesfully and mail Not send",
                data: _.pick(req.body.data, 'email', 'isActive'),
                error: ex
            });
        }
        else{
            res.status(500).send({
                status: 500,
                msg: "server Error",
                error: ex
            });
        }
    }
};

async function getPassword(role,email) {
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

