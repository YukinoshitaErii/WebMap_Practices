// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
    "pk.eyJ1IjoiY2hyaXN0MDAwIiwiYSI6ImNsY3E0Y2IzbzAyYzkzc296bnR1bjN1em8ifQ.ifAwJWZFi6RRQCXNH3AYfg";

// create map
const map = new mapboxgl.Map({
    container: "map", // container element id
    style: "mapbox://styles/christ000/cldrevbcq000901qr5wlrjeed",
    center: [-73.890,40.834], // initial map center in [lon, lat]
    zoom: 10
});

// data list json
const list_url =
    "https://raw.githubusercontent.com/YukinoshitaErii/WebMap_Practices/main/list.json";

let geoJson_m;
let geoJson_v;
let geoJson_l;
var geolist;
let geoJsonnow_m;
let geoJsonnow_v;
let geoJsonnow_l;


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
    var index_m = 0;
    var index_v = 0;
    var index_l = 0;

    length_list = Object.keys(data['Date']).length;
    console.log(length_list)
    // find if there exixt a day in data list
    for(var i=0;i<length_list;i++) {
        if (now == data.Date[i]&&'modis-c6.1'==data.class[i]){
            sign=1;
            index_m = i;
        }else if (now == data.Date[i]&&'landsat'==data.class[i]) {
            sign = 1;
            index_l = i;
        }else if (now == data.Date[i]&&'noaa-20-viirs-c2'==data.class[i]) {
            sign = 1;
            index_v = i;
        }
        else if (yesterday == data.Date[i]&&'modis-c6.1'==data.class[i]){
            sign=1;
            index_m = i;
        }else if (yesterday == data.Date[i]&&'landsat'==data.class[i]) {
            sign = 1;
            index_l = i;
        }else if (yesterday == data.Date[i]&&'noaa-20-viirs-c2'==data.class[i]) {
            sign = 1;
            index_v = i;
        }
        };

    geoJson_m = data.file[index_m];
    geoJson_v = data.file[index_v];
    geoJson_l = data.file[index_l];
    // fetch today data
    // m
    fetch(geoJson_m)
        .then(function(res1) {
            res2 = res1.json();
            return res2
        })
        .then(function (json1){
            geoJsonnow_m = json1;
            return json1;
        }).catch(err => console.error(err));
    //l
    fetch(geoJson_l)
        .then(function(res1) {
            res2 = res1.json();
            return res2
        })
        .then(function (json1){
            geoJsonnow_l = json1;
            return json1;
        }).catch(err => console.error(err));
    // v
    fetch(geoJson_v)
        .then(function(res1) {
            res2 = res1.json();
            return res2
        })
        .then(function (json1){
            geoJsonnow_v = json1;
            return json1;
        }).catch(err => console.error(err));

})
    .catch(err => { throw err });


map.on("load",()=> {
    // let filterTime = ["==", ["number", ["get", "time"]], 12];
    // let filterYear = ["<=", ["number", ["get", "year"]], 2022];
    //data
    map.addSource("point_m", {
        type: "geojson",
        data: geoJsonnow_m,
        generateId: true
    });

    map.addSource("point_l", {
        type: "geojson",
        data: geoJsonnow_l,
        generateId: true
    });

    map.addSource("point_v", {
        type: "geojson",
        data: geoJsonnow_v,
        generateId: true
    });
    // layer
    map.addLayer({
        id: "fire-points_m",
        type: "circle",
        source: "point_m",
        paint: {
            "circle-radius": [
                "interpolate",
                ["linear"],
                ["number", ["get", "brightness"]],
                1,
                3,
                5,
                7,
                9,
                10
            ],
            "circle-color":
                "#00858C",
            "circle-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                1,
                0.5
            ]
        }
    });

    map.addLayer({
        id: "fire-points_v",
        type: "circle",
        source: "point_v",
        paint: {
            "circle-radius": [
                "interpolate",
                ["linear"],
                ["number", ["get", "bright_ti4"]],
                1,
                3,
                5,
                7,
                9,
                10
            ],
            "circle-color":
                "#7A7299",
            "circle-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                1,
                0.5
            ]
        }
    });

    map.addLayer({
        id: "fire-points_l",
        type: "circle",
        source: "point_l",
        paint: {
            "circle-radius": [
                "interpolate",
                ["linear"],
                ["number", ["get", "bright_ti4"]],
                1,
                3,
                5,
                7,
                9,
                10
            ],
            "circle-color":
                "#111111",
            "circle-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                1,
                0.5
            ]
        }
    });

    // geocoder search control
    const geocoder = new MapboxGeocoder({
        // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        marker: false, // Do not use the default marker style
        placeholder: "Search for places in US", // Placeholder text for the search bar
        proximity: {
            longitude: 55.8642,
            latitude: 4.2518
        } // Coordinates of Glasgow center
    });

    map.addControl(geocoder, "top-right");

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        }),
        "top-right"
    );
});












