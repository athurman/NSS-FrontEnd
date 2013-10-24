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
  $('#previous').on('click', clickNavigation);
  $('#next').on('click', clickNavigation);
  $('#add-customer').on('click', clickAddCustomer);
}

function turnHandlersOff(){
  $('#add-product').off('click');
  $('#previous').off('click');
  $('#next').off('click');
  $('#add-customer').off('click');
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

function clickAddCustomer() {
  var image = getValue('#customer-image');
  var name = getValue('#customer-name');
  var isDomestic = $('#domestic')[0].checked;
  resetRadio();

  var customer = new Customer(image, name, isDomestic);
  Δcustomers.push(customer);
}

function clickNavigation(){
  db.pagination.currentRowCount = 0;
  htmlDeleteRows();

  var isPrevious = this.id === 'previous';
  db.pagination.currentPage += isPrevious ? -1 : +1;

  var startIndex = db.pagination.perPage * (db.pagination.currentPage - 1);
  var endLength = (startIndex + db.pagination.perPage) > db.products.length ? db.products.length : startIndex + db.pagination.perPage;
  var isLess = startIndex > 0;
  var isMore = db.products.length > endLength;

  htmlShowHideNavigation('#previous', isLess);
  htmlShowHideNavigation('#next', isMore);

  for(var i = startIndex; i < endLength; i++){
    htmlAddRow(db.products[i]);
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

function Customer(image, name, isDomestic) {
  this.img = image;
  this.name = name;
  this.isDomestic = isDomestic;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -----------------------DB FUNCTIONS BELOW--------------------------- //

function dbProductAdded(snapshot) {
  var obj = snapshot.val();
  var product = new Product(obj.img, obj.name, obj.price, obj.discount, obj.weight);
  product.id = snapshot.name();
  db.products.push(product);
  if(db.pagination.currentRowCount < db.pagination.perPage){
    htmlAddRow(product);
  } else {
    htmlShowHideNavigation('#next', true);
  }
}

function dbCustomerAdded(snapshot) {
  var obj = snapshot.val();
  var customer = new Customer(obj.img, obj.name, obj.isDomestic);
  customer.id = snapshot.name();
  db.customers.push(customer);
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

function htmlShowHideNavigation(selector, shouldShow){
  $(selector).removeClass('hidden');

  if(!shouldShow){
    $(selector).addClass('hidden');
  }
}

function htmlDeleteRows() {
  $('.product-row').remove();
}

function resetRadio() {
  $('#domestic')[0].checked = false;
  $('#international')[0].checked = false;
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
