'use strict';

$(document).ready(initialize);

var timer = 0;

function random(num) {
  var x = (Math.random() * num);
  return Math.floor(x);
}

function initialize(){
  $(document).foundation();
  $('#start').click(runRandom);
  $('#stop').click(stopRunning);
}

function createBox() {
  var dimensions = $('#dimensions').val().split(', ');
  var $box = $('<div>');
  $box.css('width', dimensions[0]).css('height', dimensions[1]);
  $box.css('background-color','rgba(' + random(256) + ',' + random(256) + ',' + random(256) + ',' + Math.random() + ')');
  $box.addClass('color_box');

  $('#colors').prepend($box);
}

function runRandom() {
  var time = parseFloat($('#time').val()) * 1000;
  timer = setInterval(createBox, time);
}

function stopRunning() {
  clearInterval(timer);
}