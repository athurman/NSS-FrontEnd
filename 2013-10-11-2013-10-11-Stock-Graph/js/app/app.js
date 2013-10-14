'use strict';

// Firebase Schema
var Δdb;
var Δstocks;
var Δfunds;

// Local Schema
var db = {};
db.stocks = [];
db.funds = {};

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add_funds').click(setFunds);
  $('#buy_stock').click(setStock);

  Δdb = new Firebase('https://stock-market-graph-at.firebaseio.com/');
  Δstocks= Δdb.child('stocks');
  Δfunds = Δdb.child('funds');

  Δstocks.on('child_added', stockAdded);
  Δfunds.on('value', balanceChanged);
}

function stockAdded(snapshot) {
  var stock = snapshot.val();
  // addItem(stock);
  console.log(stock);
  db.stocks.push(stock);
}

function setFunds() {
  db.funds = parseFloat($('#funds').val());
  $('#balance').val('$' + db.funds);
  Δfunds.set(db.funds);
}

function getStockQuote(symbol, fn) {
  var data = {symbol: symbol};
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn); // jQuery.getJSON( url [, data ] [, success( data, textStatus, jqXHR ) ] )
}

function balanceChanged(snapshot) {
  var stats = snapshot.val();
  if(!stats){
    db.funds = 0;
  } else {
    db.funds = stats;
  }
  $('#balance').val('$' + db.funds);
}

function setStock() {
  debugger;
  var symbol = $('#symbol').val().toUpperCase();
  var quantity = parseInt($('#quantity').val(), 10);

  getStockQuote(symbol, function(data){
    console.log(data);
    var quote = data.Data;

    var stock = {};

    stock.symbol = quote.Symbol;
    stock.name = quote.Name;
    stock.price = quote.LastPrice;
    stock.quantity = quantity;
    stock.boughtPrice = quote.LastPrice;
    if (stock.price * stock.quantity < db.funds) {
      Δstocks.push(stock);
      $('#symbol').val('');
      $('#quantity').val('');
      db.funds -= quote.LastPrice * quantity;
      $('#balance').val('$' + db.funds.toFixed(2));
    }
  });
}