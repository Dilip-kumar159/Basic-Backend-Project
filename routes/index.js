const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controllers');
console.log("Router Loaded in route folder");

// router.get('/', homeController.name);

router.get('/', homeController.home);


module.exports = router;
