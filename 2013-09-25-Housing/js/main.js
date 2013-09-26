function sqft(length, width)
{
  return length * width;
}

var house_rooms = [];

// Begin Room Input Loop
var length = prompt("Enter the length of your room or blank to exit:");

while(length)
{
  var room = {};
  room.length = parseFloat(length);
  room.width = parseFloat(prompt("Width?"));
  room.window = parseInt(prompt("Number of Windows?"));
  room.name = prompt("What is the name of this room?")
  house_rooms.push(room);
  var length = prompt("Enter the length of your room or blank to exit:");
}

var create_pool = prompt('Create pool: yes or no');
if(create_pool == 'yes')
{
  var depth = parseInt(prompt("What is the depth of the pool?"))
  var diameter = parseInt(prompt("What is the diameter of the pool?"))
}



debugger;
// Begin Find Out Total Square Footage Cost
var sum_sqft = 0;
var sum_windows = 0;

for(var i = 0; i < house_rooms.length; i++)
{
  var room_sqft = sqft(house_rooms[i].length, house_rooms[i].width);
  sum_sqft += room_sqft;
  sum_windows += house_rooms[i].window;
}
console.log("The total square feet of your house is: " + sum_sqft);
console.log("Total numbers of windows in the house: " + sum_windows);

var square_cost = sum_sqft * 200;
console.log("Your total cost of room square footage is: " + square_cost);

var windows_cost = sum_windows * 250;
console.log("Total cost of windows for house: " + windows_cost);

// Begin Find Out Total Cost of House
var total_cost = windows_cost + square_cost;
console.log("Total cost of your house is: " + total_cost);