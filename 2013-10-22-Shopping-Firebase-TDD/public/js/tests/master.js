'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  turnHandlersOff();
  turnHandlersOn();
  // Reset Global Variables Here
  initializeSchema();
  // Clean Out Test Database Here
  Δdb.remove();
}

function teardownTest(){
}

function createTestProduct(name, image, weight, price, discount){
  $('#product-image').val(image);
  $('#product-name').val(name);
  $('#product-weight').val(weight);
  $('#product-price').val(price);
  $('#percent-off').val(discount);
  $('#add-product').trigger('click');
}

function createTestCustomer(name, image, isDomestic){
  $('#customer-image').val(image);
  $('#customer-name').val(name);
  if(isDomestic) {
    $('#domestic')[0].checked = true;
  } else {
    $('#international')[0].checked = true;
  }
  $('#add-customer').trigger('click');
}

test('Add Product', function(){
  expect(12);

  $('#product-image').val('http://blogs-images.forbes.com/anthonykosner/files/2013/01/Martin-Hajek-ipad-mini-render.jpeg');
  $('#product-name').val('Ipad Air');
  $('#product-weight').val('1.0');
  $('#product-price').val('499.00');
  $('#percent-off').val('10');
  $('#add-product').trigger('click');

  equal(db.products.length, 1, 'Products array should have 1 element.');
  ok(db.products[0].id, 'id should be populated');
  ok(db.products[0] instanceof Product, 'the product should be an instance of Product');
  equal(db.products[0].img, 'http://blogs-images.forbes.com/anthonykosner/files/2013/01/Martin-Hajek-ipad-mini-render.jpeg', 'product should have an image');
  equal(db.products[0].name, 'Ipad Air', 'product should have name Ipad Air');
  equal(db.products[0].weight, 1.0, 'product should have weight of 1');
  equal(db.products[0].salePrice(), 449.1,'product should have sale price');

  equal($('#products tr').length, 2, 'should be 2 rows in table');
  equal($('#products tr:nth-child(2) > td').length, 6, 'should be 6 columns in table row');
  equal($('#products .product-name').text(), 'Ipad Air', 'table column name should be populated');
  equal($('#products .product-sale').text(), '$449.10', 'sale column should be populated');
  equal($('#products .product-img img').attr('src'), 'http://blogs-images.forbes.com/anthonykosner/files/2013/01/Martin-Hajek-ipad-mini-render.jpeg', 'table column name should be populated');


  // equal('actual-result', 'expected-result', 'description of assertion');
  // ok('result-that-is-true-or-false', 'description of assertion');
  // deepEqual('actual-result', 'expected-result', 'description of assertion');
});

// asyncTest('<name-of-feature>', function(){
//   expect(1);
// });

test('Product Pagination', function(){
  expect(18);

  for(var i = 0; i < 12; i++) {
    var name = Math.random().toString(36).substring(2);
    var image = Math.random().toString(36).substring(2) + '.png';
    var weight = Math.random() * 100;
    var price = Math.random() * 1000;
    var discount = Math.random() * 100;


    createTestProduct(name, image, weight, price, discount);
  }

  equal(db.products.length, 12, 'should have 15 products');
  equal(db.pagination.perPage, 5, 'Should be 5 products per page');
  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('#products tr').length, 6, 'should be 6 rows in table');
  equal($('#previous.hidden').length, 1, 'should not have previous button');
  equal($('#next:not(.hidden)').length, 1, 'next button should not be hidden');

  $('#next').trigger('click');

  equal(db.pagination.currentPage, 2, 'should be on second page');
  equal($('#products tr').length, 6, 'should be 6 rows in table');
  equal($('#previous:not(.hidden)').length, 1, 'should have previous button');
  equal($('#next:not(.hidden)').length, 1, 'next button should not be hidden');

  $('#next').trigger('click');

  equal(db.pagination.currentPage, 3, 'should be on third page');
  equal($('#products tr').length, 3, 'should have 2 products in table');
  equal($('#previous:not(.hidden)').length, 1, 'previous button should not be hidden');
  equal($('#next.hidden').length, 1, 'next button should be hidden');

  $('#previous').trigger('click');
  $('#previous').trigger('click');

  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('#products tr').length, 6, 'should be 6 rows in table');
  equal($('#previous.hidden').length, 1, 'should not have previous button');
  equal($('#next:not(.hidden)').length, 1, 'next button should not be hidden');
});

test('Add Customer', function(){
  expect(7);

  $('#customer-image').val('http://cdn.urbanislandz.com/wp-content/uploads/2012/08/bob-marley-reggae-music-icon.jpg');
  $('#customer-name').val('Bob Jenkins');
  $('#domestic')[0].checked = true;
  $('#add-customer').trigger('click');

  equal(db.customers.length, 1, 'should have 1 customer in array');
  ok(db.customers[0] instanceof Customer, 'should be an instance of Customer');
  equal(db.customers[0].name, 'Bob Jenkins', 'name should be present in db');
  equal(db.customers[0].img, 'http://cdn.urbanislandz.com/wp-content/uploads/2012/08/bob-marley-reggae-music-icon.jpg', 'image should be present in db');
  ok(db.customers[0].id, 'id should be present');
  ok(db.customers[0].isDomestic, 'should be domestic');

  ok(!$('#domestic')[0].checked, 'domestic should not be checked');
  // equal('actual-result', 'expected-result', 'description of assertion');
  // ok('result-that-is-true-or-false', 'description of assertion');
  // deepEqual('actual-result', 'expected-result', 'description of assertion');
});

