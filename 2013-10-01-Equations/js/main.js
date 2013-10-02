$(document).ready(initialize)

function split_number(num) {
  var number = parseInt(num);
  var num1 = [];
  var sum = 0;
  for(var i = 0; i < number; i++)
    num1.push(sum += 1);
  return num1;
}

function multiply(num1, num2) {
  var num_array = split_number(num1);
  var sum = 0;
  var new_array = [];
  for(var i = 0; i < num_array.length; i++)
    new_array.push(num_array[i] *= num2);
  for(var i = 0; i < num_array.length; i++)
    sum += num_array[i];
  var multi = new_array.join('+') + " = " + sum;
  return multi;
}

function initialize() {
  $('#calculate').click(calculate);
}

function calculate() {
  var original = $('#original').val().split(', ');
  var numbers = [];
  for(var i = 0; i < original.length; i++)
    numbers.push(parseInt(original[i]));
  var output = multiply(numbers[0], numbers[1]);
  $('#output').val(output);
}
