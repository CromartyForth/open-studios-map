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

    //event handler for clickable button
    document.addEventListener("openArtist", function(event) {openArtist(event);});

    function openArtist(event){
        console.log(event.detail.artist);
        console.log(clickable.closePopup());
        // resize map 
    }