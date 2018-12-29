const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var mongoURL;

if (process.env.NODE_ENV === 'production') {
    mongoURL = "mongodb://osama:tabish1@ds127139.mlab.com:27139/karachevaluationsystem";
}
else {
    mongoURL = "mongodb://localhost:27017/Evaluation"
}

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useCreateIndex: true
});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'CONNECTION ERROR :'));
db.once('open', () => {
    console.log('CONNECTION OPENED!!');
    return db;
});
module.exports = db;