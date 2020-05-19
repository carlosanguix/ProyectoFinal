// Routes for pages requests

const express = require('express');
const controller = require('../controllers/indexController');
const router = express.Router();

router.get('/', (req, res) => {
    controller.renderLogin(req, res);
});

router.get('/home', (req, res) => {
    controller.renderHome(req,res);
});

router.get('/beers', (req, res) => {
    controller.renderBeers(req, res);
});

router.get('/myProfile', (req, res) => {
    controller.renderMyProfile(req, res);
});

router.get('/beers/:id', (req, res) => {
    controller.renderBeer(req, res)
    console.log(req.params.id);
});

module.exports = router;
