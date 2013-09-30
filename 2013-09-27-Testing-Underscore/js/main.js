function filter_evens(numbers)
{
  return _.filter(numbers, function(num){return (num % 2) == 0}); // Inner function has to return true or falst.
}

function filter_odds(numbers)
{
  return _.filter(numbers, function(num){return (num % 2) == 1}); // Inner function has to return true or falst.
}

function filter_short_strings(strings)
{
  return _.filter(strings, function(string){return (string.length) < 4;});
}

function filter_a_strings(strings)
{
  return _.filter(strings, function(string){return (string[0].toLowerCase()) == "a";});
}

function find_string(strings, word)
{
  return _.find(strings, function(string){return string.toLowerCase() == word;});
}

function find_strings_ending_letter(strings, letter)
{
  return _.find(strings, function(string){return string[string.length - 1] == letter;});
}

function add_five(num)
{
  num += 5;
  return num;
}

function square(num)
{
  return Math.pow(num,2);
}

function area(l,w)
{
  return l * w;
}

function volume(l,w,h)
{
  return area(l,w) * h;
}

function power(base, exp)
{
  var sum = 1;
  for(var i = 0; i < exp; i++)
  {
    sum *= base;
  }
  return sum;
}

function greetings(type, name)
{
  return type + name;
}

function pig_latin(word)
{
  return word.slice(1) + "-" + word[0] + "ay";
}

function pig_latin_greeting(type, word)
{
  return pig_latin(type)+ " " + pig_latin(word) + "!";
}

function pig_latin_sentence(sentence)
{
  var temp = sentence.split(" ");
  var word_array = [];
  for(var i = 0; i < temp.length; i++)
  {
    word_array.push(pig_latin(temp[i]));
  }
  return word_array.join(" ");
}
