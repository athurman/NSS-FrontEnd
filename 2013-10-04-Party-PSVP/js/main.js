'use strict';

$(document).ready(initialize);

function clearInput(text) {
  $(text).val('');
  $(text).focus();
  return;
}

function initialize() {
  $('#add').click(addRow);
  $('table').on('click', '.rsvp', rsvp);
  $('table').on('click', '.remove', uninvite);
  $('table').on('click', '.up, .down', moveRow);
}

function addRow() {
  var $tr = $('<tr>');
  var $name = $('<td>');
  $name.addClass('name');
  var $food = $('<td>');
  $food.addClass('food');
  var $ctrl = $('<td>');
  $ctrl.addClass('ctrl');
  var $uninvite = $('<td>');
  var $arrows = $('<td>');
  $arrows.addClass('arrow_img');

  var $input = $('<input>');
  $input.attr('type', 'text');

  var $button = $('<input>');
  $button.attr('type', 'button');
  $button.val('RSVP');
  $button.addClass('rsvp');

  var $nuke = $('<input>');
  $nuke.attr('type', 'button');
  $nuke.val('Not Going!');
  $nuke.addClass('remove');

  var $upArrow = $('<img>');
  $upArrow.attr('src', 'images/ArrowUp.png');
  $upArrow.addClass('up');

  var $downArrow = $('<img>');
  $downArrow.attr('src', 'images/ArrowDown.png');
  $downArrow.addClass('down');

  $arrows.append($upArrow);
  $arrows.append($downArrow);
  $ctrl.append($input, $button);
  $uninvite.append($nuke);
  $tr.append($name, $food, $ctrl, $uninvite, $arrows);
  $('table').append($tr);
  $input.focus();
}

function rsvp() {
  var $button = $(this);
  var $text = $button.prev();
  var text = $button.prev().val();
  var items = text.split(', ');
  var name = items[0];
  var food = items[1];

  $button.parent().siblings('.name').text(name);
  $button.parent().siblings('.food').text(food);
  clearInput($text);
}

function uninvite() {
  var $button = $(this);
  $button.closest('tr').remove();
}

function moveRow() {
  var $button = $(this);
  var $grabTR = $button.closest('tr');

  if($button.hasClass('up')) {
    if(!$grabTR.prev().hasClass('home')) {
      $grabTR.prev().before($grabTR);
    }
  }
  else {
    $grabTR.next().after($grabTR);
  }
}

