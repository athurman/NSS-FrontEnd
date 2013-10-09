'use strict';

var Δdb;
var Δitems;
var items = [];
var sum = 0;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add_item').click(add);
  $('#save').click(save);

  Δdb = new Firebase('https://inventory-at.firebaseio.com/');
  Δitems = Δdb.child('items');
  Δdb.once('value', receivedDbData);
  Δitems.on('child_added', childAdded);
}

function childAdded(snapshot) {
  console.log(snapshot.val());
  var item = snapshot.val();
  items.push(item);
  addData(item);

  var amount = parseFloat(item.amount);
  var value = parseFloat(item.value);
  sum += amount * value;

  $('#total_cost').val('$' + sum);
}

function receivedDbData(snapshot) {
  var inventory = snapshot.val();
  $('#person').val(inventory.fullName);
  $('#address').val(inventory.address);

  // for(var property in inventory.items){
  //   var item = inventory.items[property];
  //   items.push(item);
  // }

  // for(var i = 0; i < items.length; i++) {
  //   addData(items[i]);
  // }
  for(var property in inventory.items) {
    var amount = inventory.items[property].amount;
    var value = inventory.items[property].value;

    amount = parseFloat(amount);
    value = parseFloat(value);

    sum += totalPerItem(amount, value);
  }
}

function save() {
  var fullName = $('#person').val();
  var address = $('#address').val();
  var inventory = {};
  inventory.fullName = fullName;
  inventory.address = address;

  Δdb.update(inventory); // .update only updates inventory data, does not override other data in the database (non-destructive)
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
