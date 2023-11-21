console.log("map_logic.js")

// Build base map
// Use https://leaflet-extras.github.io/leaflet-providers/preview/
// basemap is Stadia.OSMBright
let basemap = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
});


let myMap = L.map("map", {
    center: [-27, 133],
    zoom: 4
});

geomap.addTo(myMap);

// Build the menu
let baseMaps = {
    "AU Map Boundaries and Capitals": basemap
};

// Get Labels on Aus Map with Stadia.StamenTerrainLabels
let mapLabels = new L.LayerGroup();

let overlays = {
    "Job Listings per State": mapLabels,
};

L.control.layers(baseMaps, overlays, { collapsed: false }).addTo(myMap);

// Read GeoJSON data from a local file
fetch('../resources/Global-Solar-Power-Tracker-January-2023.geojson')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // Iterate over the GeoJSON data and add markers to the map
        data.features.forEach(feature => {
            const { latitude, longitude, project name, Capacity (MW) } = feature.properties;

            const marker = L.marker([latitude, longitude])
                .bindPopup(`${Project Name}<hr>Jobs posted: ${Capacity (MW)}`)
                .addTo(mapLabels);
        });

        mapLabels.addTo(myMap);
    })
    .catch(error => console.error('Error reading GeoJSON file:', error));


    function createMarkers(response) {

        // Pull the "stations" property from response.data.
        let stations = response.data.stations;
      
        // Initialise an array to hold the bike markers.
        let bikeMarkers = [];
      
        // Loop through the stations array.
        for (let index = 0; index < stations.length; index++) {
          let station = stations[index];
      
          // For each station, create a marker, and bind a popup with the station's name.
          let bikeMarker = L.marker([station.lat, station.lon])
            .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
      
          // Add the marker to the bikeMarkers array.
          bikeMarkers.push(bikeMarker);
        }
      
        // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
        createMap(L.layerGroup(bikeMarkers));
      }


    // Loop through the cities array, and create one marker for each city object.
for (let i = 0; i < countries.length; i++) {

    // Conditionals for country gdp_pc
    let color = "";
    if (countries[i].gdp_pc > 100000) {
      color = "yellow";
    }
    else if (countries[i].gdp_pc > 75000) {
      color = "blue";
    }
    else if (countries[i].gdp_pc > 50000) {
      color = "green";
    }
    else {
      color = "violet";
    }
  
    // Add circles to the map.
    L.circle(countries[i].location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      // Adjust the radius.
      radius: Math.sqrt(countries[i].gdp_pc) * 500
    }).bindPopup(`<h1>${countries[i].name}</h1> <hr> <h3>GDP Per Capita (USD): ${countries[i].gdp_pc}</h3>`).addTo(myMap);
}
  