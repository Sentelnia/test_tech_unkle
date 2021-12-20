require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const logger       = require('morgan');
const path         = require('path');


// Set up the database
require('./configs/db.config');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))




// default value for title local
app.locals.title = 'Test Tech Unkle';


const index = require('./routes/index');
app.use('/', index);


const auth = require('./routes/authroute');
app.use(auth);


const admin = require('./routes/adminroute');
app.use('/admin',admin);

const option = require('./routes/optionroute');
app.use('/option',option);



module.exports = app;