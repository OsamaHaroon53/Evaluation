const Document = require('../../../../models/Document');

module.exports = async function (req, res, next) {
    let options = {
        type: 1,
        teacher: req.params.teacher,
        class: req.params.class
    }
    var assignments = await Document.find(options)
        .select('-teacher -__v');
    res.status(200).send({
        status: 200,
        msg: "Get assignments Succesfully",
        data: assignments
    });
}