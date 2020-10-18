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
    

    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });
    map2.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map2.addListener("bounds_changed", () => {
        searchBox.setBounds(map2.getBounds());
    });





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

	var locations		=	[
		{
			lat		: 	51.0504088, 
			lng		:	13.7372621,
			city	:	'Dresden',
      title :   'Nach der Party sieht der Club aus wie Dresden 45'
		},{
			lat		: 	53.5510846, 
			lng		: 	9.9936819,
			city	: 	'Hamburg',
      title :   'hallau es funktioniert'
		},{
			lat		: 	53.0792962, 
			lng		: 	8.8016936,
			city	: 	'Bremen',
      title :   'hallau es funktioniert'
		},{
			lat		: 	48.1351253, 
			lng		: 	11.5819805,
			city	: 	'München',
      title :   'hallau es funktioniert'
		},{
			lat		: 	58.487952, 
			lng		: 	19.863281,
			city	: 	'Ostsee',
      title :   'hallau es funktioniert'
		},{
			lat		: 	51.75, 
			lng		: 	10.633333,
      city	: 	'Harz',
      title :   'hallau es funktioniert'
		}
	];
	firebase.database().ref("events").on("child_added", function (snapshot) {
        
    })
	infowindow		=	new google.maps.InfoWindow();
	
	for (i = 0; i < locations.length; i++) { 
		addMarker(locations[i],image,0)
	}
    
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
            infowindow.setContent('<h3>' + location['host'] + "<br>" + location['title'] + '</h3>');
            infowindow.open(map, marker);
        }
        })(marker));
    }else if(type == 1){
        if (marker2){
            marker2.setPosition(new google.maps.LatLng(location['lat'], location['lng']));
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

