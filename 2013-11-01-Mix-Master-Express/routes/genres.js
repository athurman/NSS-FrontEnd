var mongoose = require('mongoose');
var Genre = mongoose.model('Genre');
/*
 * GET /genres
 */

exports.index = function(req, res){
  Genre.find(function(err, genres){
    res.render('genres/index', {title: 'genres | mixmaster', genres: genres});
  });
};

/*
 * GET /genres/new
 */

exports.new = function(req, res){
  res.render('genres/new', {title: 'new genre | mixmaster', genre: new Genre()});
};

/*
 * POST /genres
 */

exports.create = function(req, res){
  new Genre(req.body).save(function(err, genre, count){
    if(err) {
      res.render('genres/new', {title: 'new genre | mixmaster', err: err, genre: new Genre()});
    } else {
      res.redirect('/genres');
    }
  });
};

/*
 * GET /genres/:id/edit
 */

exports.edit = function(req, res){
  Genre.findById(req.params.id, function(err, genre){
    res.render('genres/edit', {title: 'edit genre | mixmaster', genre: genre});
  });
};

exports.update = function(req, res){
  Genre.findByIdAndUpdate(req.params.id, req.body, function(err, genre){
    res.redirect('/genres');
  });
};

exports.delete = function(req, res){
  Genre.findByIdAndRemove(req.params.id, function(err, artist){
    res.redirect('/genres');
  });
};