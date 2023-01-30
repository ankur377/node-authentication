const express = require("express");
const app = express();
let bodyParser = require('body-parser');
let database = require('./models/database');
const routesApi = require('./routes/app-routes');
const { responseMiddleware } = require('./helper/response')
require('dotenv').config();



enableCORS(app);
attachBodyParser(app);
startServer(app, process.env.PORT);

app.use('/api', responseMiddleware, routesApi);



/* Fuctions */

// Start Express Server
function startServer(expressInstance, port) {
    expressInstance.listen(port, () => {
        console.log('App listening on port : ', port);
    });
}

// Enable CORS
function enableCORS(expressInstance) {
    expressInstance.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, timeZone");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next();
    });
}

// Attach BodyParser
function attachBodyParser(expressInstance) {
    expressInstance.use(bodyParser.json({ limit: '1000mb' }));
    expressInstance.use(bodyParser.urlencoded({
        extended: true
    }));
}
