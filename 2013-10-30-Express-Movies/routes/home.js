
/*
 * GET /
 */

exports.index = function(req, res){
  res.render('home/index', {title: 'Movie Maker | Home'});
};