test('Customer DropDown and Shopping Cart', function(){
  expect(7);

  for(var i = 0; i < 5; i++) {
    var name = Math.random().toString(36).substring(2);
    var image = Math.random().toString(36).substring(2) + '.png';
    var isDomestic = _.shuffle([true, false])[0];

    createTestCustomer(name, image, isDomestic);
  }

  createTestCustomer('Bob', 'bob.png', true);
  equal(db.customers.length, 6, 'should have 6 customers');
  equal($('select#select-customer option').length, 7, 'should have 6 option tags');
  equal($('select#select-customer option:nth-child(1)').val(), 'Bob', 'first option should be bob');
  equal($('select#select-customer option:nth-child(1)').text(), 'Bob', 'first option text should be bob');
  ok($('table#cart').length, 'shopping cart should be visible');
  equal($('table#cart th').length, 6, 'should be 6 columns'); // table headers: Name, Count, Amount, Weight, Shipping Cost, Total
  ok($('#purchase').length, 'purchase button should be visible');
});

test('Add Items to Shopping Cart', function(){
  expect(19);
  createTestProduct('iPad Air', 'ipad-air.png', 1, 500.00, 10); // saleprice: 450
  createTestProduct('iPhone 5S', 'iphone-5s.png', 0.5, 200.00, 0); // saleprice: 200
  createTestProduct('Apple TV', 'apple-tv.png', 1.5, 100.00, 5); // saleprice: 95

  createTestCustomer('Bob', 'bob.png', true);
  createTestCustomer('Sally', 'sally.png', false);

  $('#select-customer').val('Sally');
  $('select#select-customer').trigger('change');

  // 2 iPhone 5S Products added to Cart
  $('#products tr:nth-child(3) .product-img img').trigger('click');
  $('#products tr:nth-child(3) .product-img img').trigger('click');
  // 1 iPad Air
  $('#products tr:nth-child(2) .product-img img').trigger('click');
  // 1 Apple TV
  $('#products tr:nth-child(4) .product-img img').trigger('click');

  equal(db.cart.customer.name, 'Sally', 'Sally is ordering');
  ok(db.cart.customer instanceof Customer, 'Sally should be a customer');
  equal(db.cart.products.length, 4, 'should be 4 items in shopping cart');
  ok(db.cart.products[0] instanceof Product, 'should be instance of product');
  equal(db.cart.totals.count(), 4, '4 should be the total number of items in cart');
  equal(db.cart.totals.amount(), 945, 'the total price of items is 945');
  equal(db.cart.totals.weight(), 3.5, 'weight total should be 3.5');

  // domestic: .50 lb / international $1.50 lb
  equal(db.cart.totals.shipping(), 5.25, 'total shipping should be 5.25');
  equal(db.cart.totals.grand(), 950.25, 'grand total should be 950.25');

  equal($('#cart thead tr').length, 1, 'should be a header');
  equal($('#cart tfoot tr').length, 1, 'should be a footer');
  equal($('#cart tbody tr').length, 3, 'should be 3 items in body');

  equal($('#cart tbody tr:nth-child(1) .product-name').text(), 'iPhone 5S', 'name should be iphone 5s');
  equal($('#cart tbody tr:nth-child(1) .product-count').text(), '2', 'count should be 2');

  equal($('#cart tfoot tr #cart-count').text(), '4', 'should have 4 items in cart');
  equal($('#cart tfoot tr #cart-amount').text(), '$945.00', 'should have $945.00 in amount');
  equal($('#cart tfoot tr #cart-weight').text(), '3.50 lbs', 'should have 3.5 lbs for weight');
  equal($('#cart tfoot tr #cart-shipping').text(), '$5.25', 'should have $5.25 for shipping');
  equal($('#cart tfoot tr #cart-grand').text(), '$950.25', 'should have $950.25 for grand');
});

test('Add Order', function(){
  expect(14);

  createTestProduct('iPad Air', 'ipad-air.png', 1, 500.00, 10); // saleprice: 450
  createTestProduct('iPhone 5S', 'iphone-5s.png', 0.5, 200.00, 0); // saleprice: 200
  createTestProduct('Apple TV', 'apple-tv.png', 1.5, 100.00, 5); // saleprice: 95

  createTestCustomer('Bob', 'bob.png', true);
  createTestCustomer('Sally', 'sally.png', false);

  $('#select-customer').val('Sally');
  $('select#select-customer').trigger('change');

  // 2 iPhone 5S Products added to Cart
  $('#products tr:nth-child(3) .product-img img').trigger('click');
  $('#products tr:nth-child(3) .product-img img').trigger('click');
  // 1 iPad Air
  $('#products tr:nth-child(2) .product-img img').trigger('click');
  // 1 Apple TV
  $('#products tr:nth-child(4) .product-img img').trigger('click');

  $('#purchase').trigger('click');

  equal($('#cart tbody tr').length, 0, 'should be no rows in tbody after purchasae');
  equal($('#cart-grand').text(), '', 'should be no grand total after purchase');
  equal($('#select-customer').val(), 'default', 'dropdown value should be default');
  equal(db.orders.length, 1, 'should be one order after purchase');
  ok(db.orders[0] instanceof Order, 'should be an order instance');
  ok(db.orders[0].id, 'should have an ID after purchase');
  equal($('#orders thead th').length, 7, 'should have 7 columns in orders table');
  equal($('#orders tbody tr').length, 1, 'should have 1 row in orders table body');
  equal($('#orders tbody .order-time').text().split(' ').length, 5, 'date time should be formatted');
  equal($('#orders tbody .order-customer').text(), 'Sally', 'Should have customers name');
  equal($('#orders tbody .order-total').text(), '$945.00', 'Should have customers total');
  equal($('#orders tbody .order-shipping').text(), '$5.25', 'Should have customers shipping');
  equal($('#orders tbody .order-grand').text(), '$950.25', 'Should have customers grand');
  equal($('#orders tbody .order-products-list li').length, 4, 'should have 4 items in order.');
});



