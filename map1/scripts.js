jQuery(function ($) {
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
        // on trigger
        var further_on = 0;
        var author_on = 0;
        var share_on = 0;
        var introduction_on = 0;

        // record times
        // times trigger
        var introduction_times = 0;
        var author_times = 0;
        var share_times = 0;
        var further_times = 0;

        // introduction section
        $(".introduction").on("click tap", () => {
            introduction_on = 1;
            if (further_on == 1&&further_times==1) {
                $("main").toggleClass("fur");
                $(".fur-list").toggleClass("fur");
                $(".fur-text").toggleClass("fur");
                $(".sidebar").toggleClass("fur");
                further_on = 0;
                further_times = 0;
                console.log("introduction fur " + further_on);
            }
            if (introduction_on == 1) {
                $("main").toggleClass("intro");
                $(".intro-list").toggleClass("intro");
                $(".intro-text").toggleClass("intro");
                $(".sidebar").toggleClass("intro");
                $(".introduction").toggleClass("intro");
                introduction_times = introduction_times+1;
                introduction_times = introduction_times%2;
                console.log("introduction step");
                console.log("introduction " + introduction_on);
                console.log("introductitimes " + introduction_times);
                console.log("furtheron " + further_on);
                console.log("furthertimes " + further_times);
                console.log('---------------')
            }
        });

        // further information toggle
        $(".further").on("click tap", () => {
            further_on = 1;
            if (introduction_on == 1&&introduction_times==1) {
                $("main").toggleClass("intro");
                $(".intro-list").toggleClass("intro");
                $(".intro-text").toggleClass("intro");
                $(".sidebar").toggleClass("intro");
                $(".introduction").toggleClass("intro");
                introduction_on = 0;
                introduction_times = 0;
                console.log("fur introduction" + introduction_on);
            }
            if (further_on == 1) {
                $("main").toggleClass("fur");
                $(".fur-list").toggleClass("fur");
                $(".fur-text").toggleClass("fur");
                $(".sidebar").toggleClass("fur");
                further_times = further_times+1;
                further_times = further_times%2;
                console.log("further step");
                console.log("introduction " + introduction_on);
                console.log("introductitimes " + introduction_times);
                console.log("furtheron " + further_on);
                console.log("furthertimes " + further_times);
                console.log('---------------')
            }

        });


        // author toggle
        $(".author").on("click tap", () => {
            author_on = 1;
            if (author_on == 1) {
                alert("author_on");
            }
        });

        // share toggle
        $(".share").on("click tap", () => {
            share_on = 1;
            if (share_on == 1) {
                alert("share_on");
            }
        });

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
