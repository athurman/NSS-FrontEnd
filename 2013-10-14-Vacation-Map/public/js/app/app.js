'use strict';

// Firebase Schema
var Δdb;
var Δlocations;

// Local Schema
var db = {};
db.locations = [];
db.map = null;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://vacation-app-at.firebaseio.com/');
  Δlocations = Δdb.child('locations');
  Δlocations.on('child_added', dbLocationAdded);
  $('#set_zoom').click(clickSetZoom);
  $('#add_location').click(clickAddLocation);
  $('#go_location').click(clickGoLocation);
  initMap(36, -86, 5);
}

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickSetZoom(){
  var zoom = getValue('#zoom', parseInt);
  db.map.setZoom(zoom);
}

function clickAddLocation(){
  var name = getValue('#location');
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({address: name}, function(results, status){
    var location = {};
    location.name = results[0].formatted_address;
    location.coordinates = results[0].geometry.location;
    Δlocations.push(location);
  });
}

function clickGoLocation() {
  var name = $('#location_select').val();
  var location = _.find(db.locations, function(l){return l.name === name});
  var latLng = new google.maps.LatLng(location.coordinates.lb, location.coordinates.mb);
  db.map.setCenter(latLng);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbLocationAdded(snapshot){
  var location = snapshot.val();
  db.locations.push(location);
  htmlAddLocation(location);
  htmlAddMarker(location);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddLocation(location) {
  var $option = $('<option>');
  $option.val(location.name).text(location.name);
  $('#location_select').append($option);
}

function htmlAddMarker(location) {
  var latLng = new google.maps.LatLng(location.coordinates.lb, location.coordinates.mb);
  var marker = new google.maps.Marker({map: db.map,position: latLng, title: location.name});
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //