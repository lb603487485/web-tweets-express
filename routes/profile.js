const express = require('express');
const router = express.Router();
const utils = require('../utils');

router.get('/', utils.requireLogin, (req, res) => {
    res.render('profile');
});

router.get('/edit', utils.requireLogin, (req, res) => {
    res.render('editprofile');
});

module.exports = router;