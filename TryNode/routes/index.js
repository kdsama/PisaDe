
/*
 * GET home page.
 */
module.exports = function (app) {
    app.use('/', require('./router/AllRouting'));
    //app.use('/login',require('./router/login'));
    app.use('/login', require('./router/login'));
    app.use('/signup', require('./router/signup'));
    app.use('/welcome',require('./router/welcome'));
    app.use('/logout',require('./router/logout'));
   
};


