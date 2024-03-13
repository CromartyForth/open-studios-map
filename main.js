
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
        moseleyExchange.bindPopup("<h1>Moseley Exchange</h1><p>Birmingham’s first coworking space, in the heart of Moseley Village.</P><img src='./images/FOR-WEB-open-studios-2022-6.jpg' width=100%>");

    var aesthetics = L.marker([52.446264, -1.887594]).addTo(map);
        aesthetics.bindPopup("<h1>Art & Aesthetics</h1><p>Known locally for being a creative and bohemian suburb, Seventh Circle radiate all the characteristics of this iconic area. Making art accessible is a passion at Seventh Circle, it is a universal language that everyone should be able to enjoy and appreciate. Whether you are simply browsing, looking for a unique piece to decorate your home, a gift for a loved one , or a way to express yourself, there is something for everyone at Seventh Circle.</p> <input type='image' id='imgButton' src='./images/Seventh-Circle-2023-08-20.jpg' width=100%>");

    
    // clickable button
    const div = document.createElement("div");
    div.innerHTML = "<br>'nametemplate'<br>";

    const button = document.createElement("button");
    button.innerHTML = "more...";
    button.id = "button1";

    button.onclick = function(e) {
        // create custome openArtist event
        const event = new CustomEvent("openArtist", {
            bubbles: true, 
            detail: {
                artist: e.target.id
            }
        });
        button1.dispatchEvent(event);

        //e.target.innerHTML = "clicked"
        //console.log(e.target.id);
    }
    div.appendChild(button);

    var clickable = L.marker([52.43821, -1.885604]).addTo(map);
        clickable.bindPopup(div);

    //event handler
    document.addEventListener("openArtist", function(event) {openArtist(event);});

    function openArtist(event){
        console.log(event.detail.artist);
    }
        



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

        L.marker(e.latlng).addTo(map).bindPopup("You are here!");

        L.circle(e.latlng, radius).addTo(map)
    }

    
    // map on click
    var popup = L.popup();
    map.on('click', onMapClick);

    function onMapClick(e) {
        
        popup
            .setLatLng(e.latlng)
            .setContent("Clicked at " + e.latlng.toString())
            .openOn(map);
        
       map.panTo(e.latlng);
    }
})



