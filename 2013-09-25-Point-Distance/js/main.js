var points = [];

debugger;

for(var i = 0; i < 2; i++)
{
  var point = {};
  point.x = parseInt(prompt("X Coordinate?"));
  point.y = parseInt(prompt("Y coordinate?"));
  points.push(point);
}

var distance_a = points[1].x - points[0].x;
console.log("Distance of line A is: " + distance_a);

var distance_b = points[1].y - points[0].y;
console.log("Distance of line B is: " + distance_b);

var distance_c = Math.sqrt(Math.pow(distance_b,2) + Math.pow(distance_a,2));
console.log("The distance between your two points is: " + distance_c + ". Isn't that exciting?!");