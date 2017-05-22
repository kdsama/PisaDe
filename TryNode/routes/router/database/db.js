var mysql = require('mysql');
console.log("Entered DB YO ");
var client = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'details'
});

client.connect(function(err) {
    if (err){ throw err;}
});

module.exports = client;

