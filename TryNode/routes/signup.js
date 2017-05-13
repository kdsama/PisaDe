/**
 * http://usejsdoc.org/
 */
exports.signup = function(req, res){
res.render('signup', { title: 'Express' });
console.log("GOT SIGNUP IN EXPORT");
};