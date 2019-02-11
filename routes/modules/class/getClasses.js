const Class = require('../../../models/Class');

module.exports = async function (req, res, next) {
    var data = await Class.find().select('-__v');
    if(!data.length){
        return res.status(200).send({
            status: 304,
            msg: "Classes Not Found"
        });
    }
    res.status(200).send({
        status: 200,
        msg: "Get classes Succesfully",
        data: data
    });
}