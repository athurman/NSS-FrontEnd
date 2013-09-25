// Ask for initial information
var first_name = prompt("Welcome to the bank! What is your first name?");
var last_name = prompt("What is your last name?");
var initial_balance = prompt("What is your initial balance?");
initial_balance = parseFloat(initial_balance);

// Ask for deposits
var deposit1 = prompt("How much would you like to deposit, initially?");
deposit1 = parseFloat(deposit1);
var deposit2 = prompt("How much would you like to deposit, your second time?");
deposit2 = parseFloat(deposit2);
var deposit3 = prompt("How much would you like to deposit, the third time?");
deposit3 = parseFloat(deposit3);

// Ask for withdraws
var withdraw1 = prompt("How much would you like to withdraw?");
withdraw1 = parseFloat(withdraw1);
var withdraw2 = prompt("How much is your second withdrawal?");
withdraw2 = parseFloat(withdraw2);
var withdraw3 = prompt("How much is your third withdrawal?");
withdraw3 = parseFloat(withdraw3);

var full_name = first_name + ' ' + last_name;
console.log(full_name + ", your initial balance: " + initial_balance);

var deposit_sum = 0;
deposit_sum += deposit1;
deposit_sum += deposit2;
deposit_sum += deposit3;
console.log(first_name + ", your total deposited amount is: " + deposit_sum);

var withdraw_sum = 0;
withdraw_sum += withdraw1;
withdraw_sum += withdraw2;
withdraw_sum += withdraw3;
console.log("Total amount withdrawn from account: " + withdraw_sum);

// Equation for balance
var balance_sum = initial_balance;
balance_sum += deposit_sum;
balance_sum -= withdraw_sum;


if(balance_sum < 0)
  console.log((full_name + ", uh oh it looks like you over-drafted. You now have a overdraft fee of $50. Your new balance is: ") + (balance_sum - 50));
else
  console.log(full_name + ", your current balance is: " + balance_sum);
