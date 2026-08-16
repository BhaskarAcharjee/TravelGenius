import React from "react";
import GoogleMapReact from "google-map-react";
import { Rating, Paper, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { styled } from "@mui/material/styles";
import mapStyles from "./mapStyles";

const MapWrapper = styled(Box)(({ theme }) => ({
  height: "540px",
  width: "100%",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
  border: "1px solid #E2E8F0",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    height: "380px",
  },
}));

const MarkerPaper = styled(Paper)({
  padding: "6px 8px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "120px",
  borderRadius: "12px",
  backgroundColor: "rgba(15, 23, 42, 0.92)",
  color: "#FFFFFF",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "scale(1.08)",
    zIndex: 10,
    backgroundColor: "#0EA5E9",
  },
});

const MarkerImage = styled("img")({
  width: "100%",
  height: "64px",
  borderRadius: "8px",
  objectFit: "cover",
  marginBottom: "4px",
});

const MarkerContainer = styled("div")({
  position: "absolute",
  transform: "translate(-50%, -50%)",
  zIndex: 1,
  "&:hover": { zIndex: 10 },
});

const Map = ({
  setCoordinates,
  setBounds,
  coordinates = {},
  places = [],
  setChildClicked,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const defaultCenter = {
    lat: coordinates.lat || 48.8566,
    lng: coordinates.lng || 2.3522,
  };

  const defaultImage =
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=400&q=80";

  return (
    <MapWrapper id="map-section">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "AIzaSyAJM63_208AXSuDkp7bSc5HJa1jwRz26Ik",
        }}
        center={defaultCenter}
        defaultZoom={13}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          if (e.center && setCoordinates && setBounds) {
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          }
        }}
        onChildClick={(child) => setChildClicked && setChildClicked(child)}
      >
        {places?.map((place, i) => {
          const lat = Number(place.latitude);
          const lng = Number(place.longitude);
          if (isNaN(lat) || isNaN(lng)) return null;

          return (
            <MarkerContainer key={i} lat={lat} lng={lng}>
              {!isDesktop ? (
                <LocationOnIcon sx={{ color: "#0EA5E9", fontSize: 36, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))" }} />
              ) : (
                <MarkerPaper elevation={4}>
                  <Typography variant="caption" fontWeight={700} noWrap sx={{ display: "block", mb: 0.5 }}>
                    {place.name}
                  </Typography>
                  <MarkerImage
                    src={place.photo?.images?.large?.url || defaultImage}
                    alt={place.name}
                  />
                  <Rating size="small" value={Number(place.rating) || 4.5} readOnly precision={0.5} sx={{ fontSize: "0.75rem" }} />
                </MarkerPaper>
              )}
            </MarkerContainer>
          );
        })}
      </GoogleMapReact>
    </MapWrapper>
  );
};

export default Map;
