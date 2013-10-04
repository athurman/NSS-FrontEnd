'use strict';

$(document).ready(initialize);

function initialize() {
  $('#add_logo').click(addLogo);
  $('#add_balance').click(addBalance);
  $('#deposit').click(deposit);
  $('#withdraw').click(withdraw);
  $('#history').on('click', '.in_the_green, .in_the_red', undoTransaction);
}

function clearInput(div) {
  $(div).val('');
  $(div).focus();
  return;
}

function addLogo() {
  var logo = $('#logoURL').val();
  $('#logo').attr('src', logo);
  $('#logoURL').hide();
  $('#add_logo').hide();
  clearInput($('#balance'));
}

var balance = 0;

function addBalance() {
  balance = parseFloat($('#balance').val());
  $('#display_balance').text('$' + balance);
  $('#balance').hide();
  $('#add_balance').hide();
  clearInput($('#amount'));
}

function deposit() {
  var depositAmt = parseFloat($('#amount').val());
  balance += depositAmt;
  $('#display_balance').text('$' + balance);
  clearInput($('#amount'));
  if (balance >= 0) {
    $('#display_balance').removeClass('in_the_red_balance');
  }

  var $depositHistory = $('<li>');
  $depositHistory.addClass('in_the_green');
  $depositHistory.text(makeMoney(depositAmt));
  $('#deposit_list').append($depositHistory);
  $depositHistory.hide();
  $depositHistory.fadeIn(500);
}

function withdraw() {
  var withdrawAmt = parseFloat($('#amount').val());
  balance -= withdrawAmt;
  $('#display_balance').text('$' + balance);
  clearInput($('#amount'));
  if (balance < 0) {
    $('#display_balance').addClass('in_the_red_balance');
  }

  var $withdrawHistory = $('<li>');
  $withdrawHistory.addClass('in_the_red');
  $withdrawHistory.text(makeMoney(withdrawAmt));
  $('#withdraw_list').append($withdrawHistory);
  $withdrawHistory.hide();
  $withdrawHistory.fadeIn(500);
}

function makeMoney(num) {
  return '$' + num + '.00';
}

function undoTransaction() {
  var $transaction = $(this);
  var listItem = $transaction.attr('class');
  var amount = parseInt($transaction.text().slice(1), 10);
  if(listItem !== 'in_the_red') {
    balance -= amount;
    if (balance < 0) {
      $('#display_balance').addClass('in_the_red_balance');
    }
  }
  else {
    balance += amount;
    if (balance >= 0) {
      $('#display_balance').removeClass('in_the_red_balance');
    }
  }
  $('#display_balance').text('$' + balance);
  $transaction.remove();
}

