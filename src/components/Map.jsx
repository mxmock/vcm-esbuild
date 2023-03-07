import React from "react";

// const TOKEN_MAPBOX = "pk.eyJ1Ijoid2lzMjM5IiwiYSI6ImNrOHgwZjA2ZzB2cmgzam83emxiZHNyMWsifQ.T56-iKyo0HADQmC1LKyhag";

// const MAP_URL = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";
const MAP_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const MAP_ID = `mapid`;

const getMapConfig = (L) => ({
  zoom: 10,
  minZoom: 1,
  maxZoom: 17,
  scrollWheelZoom: false,
  attributionControl: false,
  center: new L.LatLng(16.253116, -61.576572), // centré sur Baie-Mahault
});

// const LAYER_CONFIG = {
//   maxZoom: 20,
//   tileSize: 512,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: TOKEN_MAPBOX,
// };

const MARKER_ICON_CONFIG = {
  iconUrl: "../../assets/images/villa-marker.png",
  iconSize: [35, 45], // size of the icon
  iconAnchor: [18, 47], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -40], // point from which the popup should open relative to the iconAnchor
};

const Map = ({ name, villaLocation }) => {
  const initMap = async () => {
    if (typeof window === "undefined" || !!map) return;
    const L = await import("leaflet");
    // load map config
    setMap(L.map(`${MAP_ID}`, { ...getMapConfig(L) }));
    // set villa location
    setLocation(new L.LatLng(villaLocation.latitude, villaLocation.longitude));
  };

  const configureLayer = () => {
    if (!map || !location) return;
    // set layer
    // L.tileLayer(MAP_URL, { ...LAYER_CONFIG }).addTo(map);
    L.tileLayer(MAP_URL).addTo(map);
    // handle center on zoom
    map.on("zoom", (e) => map.setView(location, e._zoom));
    addMarker();
  };

  const addMarker = () => {
    const icon = L.icon({ ...MARKER_ICON_CONFIG });
    const villaMarker = L.marker(location, { icon }).addTo(map);
    villaMarker.bindPopup(`${name}`).openPopup();
  };

  const [map, setMap] = React.useState(null);
  const [location, setLocation] = React.useState(null);

  React.useEffect(() => {
    initMap();
  }, []);
  React.useEffect(configureLayer, [map, location]);

  return (
    <div
      id={`${MAP_ID}`}
      className="map"
    ></div>
  );
};

export default Map;
