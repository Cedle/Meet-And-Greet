let map;
let map2;
let infowindow;
let postition;
let pos;
let marker2;


function CustomMarker(latlng, map, imageSrc) {
    this.latlng_ = latlng;
    this.imageSrc = imageSrc;
    // Once the LatLng and text are set, add the overlay to the map.  This will
    // trigger a call to panes_changed which should in turn call draw.
    this.setMap(map);
  }

function initAutocomplete() {
        
    CustomMarker.prototype = new google.maps.OverlayView();

    CustomMarker.prototype.draw = function() {
    // Check if the div has been created.
    var div = this.div_;
    if (!div) {
        // Create a overlay text DIV
        div = this.div_ = document.createElement('div');
        // Create the DIV representing our CustomMarker
        div.className = "customMarker"


        var img = document.createElement("img");
        img.src = this.imageSrc;
        div.appendChild(img);
        var me = this;
        google.maps.event.addDomListener(div, "click", function(event) {
        google.maps.event.trigger(me, "click");
        });

        // Then add the overlay to the DOM
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }

    // Position the overlay 
    var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (point) {
        div.style.left = point.x + 'px';
        div.style.top = point.y + 'px';
    }
    };

    CustomMarker.prototype.remove = function() {
    // Check if the overlay was on the map and needs to be removed.
    if (this.div_) {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
    };

    CustomMarker.prototype.getPosition = function() {
    return this.latlng_;
    };

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
        var icon = {
            url: image, // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };

        marker = new CustomMarker(new google.maps.LatLng(location['lat'], location['lng']), map, image);


        // marker = new google.maps.Marker({
        // position	:	new google.maps.LatLng(location['lat'], location['lng']),
        // map			:	map,
        // animation	:	google.maps.Animation.DROP,
        // icon		:	icon,
        // });
        // marker.set("id", "icon");
        
        google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
            //infowindow.setContent('<h3>' + location['host'] + "<br>" + location['title'] + '</h3>');
            infowindow.setContent("<div id='infowindow'><div id='infowindow_pic'>"+location['picture']+"<h1>" + location['title'] +'</h1>'+ "<p>"+ location['name']+"</p></div>"+"<div id='infowindow_text'>" +"<br>"+ "<p cols='20'>"+location['desc']+"</p></div><div>");
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

