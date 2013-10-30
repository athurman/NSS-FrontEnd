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

function initializeSchema() {
  db.constants = {};
  db.constants.domesticShipping = 0.50;
  db.constants.internationalShipping = 1.50;

  db.products = [];
  db.customers = [];
  db.orders = [];
  db.orders.revenue = 0;

  db.pagination = {};
  db.pagination.perPage = 5;
  db.pagination.currentPage = 1;
  db.pagination.currentRowCount = 0;

  db.cart = new Cart();
}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  initializeSchema();
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
  $('#products').on('click', 'img', clickProducttoCart);
  $('#select-customer').on('change', changeCustomer);
  $('#purchase').on('click', clickAddOrder);
}

function turnHandlersOff(){
  $('#add-product').off('click');
  $('#previous').off('click');
  $('#next').off('click');
  $('#add-customer').off('click');
  $('#products').off('click');
  $('#select-customer').off('change');
  $('#purchase').off('click');
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

function clickProducttoCart() {
  if(db.cart.customer){
    var name = $(this).parent().prev().text();
    var product = _.find(db.products, function(p){return p.name === name;});
    db.cart.products.push(product);
    htmlAddCartRow(product);
    htmlUpdateCartTotals();
  }
}

function changeCustomer() {
  var name = this.value;
  var customer = _.find(db.customers, function(cust){return cust.name === name;});
  db.cart.customer = customer;
}

function clickAddOrder() {
  if(db.cart) {
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    var customer = db.cart.customer;
    var products = db.cart.products;
    var amount = db.cart.totals.amount();
    var shipping = db.cart.totals.shipping();
    var grand = db.cart.totals.grand();
    var weight = db.cart.totals.weight();

    for(var i = 0; i < products.length; i++) {
      var product = products[i];
      delete product.salePrice;
    }

    var order = new Order(time, customer, products, amount, weight, shipping, grand);
    Δorders.push(order);
    db.cart = new Cart();
    htmlResetCart();
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

function Cart() {
  var save = this; // save variable saves "this" to point at the Cart object, so to use in deeper functions.
  // if you create a local variable in a function, it is thrown away.
  // because we are using this variable within another function (ex. this.totals.amount), it is considered a Closure.
  this.customer = null;
  this.products = [];
  this.totals = {};
  this.totals.count = function(){return save.products.length;};
  this.totals.amount = function(){return _.reduce(save.products, function(memo, product){return memo + product.salePrice();}, 0);}; // Currently, "this" = db.cart.totals.
  // reduce underscore function: 1. Passes in save.products 2. use a function to total up 2 parameters, memo and product (ie the singular of the array passed in -- save.products)
  // 3. function computes memo (0) + product.salePrice(). 4.  Loops over all objects within products array and sums up all sale price properties.
  this.totals.weight = function(){return _.reduce(save.products, function(memo, product){return memo + product.weight;}, 0);};
  this.totals.shipping = function(){return this.weight() * (save.customer.isDomestic ? db.constants.domesticShipping : db.constants.internationalShipping);}; // save is global compared to what is outside this particular local function.
  this.totals.grand = function(){return this.amount() + this.shipping();};
}

function Order(time, customer, products, amount, weight, shipping, grand) {
  this.time = time;
  this.customer = customer;
  this.products = products;
  this.amount = amount;
  this.weight = weight;
  this.shipping = shipping;
  this.grand = grand;
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
  htmlAddOption(customer);
}

function dbOrderAdded(snapshot) {
  var obj = snapshot.val();
  var order = new Order(obj.time, obj.customer, obj.products, obj.amount, obj.weight, obj.shipping, obj.grand);
  var products = order.products;
  order.products = [];
  order.id = snapshot.name();

  for(var i = 0; i < products.length; i++) {
    var product = new Product(products[i].img, products[i].name, products[i].price, products[i].discount, products[i].weight);
    order.products.push(product);
  }

  db.orders.push(order);
  htmlAddOrderRow(order);
  db.orders.revenue += order.grand;
  $('#revenue').text(formatCurrency(db.orders.revenue));
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
  $('input[name="address"]:checked')[0].checked = false;
}

function htmlAddOption(customer) {
    var $option = $('<option>').val(customer.name).text(customer.name);
    $('#select-customer').prepend($option);
  }

function htmlResetCart()  {
  $('#select-customer').val('default');
  $('#cart tbody').empty();
  $('#cart tfoot td').text('');
}

function htmlAddCartRow(product) {
  var count, $tr, tr;
  var $tds = $('#cart tbody .product-name');
  var foundTd = _.find($tds, function(td){return td.innerText === product.name;});

  if(foundTd){
    count = parseInt($(foundTd).next().text(), 10);
    count++;
    $tr = $(foundTd).parent();
  } else {
    count = 1;
    tr = '<tr><td class="product-name"></td><td class="product-count"></td><td class="product-amount"></td><td class="product-weight"></td><td class="product-shipping"></td><td class="product-grand"></td></tr>';
    $tr = $(tr);
    $('#cart tbody').append($tr);
  }

  var amount = product.salePrice() * count;
  var weight = product.weight * count;
  var shipping = weight * (db.cart.customer.isDomestic ? db.constants.domesticShipping : db.constants.internationalShipping);
  var grand = amount + shipping;

  $tr.children('.product-name').text(product.name);
  $tr.children('.product-count').text(count);
  $tr.children('.product-amount').text(formatCurrency(amount));
  $tr.children('.product-weight').text(weight.toFixed(2) + ' lbs');
  $tr.children('.product-shipping').text(formatCurrency(shipping));
  $tr.children('.product-grand').text(formatCurrency(grand));
}

function htmlUpdateCartTotals(){
  $('#cart-count').text(db.cart.totals.count());
  $('#cart-amount').text(formatCurrency(db.cart.totals.amount()));
  $('#cart-weight').text(db.cart.totals.weight().toFixed(2) + ' lbs');
  $('#cart-shipping').text(formatCurrency(db.cart.totals.shipping()));
  $('#cart-grand').text(formatCurrency(db.cart.totals.grand()));
}

function htmlAddOrderRow(order) {
  var row = '<tr><td class="order-id"></td><td class="order-time"></td><td class="order-customer"></td><td class="order-products-list"></td><td class="order-total"></td><td class="order-shipping"></td><td class="order-grand"></td></tr>';
  var $row = $(row);
  var $ol = $('<ol>');

  for(var i = 0; i < order.products.length; i++) {
    var $li = $('<li>').text(order.products[i].name);
    $ol.append($li);
  }

  $row.children('.order-id').text(order.id);
  $row.children('.order-time').text(order.time);
  $row.children('.order-customer').text(order.customer.name);
  $row.children('.order-products-list').append($ol);
  $row.children('.order-total').text(formatCurrency(order.amount));
  $row.children('.order-shipping').text(formatCurrency(order.shipping));
  $row.children('.order-grand').text(formatCurrency(order.grand));

  $('#orders').append($row);
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
