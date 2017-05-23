express = require('express');
router = express.Router();
router.post('/',function(req,res){
	console.log('Entered for logout at welcome page');
	req.session.destroy(function(err) {
		  if(err) {
		    console.log(err);
		  } else {
			  console.log('session destroyed');
		    res.render('logout');
		  }
		});
	res.render('logout');
		

});



module.exports = router;