const express = require('express');
const router = express.Router();
const passport = require('passport');
const _ = require("lodash"); 

// { username: '', password: '' }
router.post('/login', (req, res, next) => {
    console.log(req.body);
    const { username, password } = req.body;
    passport.authenticate('local', { session: false }, (err, user, info) => {
        // console.log('err', err);
        // console.log('user', user);
        // console.log('info', info);
        res.json({
            err: err, 
            success: user ? true : false, 
            message: info, 
            profile: user ? _.omit(user.toObject(), ['salt', 'hash']) : null
        });
        // if (err || !user) {
            
        // }
        // if (err !== null || !user) {
        //   return res.json({ error: err, success: false });
        // }
        // req.login(user, { session: false }, (err) => {
        //   if (err) {
        //     return res.json({ error: err, success: false });
        //   }
        //   // generate a signed json web token with the contents of user object and return it in the response
        //   const token = jwt.sign({ id: user._id }, 'webdxd_token');
        //   return res.json({ profile: _.omit(user.toObject(), ['salt', 'hash']), token, err: null, success: true });
        // });
    })(req, res, next);
});
    // res.json({
    //     tweets: res.locals.tweets,
    //     err: null,
    //     success: true,
    // });



module.exports = router;
