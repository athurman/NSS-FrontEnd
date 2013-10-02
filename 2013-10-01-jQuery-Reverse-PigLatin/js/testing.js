test( "pig_latin", function() {
  deepEqual(pig_latin("hello"), "ello-hay", "translate hello into pig latin.");
  deepEqual(pig_latin("ruby"), "uby-ray", "translate ruby into pig latin.");
});

test( "spit_to_tips", function() {
  deepEqual(spit_to_tips("Greetings, Danni, Nashville"), "ashville-Nay; anni-Day; reetings-Gay", "split, reverse, join words: Greetings Danni.");
  deepEqual(spit_to_tips("Hello, world, this, is, jQuery"), "Query-jay; s-iay; his-tay; orld-way; ello-Hay", "split, reverse, join words: Hello world.");
});
