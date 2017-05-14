var express = require('express');
var app = express();
var session = require('express-session');
var routes = require('./routes');
var user = require('./routes/user');


var path = require('path')
  , bodyParser = require('body-parser')
  ,logger = require('morgan')
   ,mySqlStore = require('express-mysql-session')(session)
   , favicon = require('serve-favicon');

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
console.log("connected");
client.query("use details",function(err){
	if(err){
		console.log("not present");
	}
	else{
		console.log("present");
	}
});














var about = require('./routes/about');
app.get('/about', about.about);

//SIGN UP 

var signup = require('./routes/signup');
app.get('/signup', signup.signup);
console.log("GOT SIGNUP IN ");
app.post('/signup',function(req,res){
	console.log('Entered');
	var username = req.body.username;
	var password = req.body.password;
	var cipher = crypto.createCipher(algorithm,pwd);
		 var crypted = cipher.update(password,'utf8','hex');
		 crypted += cipher.final('hex');      
		 var strQueryInsert = "insert into userdetails(username,password) values('"+username+"','"+crypted+"');";
		 client.query(strQueryInsert,function(err,rows){
		 	if(err){
		 		return 0;
		 	}
		 	else
		 		{
		 	      console.log(rows);
			  res.redirect('/');
		 		}
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

