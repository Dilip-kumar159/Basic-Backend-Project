const express = require('express');

const app = express();

const port = 8000;

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`Error Occurred while running the server ${err}`);
        return;
    }

    console.log(`Server running on port : ${port}`);
})