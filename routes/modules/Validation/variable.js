const objectid = require('mongoose').Types.ObjectId;

async function objectIdValidator(id){
    if (id.length == 24 && await objectid.isValid(id)) {
        return true;
    }
    return false;
}

async function programValidator(program) {
    if(/^([a-zA-Z]{2,6})$/.test(program))
        return "program is not Valid";
    return null;
}

module.exports = {
    objectIdValidator,
    programValidator
}