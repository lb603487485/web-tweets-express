var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json({
        tweets: res.locals.tweets,
        err: null,
        success: true,
    });
});



module.exports = router;
