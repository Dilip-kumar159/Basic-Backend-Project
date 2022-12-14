const express = require('express');

const router = express.Router();

const passport = require('passport');

const usersControllers = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersControllers.profile);
router.post('/update/:id', passport.checkAuthentication, usersControllers.update);

router.get('/Sign-up', usersControllers.signUp);
router.get('/Sign-In', usersControllers.signIn);

router.post('/create', usersControllers.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local', 
    {failureRedirect: '/users/Sign-In'},
), usersControllers.createSession);


// Sign out 
router.get('/sign-out', usersControllers.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile','email']}));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: 'users/Sign-In'}), usersControllers.createSession);


module.exports = router;