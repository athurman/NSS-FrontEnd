
/*
 * GET /colors
 */

exports.index = function(req, res){
  var colors = ['cyan', 'blue', 'green', 'yellow', 'orange', 'red', 'salmon'];
  res.render('colors/index', {title: 'Colors', colors: colors});
};
