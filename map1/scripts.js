$(document).ready(function () {
    function toggleSidebar() {
        $(".button").toggleClass("active");
        $("main").toggleClass("move-to-left");
        $(".sidebar-item").toggleClass("active");
    }

    $(".button").on("click tap", function () {
        toggleSidebar();
    });

    $(document).keyup(function (e) {
        if (e.keyCode === 27) {
            toggleSidebar();
        }
    });


    // right sidebar section
    // right first trigger
    let first_sign = 0;
    let first_sign_i = 0;

    // introduction section
    $(".introduction").on("click tap", () => {
        // let first_sign_i = first_sign;
        if (first_sign == 0) {
            // introduction
            $("main").toggleClass("intro");
            $(".intro-list").toggleClass("intro");
            $(".intro-text").toggleClass("intro");
            $(".sidebar").toggleClass("intro");
            $(".introduction").toggleClass("intro");
            first_sign_i = 1;
        } else if (first_sign == 1) {
            $("main").toggleClass("intro");
            $(".intro-list").toggleClass("intro");
            $(".intro-text").toggleClass("intro");
            $(".sidebar").toggleClass("intro");
            $(".introduction").toggleClass("intro");
            first_sign_i = 0;
        } else {
            if (first_sign == 2) {
                $("main").toggleClass("fur");
                $(".fur-list").toggleClass("fur");
                $(".fur-text").toggleClass("fur");
                $(".sidebar").toggleClass("fur");
                $(".further").toggleClass("fur");
                console.log("introduction further " + first_sign);
            }
            if (first_sign == 3) {
                $("main").toggleClass("auth");
                $(".author-list").toggleClass("auth");
                $(".author-text").toggleClass("auth");
                $(".sidebar").toggleClass("auth");
                $(".author").toggleClass("auth");
                console.log("introduction author " + first_sign);
            }
            if (first_sign == 4) {
                $("main").toggleClass("sh");
                $(".share-list").toggleClass("sh");
                $(".share-text").toggleClass("sh");
                $(".sidebar").toggleClass("sh");
                $(".share").toggleClass("sh");
                console.log("introduction share " + first_sign);
            }
            $("main").toggleClass("intro");
            $(".intro-list").toggleClass("intro");
            $(".intro-text").toggleClass("intro");
            $(".sidebar").toggleClass("intro");
            $(".introduction").toggleClass("intro");
            first_sign_i = 1;
        }
        first_sign = first_sign_i;
        console.log('first' + first_sign);
    });

    // further information toggle
    $(".further").on("click tap", () => {
        // let first_sign_i = first_sign;
        if (first_sign == 0) {
            // introduction
            $("main").toggleClass("fur");
            $(".fur-list").toggleClass("fur");
            $(".fur-text").toggleClass("fur");
            $(".sidebar").toggleClass("fur");
            $(".further").toggleClass("fur");
            first_sign_i = 2;
        } else if (first_sign == 2) {
            $("main").toggleClass("fur");
            $(".fur-list").toggleClass("fur");
            $(".fur-text").toggleClass("fur");
            $(".sidebar").toggleClass("fur");
            $(".further").toggleClass("fur");
            first_sign_i = 0;
        } else {
            if (first_sign == 1) {
                $("main").toggleClass("intro");
                $(".intro-list").toggleClass("intro");
                $(".intro-text").toggleClass("intro");
                $(".sidebar").toggleClass("intro");
                $(".introduction").toggleClass("intro");
                console.log("further introduction" + first_sign);
            }
            if (first_sign == 3) {
                $("main").toggleClass("auth");
                $(".author-list").toggleClass("auth");
                $(".author-text").toggleClass("auth");
                $(".sidebar").toggleClass("auth");
                $(".author").toggleClass("auth");
                console.log("further author " + first_sign);
            }
            if (first_sign == 4) {
                $("main").toggleClass("sh");
                $(".share-list").toggleClass("sh");
                $(".share-text").toggleClass("sh");
                $(".sidebar").toggleClass("sh");
                $(".share").toggleClass("sh");
                console.log("further share " + first_sign);
            }
            $("main").toggleClass("fur");
            $(".fur-list").toggleClass("fur");
            $(".fur-text").toggleClass("fur");
            $(".sidebar").toggleClass("fur");
            $(".further").toggleClass("fur");
            first_sign_i = 2;
        }
        first_sign = first_sign_i;
        console.log('first' + first_sign);
    });


    // author toggle
    $(".author").on("click tap", () => {
        if (first_sign == 0) {
            // author
            $("main").toggleClass("auth");
            $(".author-list").toggleClass("auth");
            $(".author-text").toggleClass("auth");
            $(".sidebar").toggleClass("auth");
            $(".author").toggleClass("auth");
            first_sign_i = 3;
        } else if (first_sign == 3) {
            $("main").toggleClass("auth");
            $(".author-list").toggleClass("auth");
            $(".author-text").toggleClass("auth");
            $(".sidebar").toggleClass("auth");
            $(".author").toggleClass("auth");
            first_sign_i = 0;
        } else {
            if (first_sign == 1) {
                $("main").toggleClass("intro");
                $(".intro-list").toggleClass("intro");
                $(".intro-text").toggleClass("intro");
                $(".sidebar").toggleClass("intro");
                $(".introduction").toggleClass("intro");
                console.log("author introduction" + first_sign);
            }
            if (first_sign == 2) {
                $("main").toggleClass("fur");
                $(".fur-list").toggleClass("fur");
                $(".fur-text").toggleClass("fur");
                $(".sidebar").toggleClass("fur");
                $(".further").toggleClass("fur");
                console.log("author further " + first_sign);
            }
            if (first_sign == 4) {
                $("main").toggleClass("sh");
                $(".share-list").toggleClass("sh");
                $(".share-text").toggleClass("sh");
                $(".sidebar").toggleClass("sh");
                $(".share").toggleClass("sh");
                console.log("author share " + first_sign);
            }
            $("main").toggleClass("auth");
            $(".author-list").toggleClass("auth");
            $(".author-text").toggleClass("auth");
            $(".sidebar").toggleClass("auth");
            $(".author").toggleClass("auth");
            first_sign_i = 3;
        }
        first_sign = first_sign_i;
        console.log('first' + first_sign);
    });

    // share toggle
    $(".share").on("click tap", () => {
        if (first_sign == 0) {
            $("main").toggleClass("sh");
            $(".share-list").toggleClass("sh");
            $(".share-text").toggleClass("sh");
            $(".sidebar").toggleClass("sh");
            $(".share").toggleClass("sh");
            first_sign_i = 4;
        } else if (first_sign == 4) {
            $("main").toggleClass("sh");
            $(".share-list").toggleClass("sh");
            $(".share-text").toggleClass("sh");
            $(".sidebar").toggleClass("sh");
            $(".share").toggleClass("sh");
            first_sign_i = 0;
        } else {
            if (first_sign == 1) {
                $("main").toggleClass("intro");
                $(".intro-list").toggleClass("intro");
                $(".intro-text").toggleClass("intro");
                $(".sidebar").toggleClass("intro");
                $(".introduction").toggleClass("intro");
                console.log("share introduction" + first_sign);
            }
            if (first_sign == 2) {
                $("main").toggleClass("fur");
                $(".fur-list").toggleClass("fur");
                $(".fur-text").toggleClass("fur");
                $(".sidebar").toggleClass("fur");
                $(".further").toggleClass("fur");
                console.log("share further " + first_sign);
            }
            if (first_sign == 3) {
                $("main").toggleClass("auth");
                $(".author-list").toggleClass("auth");
                $(".author-text").toggleClass("auth");
                $(".sidebar").toggleClass("auth");
                $(".author").toggleClass("auth");
                console.log("share author " + first_sign);
            }
            $("main").toggleClass("sh");
            $(".share-list").toggleClass("sh");
            $(".share-text").toggleClass("sh");
            $(".sidebar").toggleClass("sh");
            $(".share").toggleClass("sh");
            first_sign_i = 4;
        }
        first_sign = first_sign_i;
        console.log('first' + first_sign);
    });


    // right part

    // data part
    $(".data-button").on("click tap", function () {
        $("main").toggleClass("data-move");
        $(".data-panel").toggleClass("dp");
        $(".data-panel-item").toggleClass("dp");
    });

    var data_sign = 0;
    var data_sign_i = 0;

    // date section
    $(".date").on("click tap", () => {
        if (data_sign == 0) {
            $("main").toggleClass("dates");
            $(".date-list").toggleClass("dates");
            $(".date-text").toggleClass("dates");
            $(".data-panel").toggleClass("dates");
            $(".date").toggleClass("dates");
            data_sign_i = 1;
        } else if (data_sign == 1) {
            $("main").toggleClass("dates");
            $(".date-list").toggleClass("dates");
            $(".date-text").toggleClass("dates");
            $(".data-panel").toggleClass("dates");
            $(".date").toggleClass("dates");
            data_sign_i = 0;
        } else {
            if (data_sign == 2) {
                $("main").toggleClass("lay");
                $(".layer-list").toggleClass("lay");
                $(".layer-text").toggleClass("lay");
                $(".data-panel").toggleClass("lay");
                $(".layer").toggleClass("lay");
                console.log("date layer " + data_sign);
            }
            if (data_sign == 3) {
                $("main").toggleClass("base");
                $(".basemap-list").toggleClass("base");
                $(".basemap-text").toggleClass("base");
                $(".data-panel").toggleClass("base");
                $(".basemap").toggleClass("base");
                console.log("date basemap " + data_sign);
            }
            $("main").toggleClass("dates");
            $(".date-list").toggleClass("dates");
            $(".date-text").toggleClass("dates");
            $(".data-panel").toggleClass("dates");
            $(".date").toggleClass("dates");
            data_sign_i = 1;
        }
        data_sign = data_sign_i;
        console.log('1' + data_sign);
    });


    // basemap section
    $(".basemap").on("click tap", () => {
        if (data_sign == 0) {
            $("main").toggleClass("base");
            $(".basemap-list").toggleClass("base");
            $(".basemap-text").toggleClass("base");
            $(".data-panel").toggleClass("base");
            $(".basemap").toggleClass("base");
            data_sign_i = 3;
        } else if (data_sign == 3) {
            $("main").toggleClass("base");
            $(".basemap-list").toggleClass("base");
            $(".basemap-text").toggleClass("base");
            $(".data-panel").toggleClass("base");
            $(".basemap").toggleClass("base");
            data_sign_i = 0;
        } else {
            if (data_sign == 2) {
                $("main").toggleClass("lay");
                $(".layer-list").toggleClass("lay");
                $(".layer-text").toggleClass("lay");
                $(".data-panel").toggleClass("lay");
                $(".layer").toggleClass("lay");
                console.log("basemap layer " + data_sign);
            }
            if (data_sign == 1) {
                $("main").toggleClass("dates");
                $(".date-list").toggleClass("dates");
                $(".date-text").toggleClass("dates");
                $(".data-panel").toggleClass("dates");
                $(".date").toggleClass("dates");
                console.log("basemap date" + data_sign);
            }
            $("main").toggleClass("base");
            $(".basemap-list").toggleClass("base");
            $(".basemap-text").toggleClass("base");
            $(".data-panel").toggleClass("base");
            $(".basemap").toggleClass("base");
            data_sign_i = 3;
        }
        data_sign = data_sign_i;
        console.log('1' + data_sign);
    });


    // layer section
    $(".layer").on("click tap", () => {
        if (data_sign == 0) {
            $("main").toggleClass("lay");
            $(".layer-list").toggleClass("lay");
            $(".layer-text").toggleClass("lay");
            $(".data-panel").toggleClass("lay");
            $(".layer").toggleClass("lay");
            data_sign_i = 2;
        } else if (data_sign == 2) {
            $("main").toggleClass("lay");
            $(".layer-list").toggleClass("lay");
            $(".layer-text").toggleClass("lay");
            $(".data-panel").toggleClass("lay");
            $(".layer").toggleClass("lay");
            data_sign_i = 0;
        } else {
            if (data_sign == 3) {
                $("main").toggleClass("base");
                $(".basemap-list").toggleClass("base");
                $(".basemap-text").toggleClass("base");
                $(".data-panel").toggleClass("base");
                $(".basemap").toggleClass("base");
                console.log("layer basemap" + data_sign);
            }
            if (data_sign == 1) {
                $("main").toggleClass("dates");
                $(".date-list").toggleClass("dates");
                $(".date-text").toggleClass("dates");
                $(".data-panel").toggleClass("dates");
                $(".date").toggleClass("dates");
                console.log("layer date" + data_sign);
            }
            $("main").toggleClass("lay");
            $(".layer-list").toggleClass("lay");
            $(".layer-text").toggleClass("lay");
            $(".data-panel").toggleClass("lay");
            $(".layer").toggleClass("lay");
            data_sign_i = 2;
        }
        data_sign = data_sign_i;
        console.log('1' + data_sign);
    });


    // second section
    // function panel
    $(".function-button").on("click tap", function () {
        $("main").toggleClass("function-move");
        $(".function-panel").toggleClass("fun");
        $(".function-panel-item").toggleClass("fun");
    });
});

