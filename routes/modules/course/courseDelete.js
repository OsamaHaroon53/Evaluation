const courseModel = require('../../../models/Course');

module.exports = (req, res) => {
    courseModel.findByIdAndDelete(req.params.id)
        .then(data => {
            console.log(data);
            res.status(200).send('Deleted')
        })
        .catch(err => {
            console.log('err: ' + err);
            res.status(403).send(err);
        });
};