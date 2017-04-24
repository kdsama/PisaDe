
var module = require('./node_modules/DBModule');

var url=require('url');

var querystring=require('querystring');

var fs=require('fs');

var zlib = require('zlib');

var path = require('path');

exports.display_login=function(url, request, response){

                   data1= '';

                request.on('data', function(chunk) {                                      

                                data1 += chunk;                                               

                });          

                request.on('end', function() {

                                 qs=querystring.parse(data1);                   

                 name=qs['username'];

                 password=qs['password'];         

            module.authenticateUser(name,password,function(err,data){
              if (data=="success"){
                response.writeHead(200,{'Content-Type':'text/html'});
                fs.readFile('./Details_Books.html',function(err,html){
                  if (err){
                    throw err;
                  }
                  response.writeHeader(200,{'Content-Type':'text/html'});
                  response.write(html);
                  response.end
                });
              }
              else{
                console.log("error");
                response.writeHead(200,{'Content-Type':'text/html'});
                response.write("<body bgcolor='#E2C2F6'><center>Invalid User try login Again!!</center></body>");

                                   response.write("<center><a href='home'>Back to Login</a></center>");

                                   response.end(); 

              }
            });
          });
              }


   exports.display_register= function (url, request, response){   

                 data1= '';

                                request.on('data', function(chunk) {      

                                                console.log(chunk);

                                                data1 += chunk;                                               

                                });                          

                                request.on('end', function() {

                                                 qs=querystring.parse(data1);

                                                 console.log(qs);

                                 name=qs['username'];

                                 password=qs['password'];

                                 confirmpassword=qs['confirmpassword'];         

                                 address=qs['address'];

                                 if(password==confirmpassword && password != ''){

                                result=module.addUser(name,password,address,response);

                                response.writeHeader(200, {"Content-Type": "text/html"}); 

                                 response.write("<body bgcolor='#E2C2F6'><center>"+result+"</center></body>");

                                response.write("<center><a href='home'>Click here to Login</a></center>");

                }

                else{

                                                                response.writeHead(200, {'Content-Type': 'text/html'});

                                                                response.write("<body bgcolor='#E2C2F6'><center>Password doenot match with confirm password!!</center></body>");

                                                                response.write("<center><a href='signup'>Try again</a></center>");

                                                                 response.end();             

                                                               

                                                }

                                });

                               

  }

  exports.display_home=function(url, request, response){          
    var filePath = request.url;

                                   if (filePath == '/home'){
  filePath = '/Login_Book.html';
}

filePath = __dirname+filePath;
var extname = path.extname(filePath);
var contentType = 'text/html';

switch (extname) {
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
}


fs.exists(filePath, function(exists) {

    if (exists) {
        fs.readFile(filePath, function(error, content) {
            if (error) {
                response.writeHead(500);
                response.end();
            }
            else {                   
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');                  
            }
        });
    }


}


                                );

}

exports.view_books=function(request, response){       

 fs.readFile('./books.json', function (err, json) {

                                    if (err) {

                                        throw err;

                                    }      

                                      response.writeHeader(200, {"Content-Type": "application/json"}); 

                                        response.end(json); 

                                        

                                });

 

}

exports.getImageResponse=function(request,response){

var img;

switch(request.url) {

case '/node1.jpg':   img=fs.readFileSync('./books/images/node1.jpg');

   break;

   case '/node2.jpg':  img=fs.readFileSync('./books/images/node2.jpg');

   break;

   case '/node3.jpg':  img=fs.readFileSync('./books/images/node3.jpg');

   break;

 

}  

     response.writeHead(200, {'Content-Type': 'image/jpg' });

     response.end(img, 'binary');

 

}