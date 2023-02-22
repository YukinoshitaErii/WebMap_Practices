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

// data list json
const list_url =
    "https://raw.githubusercontent.com/YukinoshitaErii/WebMap_Practices/main/list.json";

let geoJson;
var geolist;
let geoJsonnow;


// fetch(data_url)
//     .then((res )=> res.json())
//     .then((json) => {
//         geolist = json;
//     }).catch(err => console.error(err));
// fetch(list_url)
//     .then(response => response.json())
//     .then(data => {
//         geolist=data;
//     });
// find today or yester data url


fetch(list_url)
    .then(function (res) {
        return res.json();
    })
    .then(function (out) {
        console.log('Checkout this JSON! ', out)
        geolist = out;
        return out;
    }).then(function (data){
    // today date
    let today = new Date(Date.now());
    let now = today.toISOString();
    now = now.substring(0,10);
    // yesterday
    var day1 = new Date();
    day1.setTime(day1.getTime()-24*60*60*1000);
    let yesterday = day1.toISOString().substring(0,10);
    var sign = 0;
    var index = 0;

    length_list = Object.keys(data['Date']).length;
    console.log(length_list)
    // find if there exixt a day in data list
    for( var i=0;i<length_list;i++) {
        if (now == data.Date[i]){
            sign=1;
            index = i;
        }else if (yesterday == data.Date[i]){
            sign = 2;
            index = i;
        }else {
            sign = 0;
        }}
    geoJson = data.file[index]
    // fetch today data
    fetch(geoJson)
        .then(function(res1) {
            res2 = res1.json();
            return res2
        })
        .then(function (json1){
            geoJsonnow = json1;
            return json1;
        }).catch(err => console.error(err));
})
    .catch(err => { throw err });















map.on("load",()=>{
    map.addSource("data_url", {
        type: "geojson",
        data: geoJsonnow,
        generateId: true
    });

    map.addLayer({
        id: "accidents",
        type: "circle",
        source: "data_url"})
});


