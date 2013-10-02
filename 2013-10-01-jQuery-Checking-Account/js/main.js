$('document').ready(initialize)

var balance = 1000;

function deposit(bal, amount) {
  return bal += amount;
}

function withdraw(bal, amount) {
  return bal -= amount;
}

function initialize() {
  $('#deposit').click(deposit_into_amount);
  $('#withdraw').click(withdraw_from_amount);
}

function deposit_into_amount() {
  var amount = parseFloat($('#amount').val());
  balance = deposit(balance, amount);
  $('#balance').val(balance);
  if (balance >= 0)
    $('#balance').removeClass('in_the_red');
}

function withdraw_from_amount() {

  var amount = parseFloat($('#amount').val());
  balance = withdraw(balance, amount);
  $('#balance').val(balance);
  if (balance < 0)
    $('#balance').addClass('in_the_red');
}