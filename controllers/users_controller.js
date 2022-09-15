
const User = require('../models/user');

module.exports.profile = function(req, res){
    
    return res.render('user_profile', {
        title : "User Profile"
    })
}

// Rendring The Sign Up page
module.exports.signUp = function(req, res){

    return res.render('user_sign_up', {
        title : "Codeial | Sign Up"
    })
}

// Rendring the Sign In page
module.exports.signIn = function(req, res){

    return res.render('user_sign_in', {
        title : "Codeial | Sign In"
    })
}

// Get The Sign-Up data
module.exports.create = function(req, res){

    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email}, function(err, user){
        if(err){console.log('Error while finding user in signing up'); return};

        if(!user){
            User.create(req.body, function(err , user){
                if(err){console.log('Error while Creating user in signing up'); return};

                return res.redirect('/users/Sign-In');
            })
        } else{
            return res.redirect('back');
        }
    });

}

// Sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');

}