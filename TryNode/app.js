
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser');

var app = express();


var session = require('express-session');
app.use(session({secret: 'ssshhhhh'}));

var crypto = require('crypto'),
algorithm = 'aes-256-ctr',
 pwd = 'd6F3Efeq';

var mysql =  require('mysql');



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

// development only



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




var client =mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"password"
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
		 var strQueryInsert = "insert into logindetails(name,password) values('"+username+"','"+crypted+"');";
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

var strQuery = "select * from logindetails where name ='"+username+"'and password='"+crypted+"';";
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