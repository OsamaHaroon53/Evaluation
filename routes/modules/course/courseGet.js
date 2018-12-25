const courseModel = require('../../../models/Course');

module.exports = (req, res) => {
    courseModel.find()
        .then(data => {
            data ? res.status(200).send({
                status: 200,
                data: data,
                msg: 'Success: Data save succesfully'
            }) : res.status(304).send({
                status: 304,
                data: data,
                msg: 'Success: Data save succesfully'
            });
        })
        .catch(err => {
            console.log('err: ' + err);
            res.status(500).send(err);
        });
};