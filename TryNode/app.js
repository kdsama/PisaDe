/*		 	    		 var mailOptions={
		 	    				   to : email,
		 	    				   subject : "Thanks for making account",
		 	    				   text : "Hey"+name+", Thanks for Joining Pisa De.I am hopeful that you will make me lots of money"
		 	    				};
		 	    				console.log(mailOptions);
		 	    				smtpTransport.sendMail(mailOptions, function(err, res){
		 	    				if(err){
		 	    				console.log(err);
		 	    				res.end(err);
		 	    				}else{
		 	    				console.log("Message sent: " + res.message);
		 	    				res.end("sent");
		 	    				}
		 	    				});
		 	    				
		 	    				*/
/**
 * Module dependencies.
 */

var  http = require('http');


var express = require('express');
var app = express();
var timeout = require('connect-timeout');
var session = require('express-session');
var routes = require('./routes');
var bcrypt = require('bcrypt');

var path = require('path')
  , bodyParser = require('body-parser')
  ,logger = require('morgan')
   ,mySqlStore = require('express-mysql-session')(session)
   , favicon = require('serve-favicon')
   ,nodemailer =require('nodemailer');

//var smtpTransport = nodemailer.createTransport({
//    service: "gmail",
//    host: "smtp.gmail.com",
//    auth: {
//        user: "kdsama5593@gmail.com",
//        pass: "lycandhingra"
//    }
//});
app.use(logger('dev'));


var options = {
		host: 'localhost',
		user: 'root',
		password: 'password',
		database: 'details',
	};

	var sessionStore = new mySqlStore(options);

	app.use(session({
		key: 'session_cookie_name',
		secret: 'session_cookie_secret',
		store: sessionStore,
		resave: true,
		saveUninitialized: true
	}));

var crypto = require('crypto'),
algorithm = 'aes-256-ctr',
 pwd = 'd6F3Efeq';

var mysql =  require('mysql');



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('x-powered-by', false);



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

// development only



//Back button correction
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    	
    
    next();
});

//end of back button

app.use(timeout('600s'));



var sess;



http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});

var client = '.router/database/db';

var router = require('./routes')(app);

//Error Handling
app.use(function(err, req, res, next) {
 res.status(err.status || 500);
});

module.exports = app;










//app.get('/logout',logout.logout);

//
//
//client.connect();
//console.log("database connected");
//client.query("use details",function(err){
//	if(err){
//		console.log("not present");
//	}
//	else{
//		console.log("present");
//	}
//});
//
//
//
//
//
//
//
//
//
//
//
//
//SIGN UP 



//SIGNUP DONE

//LOGIN
//var login = require('./routes/login');
//app.get('/login', login.login);


//
////LOGGED IN 
//
//var welcome = require('./routes/welcome');
//
//app.get('/welcome', welcome.welcome);