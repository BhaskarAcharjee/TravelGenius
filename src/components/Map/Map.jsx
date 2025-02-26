import React from "react";
import GoogleMapReact from "google-map-react";
import { Rating } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useTheme, useMediaQuery, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import mapStyles from "./mapStyles";

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
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
          <MarkerContainer
            key={i}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <CustomPaper elevation={3} theme={theme}>
                <TypographyStyled variant="subtitle2" gutterBottom>
                  {place.name}
                </TypographyStyled>
                <ImageStyled
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.travelxp.com/_next/image?url=https%3A%2F%2Fimages.travelxp.com%2Fimages%2Findia%2Fmandvi%2Fbastian.png&w=1920&q=75"
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </CustomPaper>
            )}
          </MarkerContainer>
        ))}

        {weatherData?.list?.map((data, i) => (
          <WeatherContainer key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <WeatherImage
              height={100}
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              alt="weather icon"
            />
          </WeatherContainer>
        ))}
      </GoogleMapReact>
    </MapContainer>
  );
};

// Styled Components (Replaces makeStyles)
const MapContainer = styled("div")({
  height: "70vh",
  width: "100%",
  background: "linear-gradient(to bottom, #3a1c71, #d76d77, #ffaf7b)", // Gradient background
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
});

const MarkerContainer = styled("div")({
  position: "absolute",
  transform: "translate(-50%, -50%)",
  zIndex: 1,
  "&:hover": { zIndex: 2 },
});

const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "120px",
  background: "linear-gradient(to top, #ff7e5f, #feb47b)", // Gradient for paper
  color: theme.palette.common.white || "#fff", // Ensure fallback color
}));

const TypographyStyled = styled(Typography)({
  fontFamily: "'Poppins', sans-serif", // Modern font
  fontWeight: 600,
  color: "#fff",
});

const ImageStyled = styled("img")({
  cursor: "pointer",
  width: "100px",
  height: "80px",
  borderRadius: "5px",
  marginBottom: "5px",
});

const WeatherContainer = styled("div")({
  position: "absolute",
  transform: "translate(-50%, -50%)",
});

const WeatherImage = styled("img")({
  height: "80px",
});

export default Map;
