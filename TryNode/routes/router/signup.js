var express = require("express");
var router = express.Router();
console.log('entered the login.js file');
var crypto = require('crypto'),
algorithm = 'aes-256-ctr',
 pwd = 'd6F3Efeq';
var client = require('./database/db');

router.get('/',function(req,res){
	console.log('entered get signup function ');
	res.render('signup');
});
router.post('/',function(req,res){
	console.log('Sign Up :- Entered');
	var username = req.body.username;
	var password = req.body.password;
	var name = req.body.name;
	var email = req.body.email;
	
	var cipher = crypto.createCipher(algorithm,pwd);
	var crypted = cipher.update(password,'utf8','hex');
		crypted += cipher.final('hex'); 

	    var strQueryInsert1 = "insert into user(email,username,name) values('"+email+"','"+username+"','"+name+"');";

		 var strQueryInsert = "insert into userdetails(username,password) values('"+username+"','"+crypted+"');";
	
		 
		 client.query(strQueryInsert,function(err,rows){
		 	if(err){
		 		return 0;
		 	}
		 	else
		 		{
		 	   console.log(rows);
		 	      client.query(strQueryInsert1,function(err,rows){
		 	    	  if (err){
		 	    		  return 0;
		 	    	  }
		 	    	  else{
		 	    		  console.log('Successfuly registered :' +name);
		 	    		  res.render('welcome');
		 	    	  }

	  });

		 	    		 
		 	    	  }
		 	
		 	      });
			  

		 });		
	
	
	

module.exports = router;