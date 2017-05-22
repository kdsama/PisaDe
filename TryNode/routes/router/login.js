var express = require("express");
var router = express.Router();
console.log('entered the login.js file');
var crypto = require('crypto'),
algorithm = 'aes-256-ctr',
 pwd = 'd6F3Efeq';
var client = require('./database/db');
router.get('/',function(req,res){
	console.log('entered get login function ');
	res.render('login');
});
router.post('/', function(req, res){
	console.log('entered post function of login');
var username = req.body.username;
var password = req.body.password;
var sess = req.session;

var cipher = crypto.createCipher(algorithm,pwd);
var crypted = cipher.update(password,'utf8','hex');
	crypted += cipher.final('hex');      

var strQuery = "select * from userdetails where username ='"+username+"'and password='"+crypted+"';";
client.query(strQuery,function(err,rows){
	if (err) console.log(err); 
	console.log(rows);
if(rows.length==0){
		console.log("invalid length");
		return 0;
	}
	else{
		sess.username = username;
		res.render('welcome',{user:username});
	}
});   
});
//LOGIN DONE




// etc...

module.exports = router;