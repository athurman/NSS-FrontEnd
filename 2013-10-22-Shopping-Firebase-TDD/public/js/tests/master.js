'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  turnHandlersOff();
  turnHandlersOn();
  // Reset Global Variables Here
  db.products = [];
  db.customers = [];
  db.orders = [];
  db.pagination.currentPage = 1;
  db.pagination.currentRowCount =0;
  // Clean Out Test Database Here
  Δdb.remove();
}

function teardownTest(){
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
  equal($('#products tr').length, 3, 'should be 2 rows in table');
  ok($('#previous').hasClass('hidden'), 'should have previous button');
  ok(!$('#next').hasClass('hidden'), 'next button should be hidden');

  $('#next').trigger('click');
  $('#next').trigger('click');

  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('#products tr').length, 6, 'should be 6 rows in table');
  equal($('#previous.hidden').length, 1, 'should not have previous button');
  equal($('#next:not(.hidden)').length, 1, 'next button should not be hidden');
});

function createTestProduct(name, image, weight, price, discount){
  $('#product-image').val(image);
  $('#product-name').val(name);
  $('#product-weight').val(weight);
  $('#product-price').val(price);
  $('#percent-off').val(discount);
  $('#add-product').trigger('click');
}
