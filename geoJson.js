/* Code to iterate over geoJson data
*/

fetch("http://localhost:5500/data/locations.json")
    .then((response) => response.json())
    .then((json) => console.log(`Artist Name: ${json.features[0].properties.artists[0].name}`));



