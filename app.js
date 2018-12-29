const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const database = require('./services/configDB');
const routes = require('./routes/api');
const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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