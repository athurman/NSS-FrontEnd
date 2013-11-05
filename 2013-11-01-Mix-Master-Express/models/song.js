var mongoose = require('mongoose');

var Song = mongoose.Schema({
  title: { type: String, required: [true, 'Title is required.'], match: [/^[a-zA-Z]+[a-zA-Z ]*$/, '{VALUE} is an invalid name.']},
  duration: {type: Number, required: [true, 'Durations is required'], match: [/^[1-9]+$/, '{VALUE} is an invalid duration.']},
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}],
  filename: {type: String, required: [true, 'Filename is required'], match: [/^[a-zA-Z][a-zA-Z-]*\.mp3$/, '{VALUE} is an invalid filename.']},
  art: {type: String, required: [true, 'Cover art is required'], match: [/^[a-zA-Z][a-zA-Z-]*\.(png|jpeg)$/, '{VALUE} is an invalid image.']},
  lyrics: String,
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Song', Song);

