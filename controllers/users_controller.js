
const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title : "User Profile",
            profile_user: user
        });
    });
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    } else{
        return res.status(401).send('Unauthorized');
    }
}

// Rendring The Sign Up page
module.exports.signUp = function(req, res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title : "Codeial | Sign Up"
    })
}

// Rendring the Sign In page
module.exports.signIn = function(req, res){

    if(req.isAuthenticated()){
      return res.redirect('/users/profile');
    }


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

// For signing out 
module.exports.destroySession = function(req, res , next){
    
    // In new version the logout function require a call back function with one more parameter.
   req.logout(function(err){
    if(err) {return next(err); }
     return res.redirect('/');
   });

    return res.redirect('/');
}