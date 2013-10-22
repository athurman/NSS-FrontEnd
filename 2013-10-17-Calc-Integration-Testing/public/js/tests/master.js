'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){
}

test('Calculate 2 numbers', function(){
  expect(4);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  deepEqual($('#op1').val(), '', 'op1 should be blank'); // (assertion, expected, description)
  deepEqual($('#op2').val(), '', 'op2 should be blank'); // (assertion, expected, description)
  deepEqual($('#operator').val(), '', 'operator should be blank'); // (assertion, expected, description)
  deepEqual($('#result').text(), '6', 'result should be 6');
});

test('Create History for 2 Formulas', function(){
  expect(6);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  deepEqual($('#history > li').length, 2, 'should be 2 LIs'); // (assertion, expected, description)
  deepEqual($('#history > li:first-child > span').length, 6, 'should have 6 spans');
  deepEqual($('#history > li:first-child > span:first-child').hasClass('op1'), true, '1st span should have class .op1');
  deepEqual($('#history > li:first-child > span:nth-child(2)').hasClass('operator'), true, '2nd span should have class .operator');
  deepEqual($('#history > li:first-child').text(), '7*8 = 56', 'ensure 1st li is last formula');
  deepEqual($('#history > li:last-child').text(), '3+2 = 5', 'ensure last li is 1st formula');
});

test('Remove LI with dynamic button', function(){
  expect(3);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#history > li:first-child');
  $('#history > li:first-child > span:nth-child(6) > .remove').trigger('click');

  deepEqual($('#history > li').length, 1, 'should be 1 LI');
  deepEqual($('#history > li:first-child > span:first-child').text(), '3', 'first span in first li should be 3');
  deepEqual($('#history > li:first-child > span:nth-child(2)').text(), '+', 'first span in first li should be 3');
});

// test('alternate background color', function(){
//   expect(2);

//   $('#op1').val('3');
//   $('#op2').val('2');
//   $('#operator').val('+');
//   $('#calculate').trigger('click');

//   $('#op1').val('7');
//   $('#op2').val('8');
//   $('#operator').val('*');
//   $('#calculate').trigger('click');

//   $('#op1').val('2');
//   $('#op2').val('4');
//   $('#operator').val('*');
//   $('#calculate').trigger('click');

//   deepEqual($('#history > li:first-child').css('background'), 'rgb(95, 180, 199) none repeat scroll 0% 0% / auto padding-box border-box', 'bg color should be grey');
//   deepEqual($('#history > li:nth-child(2)').css('background'), 'rgb(92, 176, 169) none repeat scroll 0% 0% / auto padding-box border-box', 'bg color should be grey');
// });

test('sum of results', function(){
  expect(1);
  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#sum_results').trigger('click');

  deepEqual($('#sum_of_results').text(), '61', 'sum should be 61');
});

test('product of results', function(){
  expect(1);
  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#product_results').trigger('click');

  deepEqual($('#product_of_results').text(), '280', 'sum should be 61');
});

test('remove negatives', function(){
  expect(1);
  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('5');
  $('#op2').val('10');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  $('#remove_negative').trigger('click');

  deepEqual($('#history > li').length, 1, 'should be 1 LI');
});