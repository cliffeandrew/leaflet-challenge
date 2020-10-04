// Creating map object
  // "https://earthquake.usgs.gov/fdsnws/event/1/application.json";
  
  function createMap(earthquakeLocations) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    });
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the earthquakeLocations layer
    var overlayMaps = {
      "Earthquake Locations": earthquakeLocations
    };
  
    // Create the map object with options
    var map = L.map("mapid", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [lightmap, earthquakeLocations]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "coordinates" property off of response.data
    var earthquakes = response.features.geometry.coordinates;
  
    // Initialize an array to hold earthquake markers
    var earthquakeMarkers = [];
  
    // Loop through the earthquakes array
    for (var index = 0; index < earthquakes.length; index++) {
      var earthquake = earthquakes[index];
  
      // For each earthquake, create a marker and bind a popup with the earthquakes location
      var earthquakeMarker = L.marker([earthquake[0], earthquake[1]])
        .bindPopup("<h3>Latitude: " + earthquake[0] + "<h3><h3>Longitude: " + earthquake[1] + "<h3><h3>Depth: " + depth[2] + "</h3>");
  
      // Add the marker to the earthquakeMarkers array
      earthquakeMarkers.push(earthquakeMarker);
    }
  
    // Create a layer group made from the earthquake markers array, pass it into the createMap function
    createMap(L.layerGroup(earthquakeMarkers));
  }
  
    // Perform an API call to the API to get earthquake information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/fdsnws/event/1/application.json", createMarkers);
  console.log(createMarkers);