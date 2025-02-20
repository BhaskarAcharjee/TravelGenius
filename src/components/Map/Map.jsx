import React from "react";
import GoogleMapReact from "google-map-react";
import { Rating } from "@mui/lab";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { makeStyles, useTheme } from "@mui/styles";  // Import useTheme
import mapStyles from "./mapStyles";
import { useMediaQuery, Paper, Typography } from "@mui/material";

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
}) => {
  const theme = useTheme();  // Get the theme object
  const classes = useStyles({ theme });  // Pass theme as a prop
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.travelxp.com/_next/image?url=https%3A%2F%2Fimages.travelxp.com%2Fimages%2Findia%2Fmandvi%2Fbastian.png&w=1920&q=75"
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
        {weatherData?.list?.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img
              height={100}
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              alt="weather icon"
            />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  mapContainer: {
    height: "70vh",
    width: "100%",
    background: "linear-gradient(to bottom, #3a1c71, #d76d77, #ffaf7b)", // Gradient background
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  },
  markerContainer: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    "&:hover": { zIndex: 2 },
  },
  paper: ({ theme }) => ({
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "120px",
    background: "linear-gradient(to top, #ff7e5f, #feb47b)", // Gradient for paper
    color: theme?.palette?.common?.white || "#fff", // Ensure fallback color
  }),
  pointer: {
    cursor: "pointer",
  },
  typography: ({ theme }) => ({
    fontFamily: "'Poppins', sans-serif", // Modern font
    fontWeight: 600,
    color: theme?.palette?.common?.white || "#fff", // Ensure fallback color
  }),
}));

export default Map;