// mapbox section
// accessToken
mapboxgl.accessToken =
    "pk.eyJ1IjoiY2hyaXN0MDAwIiwiYSI6ImNsY3E0Y2IzbzAyYzkzc296bnR1bjN1em8ifQ.ifAwJWZFi6RRQCXNH3AYfg";

// create map
const map = new mapboxgl.Map({
    container: "map", // container element id
    style: "mapbox://styles/christ000/cldrevbcq000901qr5wlrjeed",
    center: [-83.89, 40.834], // initial map center in [lon, lat]
    zoom: 5
});

// data list json url
const list_url =
    "https://raw.githubusercontent.com/YukinoshitaErii/WebMap_Practices/main/list.json";

// the satellites are in three class, modies, viirs, landsat
// define these three satellite data url
let geoJson_m, geoJson_v, geoJson_l;
// data list json
let geolist;

// fetch the data list
fetch(list_url)
    .then((res) => {
        return res.json();
    })
    .then((out) => {
        // get list json
        console.log("Checkout this JSON!", out);
        geolist = out;
        return out;
    })
    .then((data) => {
        // find the newest data in list
        // the key of these three class
        let index_m,
            index_v,
            index_l = 0;
        // compare date
        let date;
        let date1 = data["Date"][0];
        date1 = new Date(date1);
        for (let i in data["Date"]) {
            date = data["Date"][i];
            date = new Date(date);
            if (date >= date1 && "modis-c6.1" == data.class[i]) {
                date1 = date;
                index_m = i;
            } else if (date >= date1 && "landsat" == data.class[i]) {
                date1 = date;
                index_l = i;
            } else if (date >= date1 && "noaa-20-viirs-c2" == data.class[i]) {
                date1 = date;
                index_v = i;
            }
        }

        geoJson_m = data.file[index_m];
        geoJson_v = data.file[index_v];
        geoJson_l = data.file[index_l];
    })
    .catch((err) => {
        throw err;
    });

