$(document).ready(initialize);

function pig_latin(word) {
  return word.slice(1) + "-" + word[0] + "ay";
}

function translate() {
  var original = $('#original').val();
  var pig_it = pig_latin(original);
  $('#piglatin').text(pig_it).css('border', '2px dashed #FF5566');
}

function initialize() {
  $('#pig').click(translate);
}