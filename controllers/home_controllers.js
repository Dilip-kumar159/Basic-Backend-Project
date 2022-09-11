module.exports.home = function(req, res){
    console.log("This is running in the browser");
     return res.end('<h1> Express is up for Codeial </h1>');
}

module.exports.name = function(req, res){
    console.log("This is not running in the browser");
    return  res.end('<h1> This is created by Dilip </h1>');
}