const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
// const tweets = require('./tweets.json');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/webdxd');

// get routers
const index = require('./routes/index');
const profile = require('./routes/profile');

const app = express();
// allow using moment in pug
app.locals.moment = require('moment');

// set before middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use routers
app.use('/', index);
app.use('/profile', profile);

// // get
// app.get('/', (req, res) => {
//     res.render('index', { tweets });
// });
// app.get('/login', (req, res) => {
//     res.render('login');
// });
// app.get('/signup', (req, res) => {
//     res.render('signup');
// });
// app.get('/profile', (req, res) => {
//     res.render('profile');
// });
// app.get('/profile/edit', (req, res) => {
//     res.render('editProfile');
// });

// 404 handler
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    res.send(err.message);
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));
