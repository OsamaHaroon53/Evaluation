const courseModel = require('../../../models/Course');
const objectid = require('mongoose').Types.ObjectId;;

module.exports = (req, res) => {
    validate(req.params.program)
        ?
        courseModel.find({ program: req.params.program })
            .select("_id courseNo title")
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
            })
        : res.send({
            status: 402,
            msg: 'Validation error'
        });

};

function validate(program) {
    flag = false;
    ['BSSE', 'BSCS', 'MCS', 'PGD', 'MS', 'Phd'].forEach(x => {
        if (x == program)
            flag = true;
    });
    return flag;
}