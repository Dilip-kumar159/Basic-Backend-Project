const express = require('express');

const router = express.Router();

const usersControllers = require('../controllers/users_controller');

router.get('/profile', usersControllers.profile);

router.get('/Sign-up', usersControllers.signUp);
router.get('/Sign-In', usersControllers.signIn);

router.post('/create', usersControllers.create);

module.exports = router;