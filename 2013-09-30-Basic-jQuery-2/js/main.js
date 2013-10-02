$(document).ready(initialize);

function initialize() {
  $('#button').click(change_green);
  $('#name_btn').click(count_name);
}

function change_green() {
 $('#green').css('background-color', '#00FF00');
}

function count_name() {
 var count = $('#name_txt').val();
 $('#name_div').text("Your name has " + count.length + " letters.");
}