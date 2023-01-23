const express = require("express");
const app = express();
let bodyParser = require('body-parser');
let database  = require('./models/database');
let jsonParser = bodyParser.json();
const routesApi = require('./routes/app-routes');
require('dotenv').config();

app.use('/api', jsonParser, routesApi);



const listener = app.listen(process.env.PORT || 9000, () => {
    console.log('Your App is listening on port http://localhost:' + listener.address().port)
})