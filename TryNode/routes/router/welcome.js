var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	console.log('got it');
});

router.post('/',function(req,res){
	
});

module.exports = router;