'use strict';

$(document).ready(initialize);

function initialize() {
  $('#add_task').click(addTask);
  $('#todo_list').on('click', '.delete_button', deleteRow);
  $('#todo_list').on('click', '.checkbox', strikeThrough);
  $('#todo_list').on('click', '.up, .down', moveRow);
}

function addTask() {
  var $tr = $('<tr>');
  var $dueDate = $('<td>');
  $dueDate.addClass('date');
  var $task = $('<td>');
  $task.addClass('task');
  var $color = $('<td>');
  $color.addClass('category_color');
  var $checkbox = $('<td>');
  var $deleter = $('<td>');
  var $upDown = $('<td>');
  var $bgColor = $('<div>');
  $bgColor.addClass('bg_color');

  var $check = $('<input>');
  $check.attr('type', 'checkbox');
  $check.addClass('checkbox');
  var $deleteBtn = $('<input>');
  $deleteBtn.attr('type', 'button');
  $deleteBtn.val('Delete');
  $deleteBtn.addClass('delete_button');

  $dueDate.text($('#due_date').val());
  $task.text($('#task').val());
  $bgColor.css('background-color', $('#color').val());

  var $upArrow = $('<img>');
  $upArrow.attr('src', 'images/ArrowUp.png');
  $upArrow.addClass('up');

  var $downArrow = $('<img>');
  $downArrow.attr('src', 'images/ArrowDown.png');
  $downArrow.addClass('down');

  $upDown.append($upArrow, $downArrow);
  $deleter.append($deleteBtn);
  $checkbox.append($check);
  $color.append($bgColor);
  $tr.append($dueDate, $task, $color, $checkbox, $deleter, $upDown);
  $('#todo_list').append($tr);
  $('#due_date').val('');
  $('#task').val('');
  $('#color').val('');
  $('#due_date').focus();
}

function deleteRow() {
  var $deleteRow = $(this);
  $deleteRow.closest('tr').remove();
}

function strikeThrough() {
  var $check = $(this);
  if($check.prop('checked')) {
    $check.parent().siblings('.date').css('text-decoration', 'line-through');
    $check.parent().siblings('.task').css('text-decoration', 'line-through');
    $check.closest('tr').css('background-color', '#dddddd');
  }
  else {
    $check.parent().siblings('.date').css('text-decoration', 'none');
    $check.parent().siblings('.task').css('text-decoration', 'none');
    $check.closest('tr').css('background-color', 'inherit');
  }
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