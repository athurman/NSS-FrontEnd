'use strict';

// Firebase Schema
var Δdb;
var Δpositions;

// Local Schema (defined in keys.js)
db.positions = [];
db.path = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  Δpositions = Δdb.child('positions');
  Δpositions.on('child_added', dbPositionAdded);

  $('#start').click(clickStart);
  $('#erase').click(clickErase);
  $('#stop').click(clickStop);
  initMap(36, -86, 5);
  Δpositions.remove();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickStart() {
  var geoOptions = {enableHighAccuracy: true, maximumAge: 1000, timeout: 45000};

  db.watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
}

function clickErase () {
  Δpositions.remove();
  db.positions = [];
  db.path = [];
}

function clickStop () {
  navigator.geolocation.clearWatch(db.watchid);
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

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbPositionAdded(snapshot) {
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
    strokeColor: '#406BB3',
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

// function getValue(selector, fn){
//   var value = $(selector).val();
//   value = value.trim();
//   $(selector).val('');

//   if(fn){
//     value = fn(value);
//   }

//   return value;
// }

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
