const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('x-auth-token');
    if(!token)
        return res.status(401).send({
            msg: "Access denied. No user available",
            status: 401
        });
    try {
        const decoded = jwt.verify(token,'UBIT');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({
            msg: "Access denied. Invalid user",
            status: 401
        });
    }
}