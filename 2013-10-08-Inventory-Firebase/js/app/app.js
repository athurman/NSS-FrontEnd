'use strict';

// Database Schema
var Δdb;
var Δitems;
var Δperson;

// Local Schema
var db = {};
db.person = {};
db.items = [];
db.statistics = {};
db.statistics.sum = 0;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add_item').click(add);
  $('#save').click(save);

  Δdb = new Firebase('https://inventory-at.firebaseio.com/');
  Δitems = Δdb.child('items');
  Δperson = Δdb.child('person');
  Δperson.on('value', personChanged);
  Δitems.on('child_added', itemAdded);
}

function itemAdded(snapshot) {
  console.log(snapshot.val());
  var item = snapshot.val();
  addData(item);
  sumTotal(item);
  db.items.push(item);
}

function sumTotal(item) {
  var amount = parseFloat(item.amount);
  var value = parseFloat(item.value);
  db.statistics.sum += amount * value;

  $('#total_cost').val('$' + db.statistics.sum);
}

function personChanged(snapshot) {
  db.person = snapshot.val();

  try {
    $('#person').val(db.person.fullName);
    $('#address').val(db.person.address);
  } catch(err) {
    console.log('Error found: ' + err);
  }
}

  // for(var property in inventory.items){
  //   var item = inventory.items[property];
  //   items.push(item);
  // }

  // for(var i = 0; i < items.length; i++) {
  //   addData(items[i]);
  // }

function save() {
  var fullName = $('#person').val();
  var address = $('#address').val();
  db.person.fullName = fullName;
  db.person.address = address;

  Δperson.set(db.person); // .update only updates inventory data, does not override other data in the database (non-destructive)
}

function add() {
  var name = $('#name').val();
  var amount = $('#amount').val();
  var value = $('#value').val();
  var room = $('#room').val();
  var condition = $('#condition').val();
  var date = $('#date').val();

  var item = {};
  item.name = name;
  item.amount = amount;
  item.value = value;
  item.room = room;
  item.condition = condition;
  item.date = date;

  Δitems.push(item);
}

function addData(item) {
  var row = '<tr><td class="name"></td><td class="amount"></td><td class="cost"></td><td class="room"></td><td class="condition"></td><td class="date"></td></tr>';
  var $row = $(row);

  $row.children('.name').text(item.name);
  $row.children('.amount').text(item.amount);
  $row.children('.cost').text('$' + item.value);
  $row.children('.room').text(item.room);
  $row.children('.condition').text(item.condition);
  $row.children('.date').text(item.date);

  $('#items').append($row);
}
