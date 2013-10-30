var database = require('../modules/database');
/*
 * GET /people
 */

exports.index = function(req, res){
  var people = database.read(__dirname + '/../db/people.json');
  res.render('people/index', { title: 'Address Book | People', people: people });
};

/*
 * GET /people/new
 */


exports.new = function(req, res){
  var people = database.read(__dirname + '/../db/people.json');
  res.render('people/new', { title: 'Address Book | New', people: people });
};


/*
 * POST /people
 */


exports.create = function(req, res){
  var name = req.body.name;
  var gender = req.body.gender;
  var age = parseInt(req.body.age);
  var color = req.body.color;

  var people = database.read(__dirname + '/../db/people.json');
  var person = {name: name, gender: gender, age: age, color: color};
  people.push(person);
  database.write(__dirname + '/../db/people.json', people);

  res.redirect('/people');
};