// this is mapbox section
map.on("load", () => {
    // add data from previous url
    // modis
    map.addSource("point_m", {
        type: "geojson",
        data: geoJson_m,
        generateId: true
    });

    // landsat
    map.addSource("point_l", {
        type: "geojson",
        data: geoJson_l,
        generateId: true
    });

    // viirs
    map.addSource("point_v", {
        type: "geojson",
        data: geoJson_v,
        generateId: true
    });

    // add icon layer
    // modis
    map.loadImage(
        "https://raw.githubusercontent.com/YukinoshitaErii/WebMap_Practices/main/1.png",
        (error, image) => {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage("modis-d", image);
            // Add a layer to use the image to represent the data.
            map.addLayer({
                id: "points_m1-icon",
                type: "symbol",
                source: "point_m", // reference the data source
                layout: {
                    "icon-image": "modis-d", // reference the image
                    "icon-size": 0.06
                }
            });
        }
    );

    // landsat
    map.loadImage(
        "https://raw.githubusercontent.com/YukinoshitaErii/WebMap_Practices/main/2.png",
        (error, image) => {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage("landsat-d", image);
            // Add a layer to use the image to represent the data.
            map.addLayer({
                id: "points_l1-icon",
                type: "symbol",
                source: "point_l", // reference the data source
                layout: {
                    "icon-image": "landsat-d", // reference the image
                    "icon-size": 0.06
                }
            });
        }
    );

    // viirs
    map.loadImage(
        "https://raw.githubusercontent.com/YukinoshitaErii/WebMap_Practices/main/3.png",
        (error, image) => {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage("viirs-d", image);
            // Add a layer to use the image to represent the data.
            map.addLayer({
                id: "points_v1-icon",
                type: "symbol",
                source: "point_v", // reference the data source
                layout: {
                    "icon-image": "viirs-d", // reference the image
                    "icon-size": 0.06
                }
            });
        }
    );


    // add geocoder search control
    const geocoder = new MapboxGeocoder({
        // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        marker: false, // Do not use the default marker style
        placeholder: "Search for places in US", // Placeholder text for the search bar
        proximity: {
            longitude: 55.8642,
            latitude: 4.2518
        }
    });
    map.addControl(geocoder, "top-left");
    map.addControl(new mapboxgl.NavigationControl(), "top-left");
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        }),
        "top-left"
    );
});
