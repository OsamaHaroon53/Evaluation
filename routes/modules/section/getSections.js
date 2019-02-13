const Section = require('../../../models/Section');

module.exports = async function (req, res, next) {
    var data = await Section.find().populate('program','program semester').select('-__v');
    if(!data.length){
        return res.status(200).send({
            status: 304,
            msg: "Sections Not Found"
        });
    }
    res.status(200).send({
        status: 200,
        msg: "Get Sections Succesfully",
        data: data
    });
}