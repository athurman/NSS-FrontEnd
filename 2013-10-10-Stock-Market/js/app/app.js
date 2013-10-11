'use strict';

// Firebase Schema
var Δdb;
var Δstocks;
var Δstatistics;

// Local Schema
var db = {};
db.stocks = [];
db.stats = {};
db.stats.funds = 0;
db.stats.total = 0;

var timer = 0;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add_funds').click(setFunds);
  $('#buy').click(setStock);
  $('#add_interval').click(addTimer);

  Δdb = new Firebase('https://stock-market-at.firebaseio.com/');
  Δstocks = Δdb.child('stocks');
  Δstatistics = Δdb.child('statistics');
  Δstatistics.on('value', balanceChanged);
  Δstocks.on('child_added', stockAdded);
}

function stockAdded(snapshot) {
  var stock = snapshot.val();
  addItem(stock);
  getTotal(stock);

  db.stocks.push(stock);
}

function getStockQuote(symbol, fn) {
  var data = {};
  data.symbol = symbol;
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn); // jQuery.getJSON( url [, data ] [, success( data, textStatus, jqXHR ) ] )
}

function setFunds() {
  db.stats.funds = parseFloat($('#funds').val());
  $('#balance').val('$' + db.stats.funds);
  Δstatistics.set(db.stats);
}

function setStock() {
  var symbol = $('#symbol').val();

  getStockQuote(symbol, function(data){
    var stock = {};

    var symbol = data.Data.Symbol;
    var name = data.Data.Name;
    var price = parseFloat(data.Data.LastPrice);
    var quote = price.toFixed(2);
    var currentPrice = parseFloat(data.Data.LastPrice);
    var quantity = parseInt($('#quantity').val(), 10);
    var total = quote * quantity;

    stock.symbol = symbol;
    stock.name = name;
    stock.boughtPrice = quote;
    stock.currentPrice = currentPrice;
    stock.itemsPurchased = quantity;
    stock.total = total;

    Δstocks.push(stock);

    db.stats.funds -= total;
    $('#balance').val('$' + db.stats.funds);
  });
}

function addItem(stock) {
  var row = '<tr><td class="symbol"></td><td class="name"></td><td class="purchased_quote"></td><td class="current_quote"></td><td class="purchased"></td><td class="total"></td></tr>';
  var $row = $(row);
  $row.addClass(stock.symbol).addClass('stock');

  $row.children('.symbol').text(stock.symbol);
  $row.children('.name').text(stock.name);
  $row.children('.purchased_quote').text(stock.boughtPrice);
  $row.children('.current_quote').text(stock.currentPrice);
  $row.children('.purchased').text(stock.itemsPurchased);
  $row.children('.total').text(stock.total.toFixed(2));

  $('#stock_list').append($row);
}

function getTotal(stock) {
  db.stats.total += (stock.boughtPrice * stock.itemsPurchased);
  $('#total').val('$' + db.stats.total.toFixed(2));
  Δstatistics.set(db.stats);
}

function balanceChanged(snapshot) {
  var stats = snapshot.val();
  db.stats.funds = stats.funds;
  $('#balance').val('$' + db.stats.funds);
}

function addTimer() {
  var delay = parseFloat($('#interval').val());
  var seconds = delay * 1000;

  timer = setInterval(updateStockPrice, seconds);
}

function updateStockPrice() {

  getStockQuote(db.stocks[0].symbol, function(data){
    var currentPrice = parseFloat(data.Data.LastPrice);
    $('#home').next().children('.current_quote').text('$' + currentPrice);


  });
}

