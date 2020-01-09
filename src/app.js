const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const categories = require('./routes/categories');
const users = require('./routes/users');
const cors = require('cors');
require('dotenv').config();
require('./middleware/passport');
const passport = require('passport');
require('dotenv').config();


const port = 3000;
app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

app.get('/', (request, response) => {
    response.json({status: true});
});

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(passport.initialize());

app.use('/api', categories);
app.use('/api', users);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    next();
});
