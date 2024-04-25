
document.addEventListener("DOMContentLoaded", function(){

    // map 
    var map = L.map('map')//.setView([52.446483, -1.888168], 18);
    console.log(map.locate({setView: true, minZoom: 1, maxZoom: 17}));
    console.log("Map size: " + map.getSize());
    var mapSize = map.getSize();

    // adjust the width of popup on small widths so there is room to scroll the screen (Only my screen size so far)
    const popupPadding = 47;
    var popupMaxWidth = Math.trunc(mapSize.x * 0.8 - popupPadding);
    if (popupMaxWidth > 300){
        popupMaxWidth = 300;
    }
    //console.log(popupMaxWidth);
    
    
    // the map tiles
    
    var watercolor = L.tileLayer('https://watercolormaps.collection.cooperhewitt.org/tile/watercolor/{z}/{x}/{y}.jpg', {
        maxZoom: 17,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    

    // user location not found set view to bounds
    map.on('locationerror', onLocationError);

    function onLocationError(e) {
        //alert(e.message);
        map.setView([52.446483, -1.888168], 12);
    }

    // user location found add a marker
    map.on('locationfound', onLocationFound);

    function onLocationFound(e) {
        var radius = e.accuracy;
        if (radius > 10) radius = 10;

        L.marker(e.latlng).addTo(map).bindPopup("You are here!");

        L.circle(e.latlng, radius).addTo(map)
    }

    
    // map on click gives position in popup
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

        // tag ids must be contiguous (id created from title)
        const id = title.replace(/\s+/g, "");
        
        if (title) {
            console.log(`Let's add ${title} to the map!`);

            var artists = feature.properties.artists;
            console.log(artists);
            var carousel = "";
            
            // add each artists card to carousel
            for(var i = 0; i < artists.length; i++){
                carousel += `
                    <div class="image${i === 0 ? " active": ""}">
                        <div>
                            <img src="./images/${artists[i].image}"/>
                        </div>
                        <div>
                            <h3>${artists[i].name}</h3>
                        </div>
                        <div id="artistText">
                            ${artists[i].text}
                        </div>
                    </div>
                `
            }

            var artistNumber = "";
            // artist or artists
            if (artists.length > 1) {
                artistNumber = `
                    <h1>${title}</h1>
                    <h4>There are ${artists.length + " "}Artists Exhibiting here</h4>
                `
            }

            var artistCycle = "";
            if (artists.length > 1){
                artistCycle = `
                <div class="cycle">
                    <a href="#" class="prev">Previous Artist</a>
                    <a href="#" class="next">Next Artist</a>
                </div>
                `
            }
            
            // construct the popup html
            var popupContent = `
                <div id=${id} class="popup">
                    ${artistNumber}
                    <div class="carousel">
                        ${carousel}
                    </div>
                    ${artistCycle}
                </div>
                
            `
            layer.bindPopup(popupContent, {maxWidth: popupMaxWidth, minWidth: popupMaxWidth});
        }
    }

    // get geoJson data
    fetch("./data/locations.json")
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
        document.getElementById(Id).addEventListener("click", (event) => popupClick(event, Id));
    })

    function popupClick(event, Id) {
        
        const button = event.target.className
        if(button === "prev"){
            console.log(button + " pressed")

            // get the active image
            const carousel = document.getElementsByClassName("carousel");
            const images = document.querySelector("div.image.active")
            
            if (images.previousElementSibling == null){
                console.log("There's nothing here");
                images.classList.remove("active");
                carousel[0].lastElementChild.classList.add("active");
            }
            else {
                images.classList.remove("active");
                images.previousElementSibling.classList.add("active");
            }

        } else if(button === "next"){
            console.log(button + " pressed")

            // get the active image
            const carousel = document.getElementsByClassName("carousel");
            const images = document.querySelector("div.image.active");

            if (images.nextElementSibling == null){
                console.log("There's nothing here");
                images.classList.remove("active");
                carousel[0].firstElementChild.classList.add("active");
            } else {
                images.classList.remove("active");
                images.nextElementSibling.classList.add("active");
            }

        }
    }
        
})


    
    



