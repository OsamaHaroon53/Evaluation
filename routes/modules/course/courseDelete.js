const courseModel = require('../../../models/Course');

module.exports = (req, res) => {
    courseModel.findByIdAndDelete(req.params.id)
        .then(data => {
            data ? res.status(200).send({
                status: 200,
                msg: 'Success: Data Delete succesfully'
            }) : res.send({
                status: 304,
                msg: 'Fail: Data not found'
            });
        })
        .catch(err => {
            if (err['name'] && err['name'] === "CastError" ) {
                res.status(402).send({
                    status: 402,
                    error: err,
                    msg: `Error: '${err['value']}' is invalid id`
                });
            }
            else
            res.status(500).send({
                status: 500,
                msg: 'Error: Server Error',
                error: err
            });
        });
};