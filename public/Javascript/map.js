let map;
let map2;
let infowindow;
let postition;
let pos;
let marker2;

function initAutocomplete() {
		
	var myLatLng = {
		lat			:	52.520008,
		lng			:	13.404954
  };
	var mapOptions		=	{
		zoom			:	10,
		mapTypeControl	:	false,
		center			:	myLatLng,
	};
	
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    map2 = new google.maps.Map(document.getElementById('map2'),mapOptions);
    

    // const input = document.getElementById("pac-input");
    // const searchBox = new google.maps.places.SearchBox(input);
    
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // // Bias the SearchBox results towards current map's viewport.
    // map.addListener("bounds_changed", () => {
    //     searchBox.setBounds(map.getBounds());
    // });
    // map2.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // // Bias the SearchBox results towards current map's viewport.
    // map2.addListener("bounds_changed", () => {
    //     searchBox.setBounds(map2.getBounds());
    // });





	let vImage ="blue-dot.png";
    let image = "http://maps.google.com/mapfiles/ms/icons/" + vImage;
    let imageSelf = "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png"
    var locations		=	new Array();							
    navigator.geolocation.getCurrentPosition((position) =>{
    pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
  
    map.setCenter(pos);
    map2.setCenter(pos);
    marker = new google.maps.Marker({
      position	:	new google.maps.LatLng(pos),
      map	:	map,
	  icon:	imageSelf,
	  scaledSize: new google.maps.Size(200, 200)
    });
  })


	infowindow		=	new google.maps.InfoWindow();
	
    
	map2.addListener("click", (mapsMouseEvent) => {
		//Close the current InfoWindow.
        postition = mapsMouseEvent.latLng.toJSON();
        
        addMarker(postition,image,1);
	});
}

function addMarker(location,image,type){
    if(type == 0){
        marker = new google.maps.Marker({
        position	:	new google.maps.LatLng(location['lat'], location['lng']),
        map			:	map,
        animation	:	google.maps.Animation.DROP,
        icon		:	image,
        });
        
        google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
            //infowindow.setContent('<h3>' + location['host'] + "<br>" + location['title'] + '</h3>');
            infowindow.setContent(location['picture']+'<h1>' + location['title'] +'</h1>'+ "<h2>"+ location['name']+"</h2>" +"<br>"+ "<h3>"+location['desc']+"</h3>");
            infowindow.open(map, marker);
        }
        })(marker));
    }else if(type == 1){
        if (marker2){
            marker2.setMap(null);
            marker2 = new google.maps.Marker({
              position	:	new google.maps.LatLng(location['lat'], location['lng']),
              map			:	map2,
              animation	:	google.maps.Animation.DROP,
              icon		:	image,
              scaledSize  :   new google.maps.Size(200, 200)
            });
        }else{
            marker2 = new google.maps.Marker({
                position	:	new google.maps.LatLng(location['lat'], location['lng']),
                map			:	map2,
                animation	:	google.maps.Animation.DROP,
				icon		:	image,
				scaledSize  :   new google.maps.Size(200, 200)
            });
        }
    }
}

