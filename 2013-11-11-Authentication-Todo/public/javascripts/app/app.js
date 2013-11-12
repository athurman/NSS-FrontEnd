$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  $('#authentication-button').on('click', clickSubmitAuthentication);
  $('#register').on('click', clickRegister);
  $('#login').on('click', clickLogin);
}

function clickSubmitAuthentication(e) {
  if($('#authentication-button').attr('data-email') === ('anonymous')) {
    $('form#authentication').toggleClass('hidden');
    $('input[name="email"]').focus();

  } else {
    var url = '/logout';
    sendAjaxRequest(url, {}, 'POST', 'DELETE', e, function(data){
      console.log(data);
      htmlLogout(data);
    });
  }
  e.preventDefault();
}

function clickRegister(e) {
  var url = '/users';
  var data = $('form#authentication').serialize();
  sendAjaxRequest(url, data, 'POST', null, e, function(data){
    console.log(data);
    htmlRegisterComplete(data);
  });
}


function clickLogin(e) {
  var url = '/login';
  var data = $('form#authentication').serialize();
  sendAjaxRequest(url, data, 'post', 'put', e, function(data){
    htmlLoginComplete(data);
  });
}


// ---------------------------------------------------------------------- //
// ---------------------------------------------------------------------- //
// ---------------------------------------------------------------------- //

function htmlLoginComplete(result) {
  $('input[name=email]').val('');
  $('input[name=password]').val('');

  if(result.status === 'ok') {
    $('form#authentication').toggleClass('hidden');
    $('#authentication-button').attr('data-email', result.email).text(result.email).addClass('alert');

  } else {
    alert('There was something wrong with your username/password. Try again.');
    $('input[name="email"]').focus();
  }
}

function htmlRegisterComplete(data) {
  $('input[name=email]').val('');
  $('input[name=password]').val('');

  if(data.status === 'ok') {
    $('form#authentication').toggleClass('hidden');
  } else {
    alert('There was something wrong with your registration. Try again.');
    $('input[name="email"]').focus();
  }
}

function htmlLogout(result) {
  if(result.status === 'ok') {
    $('#authentication-button').attr('data-email', 'anonymous').text('Login | Sign Up').removeClass('alert');
  }
}

function initializeSocketIO(){
  var port = location.port ? location.port : '80';
  var url = location.protocol + '//' + location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}