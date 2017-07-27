// Making a new JS component
// 1 - Replace map with new name ( 8 occurences in this file )
// 2 - All code goes into init()
// 3 - Save file as new name .js
var map = {
	name: 'map',
	componentInitSelector: '.map-canvas',
	registerComponent: function() {
		if ( $(map.componentInitSelector).length ) {
			framework.registerComponent(map);
		}
	},
	initmap: function() {
		$.each($(map.componentInitSelector), function( index, mapInstance ) {

			var url = $(this).data('feed');
			// log( index + ": " + url );

			buildMap = function(data) {
				// log(data.Options.CenterLng)

				var myLatLng = {lat: data.Options.CenterLat, lng: data.Options.CenterLng};

				map = new google.maps.Map(document.getElementById(mapInstance.id), {
			    	center: myLatLng,
			        zoom: data.Options.Zoom
			    });


 				$.each(data.Markers, function( index, markerInstance ) {

			    	var markerLatLng = {lat: markerInstance.Lat, lng: markerInstance.Lng};

			    	// log(markerInstance.Lat, markerInstance.Lng)

		    		var marker = new google.maps.Marker ({
				        position: markerLatLng,
				        map: map,
				        icon: markerInstance.Marker
				    });

				    var infoWindowContent = '<div class="map-content">'+
				        '<h3>' + markerInstance.Title + '</h3>'+
				        '<p>' + markerInstance.AddressLine1 + '<br>' + markerInstance.AddressLine2 + '<br>' + markerInstance.AddressLine3 + ' <br>' + markerInstance.Postcode + '</p>'+
				        '</div>';

				    var infowindow = new google.maps.InfoWindow ({
				        content: infoWindowContent
				    });

					marker.addListener('click', function() {
					 	infowindow.open(map, marker);
					    // log(markerInstance.Title);
					});
				})

				// log(index, data);
		 	}



		 	$.ajax({ url: url, data: 'I like turtles', success: buildMap, dataType: 'json' });
		 	// End
        	log(config.application.name + " •• map in " + Math.round( performance.now() - framework.initComponents.componentInitTime) + " milliseconds" );
		});
    },
    init: function() {
        // All code for this component goes in here
        loadScript("//maps.googleapis.com/maps/api/js?key=AIzaSyAcr41s0DQWuu_BGhkEEi_C8_1NFKxel5o", map.initmap);
    }
}

// Register self to the framework
map.registerComponent();
