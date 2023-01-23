// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoiY2hyaXN0MDAwIiwiYSI6ImNsY3E0Y2IzbzAyYzkzc296bnR1bjN1em8ifQ.ifAwJWZFi6RRQCXNH3AYfg";

// Define a map object by initialising a Map from Mapbox
const map = new mapboxgl.Map({
  container: "map",
  // Replace YOUR_STYLE_URL with your style URL.
  style: "mapbox://styles/christ000/cld05ga4m000615phmmwfb069"
});


// hover interaction
map.on("mousemove", (event) => {
  const dzone = map.queryRenderedFeatures(event.point, {
    layers: ["glasgow-2"]
  });
  document.getElementById("pd").innerHTML = dzone.length
    ? `<h3>${dzone[0].properties.DZName}</h3><p>Rank: <strong>${dzone[0].properties.Percentv2}</strong> %</p>`
    : `<p>Hover over a data zone!</p>`;
  map.getSource("hover").setData({
    type: "FeatureCollection",
    features: dzone.map(function (f) {
      return { type: "Feature", geometry: f.geometry };
    })
  });
});

// Legend listener
map.on("load", () => {
  const layers = [
    "<10",
    "20 ",
    "30 ",
    "40 ",
    "50 ",
    "60 ",
    "70 ",
    "80 ",
    "90 ",
    "100"
  ];
  const colors = [
    "#a30026",
    "#d73028",
    "#f46c43",
    "#fdb062",
    "#fee190",
    "#e2f4f8",
    "#aad9e9",
    "#75aed1",
    "#4575b5",
    "#313696"
  ];

  // create legend
  const legend = document.getElementById("legend");
  layers.forEach((layer, i) => {
    const color = colors[i];
    const key = document.createElement("div");
    //place holder
    key.className = "legend-key";
    key.style.backgroundColor = color;
    key.innerHTML = `${layer}`;

    legend.appendChild(key);
    // high contrast
    if (i <= 1 || i >= 8) {
      key.style.color = "white";
    }
  });

  map.addSource("hover", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] }
  });
  map.addLayer({
    id: "dz-hover",
    type: "line",
    source: "hover",
    layout: {},
    paint: {
      "line-color": "black",
      "line-width": 4
    }
  });

  // add control
  // geocoder search control
  const geocoder = new MapboxGeocoder({
    // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    marker: false, // Do not use the default marker style
    placeholder: "Search for places in Glasgow", // Placeholder text for the search bar
    proximity: {
      longitude: 55.8642,
      latitude: 4.2518
    } // Coordinates of Glasgow center
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