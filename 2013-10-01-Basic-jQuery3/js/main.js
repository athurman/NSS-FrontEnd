$(document).ready(initialize);

function add(num1, num2) {
  return num1 + num2;
}

function compute_sum() {
  var sum = add(parseFloat($('#num1').val()), parseFloat($('#num2').val()));
  $('#result').text(sum);
}

function initialize() {
  $('#add').click(compute_sum);
}

