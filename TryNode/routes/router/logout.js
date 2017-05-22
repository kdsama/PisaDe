express = require('express');
router = express.Router();
router.post('/',function(req,res){
	
	res.render('logout');
		

});



module.exports = router;