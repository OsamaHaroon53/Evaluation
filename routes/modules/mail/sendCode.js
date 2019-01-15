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
        user: "asubitad436@gmail.com",
        pass: ""
    }
});

module.exports = async function (req, res) {
    var mailOptions = {
        to: req.body.email,
        subject: "UBIT - Password Recovery Code",
        html: `<div style="text-align:center;">
                    <h3>Welcome to UBIT!</h3>
                    <p>Your account reset password code Created<br />
                        Below code will not work after a hour.</p><br />
                    <div><strong>Email:</strong> <span style="padding:10px 5px;border: 1px solid grey;">${req.text.email}</span></div>
                    <br /> <br />
                    <div><strong>Code:</strong> <span style="padding:8px 5px;border: 1px solid grey;">${req.text.code}</span></div><br />
                </div>`
    }
    
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.status(500).send({
                status: 500,
                msg: "mail not send"
            });
        } else {
            console.log("Message sent: ", response.message);
            res.status(200).send({
                status: 200,
                msg: `code send succesfully`
            });
        }
    });
};