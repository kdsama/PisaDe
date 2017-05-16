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
var routing = require('./RouteHandling');
var user = require('./routes/user');

var  http = require('http');




var express = require('express');
var app = express();

var timeout = require('connect-timeout');
var session = require('express-session');
var routes = require('./routes');
var bcrypt = require('bcrypt')

var path = require('path')
  , bodyParser = require('body-parser')
  ,logger = require('morgan')
   ,mySqlStore = require('express-mysql-session')(session)
   , favicon = require('serve-favicon')
   ,nodemailer =require('nodemailer');

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "kdsama5593@gmail.com",
        pass: "lycandhingra"
    }
});
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
var client =mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"password"
});



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


app.get('/',function(req,res){
	sess = req.session;
	//Session set when user Request our app via URL
	if(sess.username) {
	/*
	* This line check Session existence.
	* If it existed will do some action.
	*/
		res.render('welcome',{user:sess.username});
	}
	else {
	    res.render('login');
	}
	});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



var logout = require('./routes/logout')
app.get('/logout',logout.logout);
app.post('/logout',function (req,res){
	console.log('Entered');
	req.session.destroy(function(err) {
		  if(err) {
		    console.log(err);
		  } else {
		    res.render('logout');
		  }
		});
});


client.connect();
console.log("database connected");
client.query("use details",function(err){
	if(err){
		console.log("not present");
	}
	else{
		console.log("present");
	}
});












//SIGN UP 

var signup = require('./routes/signup');
app.get('/signup', signup.signup);

app.post('/signup',function(req,res){
	console.log('Sign Up :- Entered');
	var username = req.body.username;
	var password = req.body.password;
	var name = req.body.name;
	var email = req.body.email;
	
	console.log('Entering hashing salting state');
	bcrypt.genSalt(10, function(err, salt) {
	  if (err) console.log('Error in Generating salt'); //handle error
	  console.log('Generating Salt');
	  bcrypt.hash(password, salt, function(err, hash) {
		  console.log('Generating Salt completed');
	    if (err) console.log('Error in Hashing the password'); //handle error

	    var strQueryInsert1 = "insert into user(email,username,name) values('"+email+"','"+username+"','"+name+"');";
		console.log('hash function implementing');
		 var strQueryInsert = "insert into userdetails(username,password) values('"+username+"','"+hash+"');";
	
		 
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
		 	    		  console.log('Successfuly registered' +name);
		 	    	  }

	  });

		 	    		 
		 	    	  }
		 	
		 	      });
			  

		 });		
	
	
	
	
});

});
//SIGNUP DONE

//LOGIN
var login = require('./routes/login');
app.get('/login', login.login);

app.post('/login', function(req, res){
var username = req.body.username;
var password = req.body.password;
sess = req.session;

var cipher = crypto.createCipher(algorithm,pwd);
var crypted = cipher.update(password,'utf8','hex');
	crypted += cipher.final('hex');      

var strQuery = "select * from userdetails where username ='"+username+"'and password='"+crypted+"';";
client.query(strQuery,function(err,rows){
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

//LOGGED IN 

var welcome = require('./routes/welcome');
app.get('/welcome', welcome.welcome);
