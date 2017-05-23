var express = require("express");
var router = express.Router();





router.post('/', function (req, res) {
    // handle a post request to this route
});


router.get('/',function(req,res){
	var sess = req.session;
	console.log('session at welcome page = '+ sess.username);
	//Session set when user Request our app via URL
	if(sess.username) {
	/*
	* This line check Session existence.
	* If it existed will do some action.
	*/
		res.render('welcome',{user:sess.username});
	}
	else {
	    res.render('index');
	}
	});

// etc...

module.exports = router;