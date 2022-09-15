const express = require('express');

const cookieParser = require('cookie-parser');

const app = express();

const port = 8000;

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

// used for session cookie and authentication passport
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.static('./assets'));

app.use(expressLayouts);

app.use(express.urlencoded());
app.use(cookieParser());

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// setting up the view engine
app.set('view engine', 'ejs');

app.set('views', './views');

app.use(session({
    name:'codeial', 
    // Todo change the secret before deploy it
    secret : "Something", 
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));



// firing up the Server 
app.listen(port, function(err){
    if(err){
        console.log(`Error Occurred while running the server ${err}`);
        return;
    }

    console.log(`Server running on port : ${port}`);
})