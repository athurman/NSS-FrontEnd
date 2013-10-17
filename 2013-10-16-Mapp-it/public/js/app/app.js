'use strict';

// Firebase Schema
var Δdb;
var Δpositions;
var Δfavorites;

// Local Schema (defined in keys.js)
db.positions = [];
db.path = [];
db.favorites = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  Δpositions = Δdb.child('positions');
  Δfavorites = Δdb.child('favorites');
  Δpositions.on('child_added', dbPositionAdded);
  Δfavorites.on('child_added', dbFavoriteAdded);
  initMap(36, -86, 5);

  $('#start').click(clickStart);
  $('#stop').click(clickStop);
  $('#add_name').click(clickAddFavorite);
  $('#refresh').click(clickRefresh);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickStart() {
  var geoOptions = {enableHighAccuracy: true, maximumAge: 1000, timeout: 45000};
  db.watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
}

function clickStop () {
  navigator.geolocation.clearWatch(db.watchid);
  db.map.setZoom(14);
}

function clickAddFavorite (location) {
  var favOptions = {enableHighAccuracy: true, timeout: 45000, maximumAge: 0};
  db.watchFav = navigator.geolocation.getCurrentPosition(favSuccess, favError, favOptions);
}

function clickRefresh () {
  Δpositions.remove();
  Δfavorites.remove();
  db.positions = [];
  db.path = [];
  db.favorites = [];
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbPositionAdded (snapshot) {
  var position = snapshot.val();
  var latLng = new google.maps.LatLng(position.latitude, position.longitude);

  db.positions.push(position);

  if(db.positions.length === 1) {
    htmlAddStartIcon(latLng);
    htmlInitializePolyLine();
  }

  db.path.push(latLng);
  db.marker.setPosition(latLng);
  htmlSetCenterandZoom(latLng);
}

function dbFavoriteAdded (snapshot) {
  var favorite = snapshot.val();
  var latLng = new google.maps.LatLng(favorite.latitude, favorite.longitude);
  var image = '../../img/fav_marker.png';
  db.favmarker = new google.maps.Marker({map: db.map, position: latLng, icon: image, title: favorite.name});

  db.favorites.push(favorite);
  db.favmarker.setPosition(latLng);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddStartIcon(latLng) {
  var image = '../../img/locatr-icon.png';
  db.marker = new google.maps.Marker({map: db.map, position: latLng, icon: image});
}

function htmlInitializePolyLine() {
  var polyLine = new google.maps.Polyline({
    path: db.path,
    map: db.map,
    geodesic: true,
    strokeColor: '#E6453B',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  db.path = polyLine.getPath();
}

function htmlSetCenterandZoom(latLng) {
  db.map.setCenter(latLng);
  db.map.setZoom(18);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function geoSuccess(location) {
  var position = {};
  position.latitude = location.coords.latitude;
  position.longitude = location.coords.longitude;
  position.altitude = location.coords.altitude || 0;
  position.time = moment().format('MMMM Do YYYY, h:mm:ss a');

  Δpositions.push(position);
  console.log(position);
}

function geoError() {
  console.log('Sorry, no position available.');
}

function favSuccess (location) {
  var favorite = {};
  favorite.latitude = location.coords.latitude;
  favorite.longitude = location.coords.longitude;
  favorite.altitude = location.coords.altitude || 0;
  favorite.time = moment().format('MMMM Do YYYY, h:mm:ss a');
  favorite.name = getValue('#name');

  Δfavorites.push(favorite);
  console.log(favorite);
}

function favError(err) {
  console.log('ERROR(' + err.code + '): ' + err.message);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

// function parseUpperCase(string){
//   return string.toUpperCase();
// }

// function parseLowerCase(string){
//   return string.toLowerCase();
// }

// function formatCurrency(number){
//   return '$' + number.toFixed(2);
// }

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
