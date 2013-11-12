var mongoose = require('mongoose');
var _ = require('lodash');
var uniqueValidator = require('mongoose-unique-validator');

var User = mongoose.Schema({
  email     : {type: String, required: true, unique: true},
  password  : String,
  createdAt : {type: Date, default: Date.now}
});

User.plugin(uniqueValidator);
mongoose.model('User', User);