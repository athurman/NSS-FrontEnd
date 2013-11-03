var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Artist = mongoose.model('Artist');

exports.index = function(req, res){
  res.render('artists/index', {title: 'artists | mixmaster'});
};

exports.new = function(req, res){
  Song.find(function(err, songs){
    res.render('artists/new', {title: 'new artist | mixmaster', songs: songs});
  });
};

exports.create = function(req, res){
  new Artist(req.body).save(function(err, artist, count){
    console.log(artist);
    res.redirect('/artists');
  });

};