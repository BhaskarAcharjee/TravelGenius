import React, { useState, useEffect } from "react";
import { CssBaseline, Grid, Container } from "@material-ui/core";
import { getPlacesData } from "./api/apiService";
import Header from "./components/Header";
import List from "./components/List";
import Map from "./components/Map/Map";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import WeatherCard from "./components/Weather/WeatherCard";
import AskAI from "./components/AskAI";
import "./style/global.css";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("0");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (places) {
      const filteredPlaces = places.filter((place) => place.rating > rating);
      setFilteredPlaces(filteredPlaces);
    }
  }, [rating, places]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [type, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      
        <Hero />
     
      <Container maxWidth="xl" id="main-content">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} id="map">
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={filteredPlaces.length ? filteredPlaces : places}
              setChildClicked={setChildClicked}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <WeatherCard coordinates={coordinates} />
          </Grid>
        </Grid>
        <Grid container spacing={3} id="list-content">
          <Grid item xs={12}>
            <List
              places={filteredPlaces.length ? filteredPlaces : places}
              childClicked={childClicked}
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </Grid>
        </Grid>
        <AskAI />
      </Container>
      <Footer />
    </>
  );
};

export default App;
