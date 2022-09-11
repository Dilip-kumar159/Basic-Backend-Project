const express = require('express');

const router = express.Router();

const users_controllers = require('../controllers/users_controller');

router.get('/profile', users_controllers.profile);

module.exports = router;