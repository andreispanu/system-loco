import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "./ReusableMap.css";
import { Box } from "@mui/material";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const ReusableMap = ({ lat, lon }: { lat: number; lon: number }) => {
  return (
    <Box
      sx={{
        height: "300px",
        width: "100%",
        position: "relative",
        "& .leaflet-container": { height: "100%" },
      }}
    >
      <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lon]}></Marker>
      </MapContainer>
    </Box>
  );
};

export default ReusableMap;
