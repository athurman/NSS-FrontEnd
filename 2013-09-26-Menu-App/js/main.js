function add_list(menu, dish1)
{
  return menu.push(dish1);
}

var menu_items = [];
var types = [];


// Begin User Input
var name = prompt("What is the name of your dish? Leave blank to exit.");

while(name)
{
  var dish = {};
  dish.name = name;
  dish.type = prompt("Appetizer, Salad, Dinner Item, or Dessert?");
  dish.price = parseFloat(prompt("Price?"));
  dish.calories = parseInt(prompt("How many calories?"));
  dish.ingredients = prompt("List the ingredients:").split(',');
debugger;
  // Create Category Array
  var exists = false;
  for(var i = 0; i < types.length; i++)
  {
    if (types[i].toLowerCase() == dish.type.toLowerCase())
      exists = true;
  }

  !exists ? add_list(types, dish.type) : null;  // If  exists is false, then does not push type to new array.  If true, does push to Types array.
  add_list(menu_items, dish); // Push dish objects to menu_items array.
  var name = prompt("What is the name of your dish? Leave blank to exit.");
}

// Begin Output to User
var sum_cal = 0;
var sum_cost = 0;

for(i = 0; i < types.length; i++)
{
  console.log(types[i] + ":"); // Begin List Dish Type
  for(var item = 0; item < menu_items.length; item++)
  {
    if (types[i].toLowerCase() == menu_items[item].type.toLowerCase()) // Begin Dish Object Details Print
    {
      console.log("     " + menu_items[item].name + ": [" + menu_items[item].ingredients + "] Price: " + menu_items[item].price);
      sum_cal += menu_items[item].calories;
      sum_cost += menu_items[item].price;
    }
  }
  console.log(" "); // Blank line between types of dishes.
}

var avg_cost = sum_cost / menu_items.length;
var avg_cal = sum_cal / menu_items.length;

console.log("Number of Items on your Menu: " + menu_items.length);
console.log("The number of dish types on your Menu: " + types.length);
console.log("Total Calories in your Menu: " + sum_cal);
console.log("Total Cost of your Menu: " + sum_cost);
console.log("The average price per dish: " + avg_cost);
console.log("The average amount of calories per dish: " + avg_cal);
