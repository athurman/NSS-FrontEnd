
/*
 * GET cats page.
 */

exports.index = function(req, res){
  res.render('cats'); // render out data (vendor js files, jade files, etc) and seek views for user.
};