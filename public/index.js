let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 49.784523, lng: 9.921944 },
    zoom: 8,
  });
}
function changemap(){
  document.getElementById("home").style.visibility = 'hidden';
  document.getElementById("map").style.visibility = 'visible';
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
function changeneu(){
  document.getElementById("home").style.visibility = 'hidden';
  document.getElementById("map").style.visibility = 'hidden';
  document.getElementById("neu").style.visibility = 'visible';
  document.getElementById("chat").style.visibility = 'hidden';
  document.getElementById("profil").style.visibility = 'hidden';

}
function changechat(){
  document.getElementById("home").style.visibility = 'hidden';
  document.getElementById("map").style.visibility = 'hidden';
  document.getElementById("neu").style.visibility = 'hidden';
  document.getElementById("chat").style.visibility = 'visible';
  document.getElementById("profil").style.visibility = 'hidden';
  
}
function changeprofil(){
  document.getElementById("home").style.visibility = 'hidden';
  document.getElementById("map").style.visibility = 'hidden';
  document.getElementById("neu").style.visibility = 'hidden';
  document.getElementById("chat").style.visibility = 'hidden';
  document.getElementById("profil").style.visibility = 'visible';

}
