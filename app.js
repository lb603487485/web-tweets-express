const PORT = 3002;
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
// const tweets = require('./tweets.json');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/users');
const Tweets = require('./models/tweets');


// connect to database
mongoose.connect('mongodb://localhost:27017/webdxd');

// get routers
const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const tweetsRouter = require('./routes/tweets');
const tweetsPublicRouter = require('./routes/public/tweets');
const authPublicRouter = require('./routes/public/auth');

const app = express();
// allow using moment in pug
app.locals.moment = require('moment');

// set before middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
// app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// implement session middleware
app.use(session({
    secret: 'webdxd',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false}
}));

// implement passport middleware
app.use(passport.initialize());
app.use(passport.session());

// config passport middleware
passport.use(Users.createStrategy());
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

// adding user
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// add tweets to locals
app.use((req, res, next) => {
    console.log('tweet function', req.method);
    if (req.method == 'GET'){
        Tweets.find({}).sort({createdAt: 'desc'}).exec((err, tweets) => {
            console.log("Tweets Called #######");
            res.locals.tweets = tweets;
            next();
        });
    } else {
        next();
    }
});

// use routers
app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/tweets', tweetsRouter);
app.use('/public/tweets', tweetsPublicRouter);
app.use('/public/auth', authPublicRouter);

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


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
