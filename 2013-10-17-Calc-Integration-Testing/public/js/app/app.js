'use strict';

// Firebase Schema

// Local Schema (defined in keys.js)
var sum = 0;
var product = 1;

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $('#calculate').click(clickCalculate);
  $('#sum_results').click(clickSumResults);
  $('#product_results').click(clickProductResults);
  $('#remove_negative').click(clickRemoveNegative);
  $('#remove_positive').click(clickRemovePositive);
  $('#history').on('click', '.remove', clickRemoveRow);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickCalculate() {
  var op1 = getValue('#op1', parseInt);
  var op2 = getValue('#op2', parseInt);
  var operator = getValue('#operator');
  var computation = op1 + operator + op2;
  var result = eval(computation);

  $('#result').text(result);
  htmlAddHistory(op1, op2, operator, result);
}

function clickRemoveRow() {
  var $deleteRow = $(this);
  $deleteRow.closest('li').remove();
}

function clickSumResults() {
  var results = [];
  $('#history > li > span:nth-child(5)').each(function() {results.push(parseFloat($(this).text(), 10))});

  for(var i = 0; i < results.length; i++){
    sum += results[i];
  }

  $('#sum_of_results').text(sum);
}

function clickProductResults() {
  var results = [];

  $('#history > li > span:nth-child(5)').each(function() {results.push(parseFloat($(this).text(), 10))});
  for(var i = 0; i < results.length; i++){
    product *= results[i];
  }

  $('#product_of_results').text(product);
}

function clickRemoveNegative() {
  $('span.result:contains("-")').parent().remove();
}

function clickRemovePositive() {
  $('span.result').not(':contains("-")').parent().remove();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddHistory(op1, op2, operator, result) {
  var $li = $('<li>');
  var $span1 = $('<span>');

  var num1 = $span1.text(op1);
  num1.addClass('op1');
  $li.append(num1);
  var $span2 = $('<span>');
  var oprtn = $span2.text(operator);
  oprtn.addClass('operator');
  $li.append(oprtn);
  var $span3 = $('<span>');
  var num2 = $span3.text(op2);
  num2.addClass('op2');
  $li.append(num2);
  var $span4 = $('<span>');
  $span4.text(' = ');
  $li.append($span4);
  var $span5 = $('<span>');
  $span5.text(result);
  $span5.addClass('result');
  $li.append($span5);
  var $span6 = $('<span>');
  var $removeBtn = $('<input>');
  $removeBtn.attr('type', 'button').val('X');
  $removeBtn.addClass('remove button radius alert');
  $span6.append($removeBtn);
  $li.append($span6);

  $('#history').prepend($li);
  $('#history li:nth-child(even)').addClass('alternate');
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

function canRun(flag) {
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}

// function parseUpperCase(string){
//   return string.toUpperCase();
// }

// function parseLowerCase(string){
//   return string.toLowerCase();
// }

// function formatCurrency(number){
//   return '$' + number.toFixed(2);
// }

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
