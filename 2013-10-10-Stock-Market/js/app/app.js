'use strict';

// Firebase Schema
var Δdb;
var Δstocks;
var Δstatistics;

// Local Schema
var db = {};
db.stocks = [];
db.statistics = {};


$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add_funds').click(setFunds);
  $('#buy').click(setStock);

  Δdb = new Firebase('https://stock-market-at.firebaseio.com/');
  Δstocks = Δdb.child('stocks');
  Δstatistics = Δdb.child('statistics');
  Δstocks.on('child_added', stockAdded);
}

function stockAdded(snapshot) {
  var stock = snapshot.val();
  addItem(stock);
}

function getStockQoute() {
  var data = {};
  data.symbol = $('#symbol').val();
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, getData); // jQuery.getJSON( url [, data ] [, success( data, textStatus, jqXHR ) ] )
}

function getData(data) {
  debugger;
  var stock = {};

  var symbol = data.Data.Symbol;
  var name = data.Data.Name;
  var quote = parseFloat(data.Data.LastPrice);
  var quantity = parseInt($('#quantity').val());
  var total = quote * quantity;

  stock.symbol = symbol;
  stock.name = name;
  stock.boughtPrice = quote;
  stock.purchased = quantity;
  stock.total = total;

  Δstocks.push(stock);
}

function receiveQuote(data, textStatus, jqXHR) {
  console.log(data);
  console.log(textStatus);
  console.log(jqXHR);
}

function setFunds() {
  var funds = parseFloat($('#funds').val());
  $('#create_funds').text('Current Funds: $' + funds);
  $('#add_funds').hide();
  $('#funds').hide();
}

function setStock() {
  getStockQoute();

}

function addItem(stock) {
  var row = '<tr><td class="symbol"></td><td class="name"></td><td class="quote"></td><td class="purchased"></td><td class="total"></td></tr>';
  var $row = $(row);

  $row.children('.symbol').text(stock.symbol);
  $row.children('.name').text(stock.name);
  $row.children('.quote').text(stock.boughtPrice);
  $row.children('.purchased').text(stock.purchased);
  $row.children('.total').text(stock.total);

  $('#stock_list').append($row);
}