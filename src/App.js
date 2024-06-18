import React, { useState, useEffect } from "react";
import { CssBaseline, Grid, Container, Typography, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getPlacesData } from "./api";
import Header from "./components/Header";
import List from "./components/List";
import Map from "./components/Map/Map";
import ExploreIcon from "@material-ui/icons/Explore";

const App = () => {
  const classes = useStyles();
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
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

  const handleExploreClick = () => {
    // Example: Smooth scroll to the main content section
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <main>
        <section className={classes.landingSection}>
          <Container maxWidth="lg" className={classes.landingContent}>
            <Box display="flex" alignItems="center" flexDirection="column">
              <ExploreIcon className={classes.landingIcon} />
              <Typography variant="h2" className={classes.landingTitle}>
                Discover Your Next Adventure
              </Typography>
              <Typography variant="h5" className={classes.landingSubtitle}>
                Find the best places to eat, stay, and explore near you.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.landingButton}
                onClick={handleExploreClick}
              >
                Explore Now
              </Button>
            </Box>
          </Container>
        </section>
        <Container maxWidth="xl" className={classes.mainContainer} id="main-content">
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Map
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                coordinates={coordinates}
                places={filteredPlaces.length ? filteredPlaces : places}
                setChildClicked={setChildClicked}
              />
            </Grid>
            <Grid item xs={12} md={4}>
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
        </Container>
      </main>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="textSecondary" align="center">
            &copy; {new Date().getFullYear()} Travel Genius. All rights reserved.
          </Typography>
        </Container>
      </footer>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  landingSection: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
    color: theme.palette.common.white,
    position: "relative", // Ensure relative positioning for z-index layering
  },
  landingContent: {
    textAlign: "center",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  landingIcon: {
    fontSize: "6rem",
    marginBottom: theme.spacing(2),
    color: theme.palette.common.white,
  },
  landingTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    marginBottom: theme.spacing(4),
  },
  landingSubtitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400,
    marginBottom: theme.spacing(4),
  },
  landingButton: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1.5, 4),
    backgroundColor: "#ff7e5f",
    "&:hover": { backgroundColor: "#feb47b" },
  },
  mainContainer: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0),
    marginTop: "auto",
  },
}));

export default App;
