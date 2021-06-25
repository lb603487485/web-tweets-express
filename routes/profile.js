const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('profile');
});

router.get('/edit', (req, res) => {
    res.render('editprofile');
});

module.exports = router;