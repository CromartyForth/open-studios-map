
document.addEventListener("DOMContentLoaded", function(){

    // map 
    var map = L.map('map')//.setView([52.446483, -1.888168], 18);
    console.log(map.locate({setView: true, minZoom: 1, maxZoom: 17}));
    console.log("Map size: " + map.getSize());
    var mapSize = map.getSize();

    // adjust the width of popup on small widths so there is room to scroll the screen
    const popupPadding = 47;
    var popupMaxWidth = Math.trunc(mapSize.x * 0.8 - popupPadding);
    if (popupMaxWidth > 300){
        popupMaxWidth = 300;
    }

    console.log(popupMaxWidth);
    
    /*
    // the map tiles
    var watercolor = L.tileLayer('https://watercolormaps.collection.cooperhewitt.org/tile/watercolor/{z}/{x}/{y}.jpg', {
        maxZoom: 17,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    */
    /*
    var moseleyExchange = L.marker([52.445947, -1.889369]).addTo(map);
        moseleyExchange.bindPopup("<h1>Moseley Exchange</h1><p>Birmingham’s first coworking space, in the heart of Moseley Village.</P><img src='./images/FOR-WEB-open-studios-2022-6.jpg' width=100%>");

    var aesthetics = L.marker([52.446264, -1.887594]).addTo(map);
        aesthetics.bindPopup("<h1>Art & Aesthetics</h1><p>Known locally for being a creative and bohemian suburb, Seventh Circle radiate all the characteristics of this iconic area. Making art accessible is a passion at Seventh Circle, it is a universal language that everyone should be able to enjoy and appreciate. Whether you are simply browsing, looking for a unique piece to decorate your home, a gift for a loved one , or a way to express yourself, there is something for everyone at Seventh Circle.</p> <input type='image' id='imgButton' src='./images/Seventh-Circle-2023-08-20.jpg' width=100%>", {maxWidth: popupMaxWidth, keepInView: true});

    var openStatic = L.marker([52.438655, -1.885121]).addTo(map);
        openStatic.on('click', function(e) {
            console.log("click");
        });
    */

    // clickable button
    const div = document.createElement("div");
    div.innerHTML = "<br>'nametemplate'<br>";

    const button = document.createElement("button");
    button.innerHTML = "more...";
    button.id = "button1";

    button.onclick = function(e) {
        // create custom openArtist event
        const event = new CustomEvent("openArtist", {
            bubbles: true, 
            detail: {
                artist: e.target.id
            }
        });
        button1.dispatchEvent(event);
    }

    div.appendChild(button);

    var clickable = L.marker([52.43821, -1.885604]).addTo(map);
        clickable.bindPopup(div, {maxWidth: 100});

    //event handler
    document.addEventListener("openArtist", function(event) {openArtist(event);});

    function openArtist(event){
        console.log(event.detail.artist);
        console.log(clickable.closePopup());
        // resize map 
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

    
    // map on click gives position
    var popup = L.popup();
    map.on('click', onMapClick);

    function onMapClick(e) {
        
        popup
            .setLatLng(e.latlng)
            .setContent("Clicked at " + e.latlng.toString() + popupMaxWidth)
            .openOn(map);
        
       map.panTo(e.latlng);
       console.log(e);
    }


    // geojason on each function
    function onEachFeature(feature, layer) {
        // does this feature have a property named title
        const title = feature.properties.title;

        // tag ids must be contiguous
        const id = title.replace(/\s+/g, "");
        
        if (title) {
            console.log(`Let's add ${title} to the map!`);

            var artists = feature.properties.artists;
            console.log(artists);
            var carousel = "";
            
            // add each artists card to carousell
            for(var i = 0; i < artists.length; i++){
                carousel += `
                    <div class="image${i === 0 ? " active": ""}">
                        <img src="./images/${artists[i].image}"/>
                    </div>
                `
            }
            
            // construct the popup html
            var popupContent = `
                <div id=${id} class="popup">
                    <h1>${title}</h1>
                    <div class="carousel">
                        ${carousel}
                    </div>
                    <div class="cycle">
                        <a href="#" class="prev">Previous</a>
                        <a href="#" class="next">Next</a>
                    </div>
                </div>
                
            `
            layer.bindPopup(popupContent);
        }
    }

    // get geoJson data
    fetch("http://localhost:5500/data/locations.json")
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Something went wrong on API server");
            }
        })
        .then((data) => {
            console.debug(data);
            L.geoJSON(data, {
                onEachFeature: onEachFeature
            }).addTo(map);
        })
        .catch((error) => {
            console.error(error);
        });
    

    // event listeners for popup previous and next buttons
    // popup open event. What is in it?
    map.on('popupopen', function(event){

        // properties of popup
        var title = event.popup._source.feature.properties.title;
        var Id = title.replace(/\s+/g, "");
        console.log(Id);
        document.getElementById(Id).addEventListener("click", popupClick);
    })

    function popupClick(event) {
        console.log(event.target.className);
        console.log(event);
    }

})
    
    



