// The value for 'accessToken' begins with 'pk...'
// mapboxgl.accessToken =
//     "pk.eyJ1IjoiY2hyaXN0MDAwIiwiYSI6ImNsY3E0Y2IzbzAyYzkzc296bnR1bjN1em8ifQ.ifAwJWZFi6RRQCXNH3AYfg";
//
// // create map
// const map = new mapboxgl.Map({
//     container: "map", // container element id
//     style: "mapbox://styles/christ000/cldrevbcq000901qr5wlrjeed",
//     center: [-73.890,40.834], // initial map center in [lon, lat]
//     zoom: 12
// });


// run python script
let jsexecpy = require("jsexecpy")
let callback = function({data,pythonpath},otherargs = 11){
dosomething(data,pythonpath,otherargs)
};
jsexecpy.runpath("/Users/000fere/Documents/Python_Projects/I");