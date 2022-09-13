const express = require('express');

const router = express.Router();

const users_controllers = require('../controllers/users_controller');

router.get('/profile', users_controllers.profile);

router.get('/Sign-up', users_controllers.signUp);
router.get('/Sign-In', users_controllers.signIn);

module.exports = router;