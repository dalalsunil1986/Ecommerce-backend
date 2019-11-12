const express = require('express');
require('dotenv').config();
require('./config/mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressVadilator = require('express-validator');


//app
const app = express();
const port = process.env.PORT;
const router = express.Router();

//middle ware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressVadilator());
app.use('/', require('./routes/index')(router));



app.listen(port, () => {
    console.log('http://localhost:2333');
});