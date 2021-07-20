const express = require('express');
const router = express.Router();
const utils = require('../utils');
const Users = require('../models/users');
const Tweets = require('../models/tweets');

// // update tweets to the tweets post by user only
// router.use((req, res, next) => {
//     Tweets.find({"author.username": req.user.username}).sort({createdAt: 'desc'}).exec((err, tweets) => {
//         if (err) console.log(err);
//         console.log("Profile Tweets Called #######");
//         res.locals.tweets = tweets;
//         next();
//     });
// });

// this router requires user logined
router.use(utils.requireLogin);

//utils.requireLogin,
router.get('/', (req, res) => {
    console.log(req.user);
    res.render('profile');
});

router.get('/edit', (req, res) => {
    res.render('editprofile');
});

router.post('/edit', (req, res) => {
    console.log(req.body);
    Users.updateOne({ _id: req.user._id }, req.body, (err) => {
        if (err) {
            return next(err);
        } else {
            return res.redirect('/profile');
        }
    });
});

router.post('/avatar', (req, res) => {
    Users.updateOne({ _id: req.user._id }, req.body, (err) => {
        if (err) {
            return next(err);
        } else {
            return res.json({ success: true });
        }
    });
});

module.exports = router;