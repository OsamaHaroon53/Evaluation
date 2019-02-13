const objectid = require('mongoose').Types.ObjectId;

module.exports = async function(id){
    if (id.length == 24 && await objectid.isValid(id)) {
        return true;
    }
    return false;
}