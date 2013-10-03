$(document).ready(initialize);

function clearInput() {
  $('#color').val('');
  $('#color').focus();
}

function initialize() {
  $('#add_color').click(addColor);
  $('#color').focus();
}

function addColor() {
  var colorInput = $('#color').val();
  var $color = $('<div>');
  $color.addClass('box');
  $color.css('background-color', colorInput);
  $('#boxes').append($color);
  clearInput();
}