test( "filter even numbers", function() {
  var numbers = _.range(10);
  var expected = _.range(0, 10, 2);
  deepEqual(filter_evens(numbers), expected, "testing the filter_evens functions");
});

test( "filter odd numbers", function() {
  var numbers = _.range(10);
  var expected = [1, 3, 5, 7, 9];
  deepEqual(filter_odds(numbers), expected, "testing the filter_evens functions");
});

test( "filter short strings", function() {
  var strings = ["hello", "there", "a", "the", "cat", "in", "hat", "elephant", "encyclopedia"];
  var expected = ["a", "the", "cat", "in", "hat"];
  deepEqual(filter_short_strings(strings), expected, "testing short strings under 4 characters");
});

test( "filter 'A' strings", function() {
  var strings = ["apple", "hello", "there", "a", "Aardvark", "the", "cat", "in", "hat", "elephant", "encyclopedia"];
  var expected = ["apple", "a", "Aardvark"];
  deepEqual(filter_a_strings(strings), expected, "strings should begin with letter 'a'");
});

test( "filter 'A' strings", function() {
  var strings = ["apple", "hello", "there", "a", "Aardvark", "the", "cat", "in", "hat", "elephant", "encyclopedia"];
  var expected = "elephant";
  deepEqual(find_string(strings, "elephant"), expected, "should find within an array");
});

test( "find string ending in particular letter", function() {
  var strings = ["dog", "cats", "lion", "tigers"];
  deepEqual(find_strings_ending_letter(strings, "s"), "cats", "should find within an array");
  deepEqual(find_strings_ending_letter(strings, "z"), undefined, "should find within an array");
  });

test( "simple adding", function() {
  deepEqual(1 + 1, 2, "adding 1 + 1");
});

test( "first letter", function() {
  deepEqual("parthenon"[0], "p", "finding first letter in string");
});

test( "add five", function() {
  deepEqual(add_five(3), 8, "take a number and add five to it");
  deepEqual(add_five(5), 10, "take a number and add five to it");
  deepEqual(add_five(-4), 1, "take a number and add five to it");
});

test( "square", function() {
  deepEqual(square(5), 25, "square number variable");
});

test( "area", function() {
  deepEqual(area(3,5), 15, "create area");
  deepEqual(area(4,6), 24, "create area");
});

test( "volume", function() {
  deepEqual(volume(3,3,3), 27, "find volume");
});

test( "power", function() {
  deepEqual(power(7,2), 49, "take a number and send it to the defined power");
  deepEqual(power(2,4), 16, "take a number and send it to the defined power");
  deepEqual(power(3,3), 27, "take a number and send it to the defined power");
  deepEqual(power(123,0), 1, "take a number and send it to the defined power");
});

test( "greetings", function() {
  deepEqual(greetings("Hello ","Jenni"), "Hello Jenni", "greet a name input");
  deepEqual(greetings("Hello ","Danni"), "Hello Danni", "greet a name input");
});

test( "pig_latin", function() {
  deepEqual(pig_latin("hello"), "ello-hay", "translate into pig latin.");
  deepEqual(pig_latin("ruby"), "uby-ray", "translate into pig latin.");
});

test( "pig_latin_greeting", function() {
  deepEqual(pig_latin_greeting("hello","Jenni"), "ello-hay enni-Jay!", "translate greeting into pig latin.");
  deepEqual(pig_latin_greeting("Greetings","Danni"), "reetings-Gay anni-Day!", "translate greeting into pig latin.");
});



test( "pig_latin_sentence", function() {
  var sentence = "Coding at the Parthenon in Nashville";
  var expected = "oding-Cay t-aay he-tay arthenon-Pay n-iay ashville-Nay"
  deepEqual(pig_latin_sentence(sentence), expected, "translate sentence into pig latin.");
});