const passport = require('passport');

const googleStratergy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/user');


passport.use(new googleStratergy({
    clientID: '742152534082-4dkp6leui9416rqp4mm9enm2sihoi3e6.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback',
},
    function(accessToken, referseToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('error in google stratergy-passport', err); return;}

            console.log(profile);

            if(user){
                return done(null, user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log('error in creating user google strategy-passport', err); return;}

                    return done(null, user);
                });
            }
        });
    }
));

module.exports = passport;