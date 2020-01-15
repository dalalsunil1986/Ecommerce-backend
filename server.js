let configFile = null;
console.log('process.NODE_ENV', process.env.NODE_ENV);
switch (process.env.NODE_ENV) {
    case 'dev':
        break;
    
    case 'production':
        configFile = './config/config-production.env';
        break;
}
const express = require('express');
require('dotenv').config();
require('./config/mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressVadilator = require('express-validator');
const cors = require('cors');


//app...
const app = express();
const port = process.env.PORT || 2333;
const router = express.Router();

//middle ware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressVadilator());
app.use('/', require('./routes/index')(router));




app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});