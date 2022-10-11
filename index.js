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
const passportJWT = require('./config/passport-jwt-stratergy');
const passportGoogle = require('./config/passport-google-Oauth2-stratergy');


const mongoSessionStore = require("connect-mongo");
const MongoStore = mongoSessionStore(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());


app.use(express.static('./assets'));

app.use(expressLayouts);

app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// setting up the view engine
app.set('view engine', 'ejs');

app.set('views', './views');

// Mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial', 
    // Todo change the secret before deploy it
    secret : "Something", 
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    }, 
    store: new MongoStore({
            mongooseConnection: db, 
            autoRemove : 'disabled'   
    }, function(err){
        console.log(err || "connect-mongodb setup ok");
    })

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

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