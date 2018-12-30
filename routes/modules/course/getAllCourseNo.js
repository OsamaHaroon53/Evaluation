const courseModel = require('../../../models/Course');
const objectid = require('mongoose').Types.ObjectId;;

var programs = ['BSSE', 'BSCS', 'MCS', 'PGD', 'MS', 'Phd', 'MS/Phd'];

module.exports = (req, res) => {

    courseModel.find()
        .select("_id courseNo")
        .then(data => {
            data.length ? res.send({
                status: 200,
                data: data,
                msg: 'Success: Data send succesfully'
            }) : res.send({
                status: 304,
                msg: 'Fail: Data not found'
            });
        })
        .catch(err => {
            console.log('err: ' + err);
            res.send({
                status: 500,
                msg: 'Error: Server Error',
                error: err
            });
        });

};
