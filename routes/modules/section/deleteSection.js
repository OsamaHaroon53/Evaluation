const Section = require('../../../models/Section');

module.exports = async (req, res) => {
    await Section.findByIdAndDelete(req.params.id)
        .then(data => {
            data ? res.status(200).send({
                status: 200,
                msg: 'Section Delete succesfully'
            }) : res.send({
                status: 304,
                msg: 'Section not found'
            });
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                msg: 'Server Error',
                error: err
            });
        });
};