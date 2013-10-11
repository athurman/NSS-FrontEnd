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

  Δdb = new Firebase('https://stock-market-graph-at.firebaseio.com/');
  Δstocks= Δdb.child('stocks');
  Δfunds = Δdb.child('funds');

  Δstocks.on('child_added', stockAdded);
  Δfunds.on('value', balanceChanged);
}

function setFunds() {

}