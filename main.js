
document.addEventListener("DOMContentLoaded", function(){

    // map 
    var map = L.map('map')//.setView([52.446483, -1.888168], 18);
    console.log(map.locate({setView: true, minZoom: 1, maxZoom: 17}));
    
    
    var watercolor = L.tileLayer('https://watercolormaps.collection.cooperhewitt.org/tile/watercolor/{z}/{x}/{y}.jpg', {
        maxZoom: 17,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    /*
    var Stadia_StamenTonerLabels = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_labels/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 17,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    }).addTo(map);
    

    var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}', {
	    minZoom: 0,
	    maxZoom: 20,
	    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	    ext: 'png'}).addTo(map);
    */
    
    var moseleyExchange = L.marker([52.445947, -1.889369]).addTo(map);
        moseleyExchange.bindPopup("<b>Moseley Exchange</b><br>I am a popup!");
    var aesthetics = L.marker([52.446264, -1.887594]).addTo(map);
        aesthetics.bindPopup("<b>Art & Aesthetics</b><br>I am a popup!");

    // location not found set view to bounds
    map.on('locationerror', onLocationError);

    function onLocationError(e) {
        //alert(e.message);
        map.setView([52.446483, -1.888168], 12);
    }

    // location found add a marker
    map.on('locationfound', onLocationFound);

    function onLocationFound(e) {
        var radius = e.accuracy;
        if (radius > 10) radius = 10;

        L.marker(e.latlng).addTo(map).bindPopup("You are here!").openPopup();

        L.circle(e.latlng, radius).addTo(map)
    }

    

    // map position on click
    var popup = L.popup();
    map.on('click', onMapClick);

    function onMapClick(e) {

        popup
            .setLatLng(e.latlng)
            .setContent("Clicked at " + e.latlng.toString())
            .openOn(map); 
    }
})



