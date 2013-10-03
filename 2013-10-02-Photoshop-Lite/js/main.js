'use strict';

$(document).ready(initialize);

function clearInput() {
  $('#color').val('');
  $('#color').focus();
}

function initialize() {
  $('#add_color').click(addColor);
  $('#color').focus();
  $('#add_box').click(addCanvas);
  // $('parent_selector').on('name of event', 'child selector', name_of_function); <-- watches after initialize and when class (or other element) is dynamically added, function gets called
  $('#colors').on('click', '.box', colorPaletteClicked);
  $('#boxes').on('mouseover', '.canvas', colorCanvasHover);
}

function addColor() {
  var colorInput = $('#color').val();
  var $color = $('<div>');
  $color.addClass('box');
  $color.css('background-color', colorInput);
  $('#colors').append($color);
}

function colorPaletteClicked() {
  var $box = $(this);
  $('#brush').css('background-color', $box.css('background-color'));
}

function addCanvas() {
  var amount = parseInt($('#amount').val());
  for(var i = 0; i < amount; i++) {
    var $box = $('<div>');
    $box.addClass('canvas');
    $('#boxes').prepend($box);
  }
  clearInput();
}

function colorCanvasHover() {
  var $canvas = $(this);
  $($canvas).css('background-color', $('#brush').css('background-color'));
}