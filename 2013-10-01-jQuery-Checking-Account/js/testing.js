test( "deposit", function() {
  deepEqual(deposit(900, 300), 1200, "add deposit of 300 to balance of 900");
});

test( "withdraw", function() {
  deepEqual(withdraw(900, 300), 600, "subtract withdraw of 300 to balance of 900");
});