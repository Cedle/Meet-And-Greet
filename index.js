let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}
function changemap(){
  document.getElementById("map").style.visibility = 'visible';
  document.getElementById("home").style.visibility = 'hidden';
  document.getElementById("neu").style.visibility = 'hidden';
  document.getElementById("chat").style.visibility = 'hidden';
  document.getElementById("profil").style.visibility = 'hidden';
}
function changehome(){
  document.getElementById("home").style.visibility = 'visible';
  document.getElementById("map").style.visibility = 'hidden';
  document.getElementById("neu").style.visibility = 'hidden';
  document.getElementById("chat").style.visibility = 'hidden';
  document.getElementById("profil").style.visibility = 'hidden';

}
