
const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title : "User Profile",
            profile_user: user
        });
    });
}

module.exports.update = async function(req, res){

    if(req.user.id == req.params.id){
        
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('*******Multer Error: ', err)
                }

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');

            });
        }catch(err){
            return res.redirect('back');
        }
    }else{
        
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
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');

}

// For signing out 
module.exports.destroySession = function(req, res, next){
    
    // In new version the logout function require a call back function with one more parameter.
    
    // req.logout();

    // req.flash('success', 'Your have Logged out');

    // return res.redirect('/');

   req.logout(function(err){
    
    req.flash('success', 'You have Logged out');

    if(err) {return next(err); }

    req.flash('success', 'You have Logged out');
     return res.redirect('/');
   });

  req.flash('success', 'You have Logged out');

    return res.redirect('/');
}