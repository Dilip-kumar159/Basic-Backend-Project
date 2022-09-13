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
    // TODO later

}

// Sign in and create a session for the user
module.exports.createSession = function(req, res){
    // TODO later

}