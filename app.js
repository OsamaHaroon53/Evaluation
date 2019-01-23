const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const cors =require('./middleware/cors');
const database = require('./services/configDB');
const routes = require('./routes/api');
const config = require('config')
const app = express();
const port = process.env.PORT || 3000;

// if(!config.get('jwtPrivateKey')){
//     console.error("FATAL ERROR: jwtPrivateKey is not defined");
//     process.exit(0);
// }

// if(!config.get('Guser')){
//     console.error("FATAL ERROR: Guser is not defined");
//     process.exit(0);
// }

// if(!config.get('Gpass')){
//     console.error("FATAL ERROR: Gpass is not defined");
//     process.exit(0);
// }

app.use(logger('dev'));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Evaluation system');
});
app.use('/api', routes);

// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
    app.use(errorHandler())
}

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});