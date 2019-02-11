const Class = require('../../../models/Class');

module.exports = async (req, res) => {
    await Class.findByIdAndDelete(req.params.id)
        .then(data => {
            console.log(data)
            data ? res.status(200).send({
                status: 200,
                msg: 'Success: Data Delete succesfully'
            }) : res.send({
                status: 304,
                msg: 'Fail: Data not found'
            });
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                msg: 'Error: Server Error',
                error: err
            });
        });
};