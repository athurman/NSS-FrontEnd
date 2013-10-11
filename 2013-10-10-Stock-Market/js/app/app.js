'use strict';

// Firebase Schema
var Δdb;
var Δstocks;
var Δstatistics;

// Local Schema
var db = {};
db.stocks = [];
db.statistics = {};
db.statistics.balance = 0;
db.statistics.total = 0;


$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add_funds').click(setFunds);
  $('#buy').click(setStock);
  $('#add_interval').click(setInterval);

  Δdb = new Firebase('https://stock-market-at.firebaseio.com/');
  Δstocks = Δdb.child('stocks');
  Δstatistics = Δdb.child('statistics');
  Δstocks.on('child_added', stockAdded);
  Δstatistics('child_added', statAdded);
}

function stockAdded(snapshot) {
  var stock = snapshot.val();
  addItem(stock);

  if(db.statistics.balance !== 0) {
    updateBalance(parseFloat(stock.total));
  }
}

function statAdded(snapshot) {
  var stat = snapshot.val();
}

function getStockQuote(symbol, fn) {
  var data = {};
  data.symbol = $('#symbol').val();
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn); // jQuery.getJSON( url [, data ] [, success( data, textStatus, jqXHR ) ] )
}

function setFunds() {
  var funds = parseFloat($('#funds').val());
  db.statistics.balance = funds;

  $('#balance').val('$' + funds);
  Δstatistics.set({'balance': db.statistics.balance});
}

function setStock() {

  getStockQuote(symbol, function(data){
    var stock = {};

    var symbol = data.Data.Symbol;
    var name = data.Data.Name;
    var price = parseFloat(data.Data.LastPrice);
    var quote = price.toFixed(2);
    var quantity = parseInt($('#quantity').val(), 10);
    var total = quote * quantity;

    stock.symbol = symbol;
    stock.name = name;
    stock.boughtPrice = quote;
    stock.purchased = quantity;
    stock.total = total;

    Δstocks.push(stock);
  });
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

function updateBalance(total) {
  db.statistics.balance -= total;
  $('#balance').val('$' + db.statistics.balance);
  Δstatistics.update({'balance': db.statistics.balance});
}

// function getData(data) {
//   var stock = {};

//   var symbol = data.Data.Symbol;
//   var name = data.Data.Name;
//   var quote = parseFloat(data.Data.LastPrice);
//   var quantity = parseInt($('#quantity').val(), 10);
//   var total = quote * quantity;

//   stock.symbol = symbol;
//   stock.name = name;
//   stock.boughtPrice = quote;
//   stock.purchased = quantity;
//   stock.total = total;

//   Δstocks.push(stock);
// }
