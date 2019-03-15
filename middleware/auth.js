const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    const token = req.header('X-Auth-Token');
    if(!token)
        return res.status(401).send({
            msg: "Access denied. No user available",
            status: 401
        });
    try {
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({
            msg: "Access denied. Invalid user",
            status: 401
        });
    }
}