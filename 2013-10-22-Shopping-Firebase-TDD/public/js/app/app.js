'use strict';

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

// Firebase Schema
var Δdb;
var Δproducts;
var Δcustomers;
var Δorders;

// Local Schema (defined in keys.js)
db.products = [];
db.customers = [];
db.orders = [];
db.pagination = {};
db.pagination.perPage = 5;
db.pagination.currentPage = 1;
db.pagination.currentRowCount = 0;

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  initializeDatabase();
  turnHandlersOn();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initializeDatabase(){
  Δdb = new Firebase(db.keys.firebase);
  Δproducts = Δdb.child('products');
  Δcustomers = Δdb.child('customers');
  Δorders = Δdb.child('orders');
  Δproducts.on('child_added', dbProductAdded);
  Δcustomers.on('child_added', dbCustomerAdded);
  Δorders.on('child_added', dbOrderAdded);
}

function turnHandlersOn(){
  $('#add-product').on('click', clickAddProduct);
  $('#next').on('click', clickNext);
}

function turnHandlersOff(){
  $('#add-product').off('click');
  $('#next').off('click');
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -----------------------CLICK HANDLERS BELOW------------------------- //

function clickAddProduct() {
  var imageSrc = getValue('#product-image');
  var name = getValue('#product-name');
  var price = getValue('#product-price', parseFloat);
  var discount = getValue('#percent-off', parseInt) / 100;
  var weight = getValue('#product-weight', parseFloat);

  var product = new Product(imageSrc, name, price, discount, weight);
  delete product.salePrice;
  Δproducts.push(product);
}

function clickNext() {
  db.pagination.currentPage++;
  db.pagination.currentRowCount = 0;
  $('.product-row').remove();
  var startIndex = db.pagination.perPage * (db.pagination.currentPage - 1);
  var endLength = (startIndex + db.pagination.perPage) > db.products.length ? db.products.length : startIndex + db.pagination.perPage;
  for(var i = startIndex; i < endLength; i++) {
    htmlAddRow(db.products[i]);
  }

  if(db.pagination.currentPage > 1) {
    htmlShowPrevButton();
  }
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -----------------------OBJECT HANDLERS BELOW------------------------ //

function Product(image, name, price, discount, weight) {
  this.img = image;
  this.name = name;
  this.price = price;
  this.discount = discount;
  this.weight = weight;
  this.salePrice = function() {return this.price - (this.price * this.discount);};
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -----------------------DB FUNCTIONS BELOW--------------------------- //

function dbProductAdded(snapshot) {
  var obj = snapshot.val();
  var product = new Product(obj.img, obj.name, obj.price, obj.discount, obj.weight);
  product.id = snapshot.name();
  db.products.push(product);
  if(db.pagination.currentRowCount < db.pagination.perPage) {
    htmlAddRow(product);
  } else {
    htmlShowNextButton();
  }
}

function dbCustomerAdded(snapshot) {

}

function dbOrderAdded(snapshot) {

}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -----------------------HTML FUNCTIONS BELOW------------------------- //

function htmlAddRow(product) {
  db.pagination.currentRowCount++;
  var row = '<tr><td class="product-name"></td><td class="product-img"></td><td class="product-weight"></td><td class="product-price"></td><td class="product-discount"></td><td class="product-sale"></td></tr>';
  var $row = $(row);
  $row.addClass('product-row');
  var $img = $('<img>');
  $img.attr('src', product.img).addClass('product-image');

  $row.children('.product-name').text(product.name);
  $row.children('.product-img').append($img);
  $row.children('.product-weight').text(product.weight);
  $row.children('.product-price').text(formatCurrency(product.price));
  $row.children('.product-discount').text(product.discount);
  $row.children('.product-sale').text(formatCurrency(product.salePrice()));

  $('#products').append($row);
}

function htmlShowNextButton() {
  if($('#next').hasClass('hidden')) {
    $('#next').removeClass('hidden');
  }
}

function htmlHideNextButton() {
  if(!$('#next').hasClass('hidden')) {
    $('#next').addClass('hidden');
  }
}

function htmlShowPrevButton() {
  if($('#previous').hasClass('hidden')) {
    $('#previous').removeClass('hidden');
  }
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

// function parseUpperCase(string){
//   return string.toUpperCase();
// }

// function parseLowerCase(string){
//   return string.toLowerCase();
// }

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
