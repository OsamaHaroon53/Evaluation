module.exports = function(req,res,next){
    if(req['user']['role'] && req.user.role === 2){
        next();
    }
    else{
        return res.status(403).send({
            msg: "Permission denied. you are not Teacher",
            status: 403
        });
    }
}