$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('.color').on('click', clickColor);
}

function clickColor() {
  $(this).css('background-color', '#2d8399').text('Gah! Attack of the blue!');
}
