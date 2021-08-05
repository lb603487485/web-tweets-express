const express = require('express');
const router = express.Router();
const Tweets = require('../models/tweets');
const passport = require('passport');
const Users = require('../models/users');
const utils = require('../utils');

// // add tweets to locals
// router.use((req, res, next) => {
//     Tweets.find({}).sort({createdAt: 'desc'}).exec((err, tweets) => {
//         console.log("Tweets Called #######");
//         res.locals.tweets = tweets;
//         next();
//     });
// });

router.get('/', utils.requireLogin, (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post( "/login", passport.authenticate("local"), (req, res) => {
    res.redirect("/");
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', (req, res, next) => {
    const { username, password, confirmPassword } = req.body;
    if (password === confirmPassword) {
        Users.register(new Users({ username, name: username }), password, (err, user) => {
            if (err) {
                return next(err);
            }

            passport.authenticate('local')(req, res, () => {
                return res.redirect('/')
            });
        });
    } else {
        return next({ message: 'Password does not match' });
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});


module.exports = router;