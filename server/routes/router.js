const express = require('express');
const router = express.Router();

//GET ROUTES
const homeRoute = require('./get/homeRoute');
router.get('/', homeRoute);


module.exports = router;