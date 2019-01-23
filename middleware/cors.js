module.exports = function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS',
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, x-auth-token , Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
      );
      res.header(
        'Access-Control-Expose-Headers',
        'Origin, X-Requested-With, x-auth-token , Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
      );
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
}