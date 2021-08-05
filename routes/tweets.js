var express = require('express');
var router = express.Router();
const utils = require('../utils');
const Users = require('../models/users');
const Tweets = require('../models/tweets');
const { render } = require('pug');

// this router requires user logined
router.use(utils.requireLogin);

router.get('/', (req, res) => {
    res.json({
        tweets: res.locals.tweets,
        err: null,
        success: true,
    });
});

router.get('/edit/:id', (req, res, next) => {
    Tweets.findById(req.params.id, (err, tweet) => {
        if (err) { 
            next(err);
        } else {
            return res.render('editTweet', { tweet });
        }
    });
});

/* POST new tweet */
router.post('/add', (req, res, next) => {
    console.log('adding');
    console.log(req.body);
    console.log(req.user);
    Tweets.create(
      {
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        imageGroup: req.body.imageGroup, 
        author: req.user,
      },
      (err, new_tweet) => {
          if (err) {
              return next(err);
          } else {
              return res.redirect('/');
          }
      }
    );
});

/* POST editing tweet */
router.post('/update/:_id', (req, res, next) => {
    console.log('editing');
    console.log(req.body);
    Tweets.updateOne(
        {_id: req.params._id, "author.username": req.user.username}, 
        {
            content: req.body.content,
            modifiedAt: Date.now()
        }, 
        (err, data) => {
            if (err) {
                console.log("ERROR: ", err);
                return next(err);
            } 
            else if (data.nModified){
                console.log(data);
                return res.redirect('/');
            } 
            else {
                res.status(405);
                res.json({success: false});
        }
    });
});

// utils.requireLogin,
//, "author.username": req.user.username
/* DELETE delete a tweet*/
router.delete('/delete/:_id', (req, res, next) => {
    console.log('deleting');
    Tweets.deleteOne({_id: req.params._id, "author.username": req.user.username}, (err, data) => {
        if (err) {
            return next(err);
            
        } else if (data.deletedCount) {
            res.json({success: true});
        
        } else {
            res.status(405);
            res.json({success: false});
        }
        return;
    });
});

module.exports = router;
