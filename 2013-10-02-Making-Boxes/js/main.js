$(document).ready(initialize);

function initialize() {
  $('#make_boxes').click(makingBoxes);
}

function makingBoxes() {
  var boxAmount = parseInt($('#amount').val());
  for(var i = 0; i < boxAmount; i++) {
    var $div = $('<div>');
    $div.addClass('box');
    $('#boxes').append($div);
    $div.text(i);
  }
}