var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Genre = mongoose.model('Genre');
var _ = require('lodash');
/*
 * GET /songs
 */

exports.index = function(req, res){
  Song.find().populate('genres').exec(function(err, songs){
    res.render('songs/index', {title: 'mix it up | mixmaster', songs: songs});
  });
};

/*
 * GET /songs/new
 */

exports.new = function(req, res){
  Genre.find(function(err, genres){
    res.render('songs/new', {title: 'new mix | mixmaster', genres: genres});
  });
};

/*
 * POST /songs
 */

exports.create = function(req, res){
  new Song(req.body).save(function(songErr, song, count){
    if(songErr){
      Genre.find(function(genreErr, genres){
        res.render('songs/new', {title: 'New Song', song: new Song(), genres: genres, err: songErr});
      });
    } else {
      Genre.find().where('_id').in(song.genres).exec(function(err, genres){
        // This function: Find all genres where the id of the genre is the genre id in the Song model,
        // then go into those particulare Genre models and push the Song objectId into genre.songs array.
        for(var i = 0; i < genres.length; i++){
          genres[i].songs.push(song.id);
          genres[i].save();
        }
        res.redirect('/songs');
      });
    }
  });
};

/*
 * GET /songs/:id
 */

exports.show = function(req, res){
  Song.findOne(req.params.id).populate('genres').exec(function(err, song){
    res.render('songs/show', {title: 'Song ' + req.params.id, song: song});
  });
};

/*
 * DELETE /songs/:id
 */

exports.delete = function(req, res){
  Song.findByIdAndRemove(req.params.id, function(err, song){
    res.redirect('/songs');
  });
};

/*
 * GET /songs/:id/edit
 */

exports.edit = function(req, res){
  Genre.find(function(err, genres){
    Song.findById(req.params.id).populate('genres').exec(function(err, song){
      res.render('songs/edit', {title: 'Song ' + req.params.id + ' | Edit', song: song, genres: genres, _: _});
    });
  });
};

/*
 * GET /songs/:id/edit
 */

exports.update = function(req, res){
  Song.findById(req.params.id, function(err, oldSong){
    Genre.find().where('_id').in(oldSong.genres).exec(function(err, genres){
      for(var i = 0; i < genres.length; i++) {
        genres[i].songs.pull(oldSong.id);
        genres[i].save();
      }
    });
  });
  // function above removes the particular song edited from the Genre model.
  // function below updates Song model and pushes Song model Id into the Genre.songs array, updating the Genre model to include Song objectIds
  Song.findByIdAndUpdate(req.params.id).populate('genres').exec(function(err, song){
    Genre.find().where('_id').in(song.genres).exec(function(err, genres){
      for(var i = 0; i < genres.length; i++) {
        genres[i].songs.push(song.id);
        genres.save();
      }
    });
  });
};

