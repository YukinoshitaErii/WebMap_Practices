// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoiY2hyaXN0MDAwIiwiYSI6ImNsY3E0Y2IzbzAyYzkzc296bnR1bjN1em8ifQ.ifAwJWZFi6RRQCXNH3AYfg";

//Before map
const beforeMap = new mapboxgl.Map({
  container: "before",
  style: "mapbox://styles/christ000/clda6bvvh001v01o02251g1h1",
  center: [-0.089932, 51.514441],
  zoom: 14
});

//After map
const afterMap = new mapboxgl.Map({
  container: "after",
  style: " mapbox://styles/christ000/clda6bvvh001v01o02251g1h1",
  center: [-0.089932, 51.514441],
  zoom: 14
});

const container = "#comparison-container";
const map = new mapboxgl.Compare(beforeMap, afterMap, container, {});
