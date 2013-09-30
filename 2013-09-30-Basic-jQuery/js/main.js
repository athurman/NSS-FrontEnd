$(document).ready(initialize); // <-- Select the entire DOM after loaded in browser


function change_div_text() {
  var name = $('#name').val();
  var color = $('#color').val();
  $('#b').text(name).css('background-color', color);
}

function age_verification() {
  debugger;
  var age = parseInt($('#age').val());
    if (age >= 21)
    $('#age_div').text('Congratulations! Get Drunk!').css('background-color', 'green');
  else
    $('#age_div').text('Go home.').css('background-color', 'red');
}

function initialize() {
  $('#clicker').click(change_div_text);
  $('#age_check').click(age_verification);

  // $('div').css('background-color', 'red');
  // $('div').css('font-size', '25px');
  // $('div').css('color', 'yellow');

  // var color = prompt('What color?');
  // $('div').css('background-color', color);
  // var size = prompt('What size font?');
  // $('div').css('font-size', size);
  // var selector = prompt('Which div?');
  // var cls = prompt('Class to add?');
  // var new_text = prompt('What woud you like to say?');
  // $(selector).addClass(cls);
  // $(selector).text(new_text);

  // var selector_to_hide = prompt('Which node do you want to hide?');
  // $(selector_to_hide).hide();
}