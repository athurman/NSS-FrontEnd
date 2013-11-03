var mongoose = require('mongoose');

var Song = mongoose.Schema({
  title: String,
  duration: Number,
  genres: [String],
  filename: String,
  art: String,
  lyrics: String,
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Song', Song);

