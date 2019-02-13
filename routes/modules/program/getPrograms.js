const Program = require('../../../models/Program');

module.exports = async function (req, res, next) {
    var data = await Program.find().select('-__v');
    if(!data.length){
        return res.status(200).send({
            status: 304,
            msg: "Programs Not Found"
        });
    }
    
    res.status(200).send({
        status: 200,
        msg: "Get Programs Succesfully",
        data: data
    });
}