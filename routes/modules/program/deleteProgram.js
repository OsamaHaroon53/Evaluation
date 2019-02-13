const Program = require('../../../models/Program');

module.exports = async (req, res) => {
    await Program.findByIdAndDelete(req.params.id)
        .then(data => {
            data ? res.status(200).send({
                status: 200,
                msg: 'Program Delete succesfully'
            }) : res.send({
                status: 304,
                msg: 'Program not found'
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