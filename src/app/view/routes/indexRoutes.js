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

module.exports = router;
