var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	console.log('got it');
});

router.post('/',function(req,res){
	console.log('Entered');
	req.session.destroy(function(err) {
		  if(err) {
		    console.log(err);
		  } else {
		    res.render('logout');
		  }
		});
});

module.exports = router;