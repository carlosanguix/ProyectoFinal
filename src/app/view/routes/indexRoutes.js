const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index');
});
/*
router.get('/home', (req, res) => {
    res.render('home');
});

router.get('/beers', (req, res) => {
    res.render('homeBeers');
});

router.get('/myprofile', (req, res) => {
    res.render('homeMyProfile');
});*/

router.get('/home', (req, res) => {
    res.render('home', {page: req.query.page});
});

module.exports = router;
