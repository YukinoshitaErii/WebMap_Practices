// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
    "pk.eyJ1IjoiY2hyaXN0MDAwIiwiYSI6ImNsY3E0Y2IzbzAyYzkzc296bnR1bjN1em8ifQ.ifAwJWZFi6RRQCXNH3AYfg";

// create map
const map = new mapboxgl.Map({
    container: "map", // container element id
    style: "mapbox://styles/christ000/cldrevbcq000901qr5wlrjeed",
    center: [-73.890,40.834], // initial map center in [lon, lat]
    zoom: 12
});

// // config map
// // 10 is free
// let config = {
//     minZoom: 2,
//     maxZoom:10
// };
//
// // magnification with which the map will start
// const zoom = 4;
// // co-ordinates
// const lat = 40.834;
// const long = -73.890;

const data_url =
    "https://raw.githubusercontent.com/YukinoshitaErii/WebMap_Practices/main/list.json";

let geoJson;

// fetch data list
fetch(data_url)
    .then(function (response){
        return response.json();
    }).then(function (json){
        console.log(json);
});

