document.addEventListener("DOMContentLoaded", function(){

    // map 
    var map = L.map('map').setView([52.446483, -1.888168], 18);
    L.tileLayer('https://watercolormaps.collection.cooperhewitt.org/tile/watercolor/{z}/{x}/{y}.jpg', {
        maxZoom: 17,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    var moseleyExchange = L.marker([52.445947, -1.889369]).addTo(map);
    moseleyExchange.bindPopup("<b>Moseley Exchange</b><br>I am a popup!");

    var aesthetics = L.marker([52.446264, -1.887594]).addTo(map);
    aesthetics.bindPopup("<b>Art & Aesthetics</b><br>I am a popup!");
    

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



