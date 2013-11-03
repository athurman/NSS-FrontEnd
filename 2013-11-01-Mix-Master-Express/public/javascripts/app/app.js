$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('.expand').click(expand);
  $('.collapse').click(collapse);
}

$('.expand_list').hide();

function expand() {
  $(this).parent().find(".expand_list").slideDown(1000);
  $(this).hide();
}

function collapse() {
  $(this).prev().slideUp(1000);
  $(this).hide();
  $('.expand').fadeIn(500);
}