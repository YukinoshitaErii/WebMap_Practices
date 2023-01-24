// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken = "pk.eyJ1IjoiY2hyaXN0MDAwIiwiYSI6ImNsY3E0Y2IzbzAyYzkzc296bnR1bjN1em8ifQ.ifAwJWZFi6RRQCXNH3AYfg";

const style_2019 = "mapbox://styles/christ000/clda7tlvt000301o0ow04n14k";
const style_2021 = "mapbox://styles/christ000/clda6bvvh001v01o02251g1h1";

// create a map
const map = new mapboxgl.Map({
    container: "map", // container ID
    style: style_2019,
    center: [-0.089932, 51.514441],
    zoom: 14
});

// add some HS to enable the radio button interaction
const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");

//On click the radio button, toggle the style of the map.
for (const input of inputs) {
    input.onclick = (layer) => {
        if (layer.target.id == "style_2019") {
            map.setStyle(style_2019);
        }
        if (layer.target.id == "style_2021") {
            map.setStyle(style_2021);
        }
    };
}
