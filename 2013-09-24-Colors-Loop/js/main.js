// Ask user for a list of color through a loop
var colors = [];

var response = prompt("Enter a color:");
while(response)
{
  colors.push(response);
  response = prompt("Enter a color:");
}

for(var count = 0; count < colors.length; count++)
{
  console.log("You typed in color: " + colors[count]);
}

debugger;
var sum = 0;
for(var loop = colors.length - 1; loop > -1; loop--)
{
  sum += colors[loop].length;
}

var avg = sum / colors.length;