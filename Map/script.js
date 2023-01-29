// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
    "pk.eyJ1IjoiY2hyaXN0MDAwIiwiYSI6ImNsY3E0Y2IzbzAyYzkzc296bnR1bjN1em8ifQ.ifAwJWZFi6RRQCXNH3AYfg";

const map = new mapboxgl.Map({
    container: "map", // container element id
    style: "mapbox://styles/christ000/cldhwp1m7000301lfacn4x7ux",
    center: [-73.890,40.834], // initial map center in [lon, lat]
    zoom: 12
});

map.addControl(new mapboxgl.NavigationControl());

map.on("load", () => {
    let filtergrade = ['!=', ['string', ['get', 'GRADE']], 'placeholder'];

    //Radio button interaction code goes below
    document.getElementById("filters").addEventListener("change", (event) => {
        const grade = event.target.value;
        // update the map filter
        if (grade == "all") {
            filtergrade = ['!=', ['string', ['get', 'GRADE']], 'placeholder'];
        } else if (grade == "A") {
            filtergrade = ["==", ["get", "GRADE"], 'A'];
        } else if (grade == "B") {
            filtergrade = ["==", ["string", ["get", "GRADE"]], 'B'];
        } else if (grade == "C") {
            filtergrade = ["==", ["string", ["get", "GRADE"]], 'C'];
        }else {
            console.log("error");
        }
        map.setFilter("bronx", filtergrade);
    });
});


map.on('click', (event) => {
// If the user clicked on one of your markers, get its information.
    const features = map.queryRenderedFeatures(event.point, {
        layers: ['bronx'] // replace with your layer name
    });
    if (!features.length) {
        return;
    }
    const feature = features[0];

    /*
    Create a popup, specify its options and properties, and add it to the map.
    */
    const popup = new mapboxgl.Popup({ offset: [0, -15], className: "my-popup" }).setLngLat(feature.geometry.coordinates).setHTML(
        `
        <h3>Restaurant Name: ${feature.properties.DBA}</h3>
        <p>Grade: ${feature.properties.GRADE}</p>
        <p>Score: ${feature.properties.SCORE}</p>
        <p>Address: ${feature.properties.STREET}</p>
`
    ).addTo(map);


});