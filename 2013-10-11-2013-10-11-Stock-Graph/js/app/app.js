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
  Δdb = new Firebase('https://stock-market-graph-at.firebaseio.com/');
}
