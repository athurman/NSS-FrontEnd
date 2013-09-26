function add_list(menu, dish1)
{
  return menu.push(dish1);
}

var menu_items = [];


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
  add_list(menu_items, dish);
  var name = prompt("What is the name of your dish? Leave blank to exit.");
}

// Begin Output
var sum_cal = 0;
var sum_cost = 0;

debugger;
for(var i = 0; i < menu_items.length; i++)
{
  console.log("Menu: " + menu_items[i].type + ": " + [menu_items[i].name + ": [" + menu_items[i].ingredients + "] Price: " + menu_items[i].price]);
  console.log("Types: " + menu_items[i].type.length);
  sum_cal += menu_items[i].calories;
  sum_cost += menu_items[i].price;
}

var avg_cost = sum_cost / menu_items.length;
var avg_cal = sum_cal / menu_items.length;

console.log("Number of Items on your Menu: " + menu_items.length);
console.log("Total Calories in your Menu: " + sum_cal);
console.log("Total Cost of your Menu: " + sum_cost);
console.log("The average price per dish: " + avg_cost);
console.log("The average amount of calories per dish: " + avg_cal);

