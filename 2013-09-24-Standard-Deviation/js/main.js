// Ask user for a list of color through a loop
var test_scores = [];



var response = prompt("Enter a test score:");
for(response; response < 10, response++)
{
  response = parseFloat(response);
  test_scores.push(response);
  response = prompt("Enter a test score:");

}

for(var count = 0; count < 10; count++)
{
  console.log("You typed in test score: " + test_scores[count]);
}

var sum = 0;
for(count = 0; count < 10; count++)
{
  sum += test_scores[count];
}

var avg = sum / test_scores.length;
console.log("Test score average: " + avg);

debugger;

var squared = [];
for(count = 0; count < test_scores.length; count++)
{
  squared.push(Math.pow((test_scores[count] - avg),2));
  console.log("Test scores population SD: " + squared[count]);
}

sum = 0;
for(count = 0; count < squared.length; count++)
{
  sum += squared[count];
}

var stdD = Math.sqrt(sum / squared.length);
console.log("Standard Deviation: " + stdD);
