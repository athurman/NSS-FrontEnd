$(document).ready(initialize);

function pig_latin(word) {
  return word.slice(1) + "-" + word[0] + "ay";
}

function spit_to_tips(sentence) {
  var temp = sentence.split(", ");
  temp.reverse();
  var word_array = [];
  for(var i = 0; i < temp.length; i++)
  {
    word_array.push(pig_latin(temp[i]));
  }
  return word_array.join("; ");
}

function initialize() {
  $('#convert').click(pigl);
}

function pigl() {
  var original = $('#original').val();
  var pigl_it = spit_to_tips(original);
  $('#converted').val(pigl_it);
}