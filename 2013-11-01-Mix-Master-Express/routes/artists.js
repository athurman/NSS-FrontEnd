var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Artist = mongoose.model('Artist');

exports.index = function(req, res){
  Artist.find(function(err, artists){
    res.render('artists/index', {title: 'artists | mixmaster', artists: artists});
  });
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

exports.show = function(req, res){
  Artist.findOne(req.params.id).populate('songs').exec(function(err, artist) {
    console.log(artist.songs);
    res.render('artists/show', {title: 'Artist ' + req.params.id, artist: artist});
  });
    // .findOne({ id: req.params.id });
    // console.log(artist);
    // .populate('song');
    // .exec(function (err, artist) {
    //   console.log('The creator is %s', artist.song.title);
    // });
};


exports.delete = function(req, res){
  Artist.findByIdAndRemove(req.params.id, function(err, artist){
    res.redirect('/artists');
  });
};

