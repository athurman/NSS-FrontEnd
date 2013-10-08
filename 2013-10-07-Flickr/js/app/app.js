'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#search').click(searchFlickr);
  $('#clear').click(clearAll);
  $('#save').click(saveSelected);
  $('#delete_selected').click(deleteSelected);
  $('#photos').on('dblclick', '.photo', removeImage);
  $('#photos').on('click', '.photo', addBorder);
}

function searchFlickr() {
  var API_KEY = '13f30dbabf5307535819dafa5ee32d5c';
  var PER_PAGE = 50;
  var page = 1;

  var query = $('#query').val();
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&text=' + query + '&per_page=' + PER_PAGE + '&page=' + page + '&format=json&jsoncallback=?';
  $.getJSON(url, results);
}

function results(data) {
  for(var i = 0; i < data.photos.photo.length; i++) {
    createImage(data.photos.photo[i]);
  }
}

function createImage(photo) {
  var url = 'url(http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg)';
  var $div = $('<div>');
  $div.addClass('photo');
  $div.css('background-image', url);
  $('#photos').prepend($div);
}

function removeImage() {
  $(this).remove();
}

function clearAll() {
  $('#photos').empty();
}

function addBorder() {
  $(this).toggleClass('red_border');
}

function deleteSelected() {
  $('.red_border').remove();
}

function saveSelected() {
  $('#saved-photos').append($('.red_border'));
  $('.red_border').removeClass('red_border');
}