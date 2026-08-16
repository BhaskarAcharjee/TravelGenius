import React, { useState, useEffect } from "react";
import { Grid, Container, Box } from "@mui/material";
import { getPlacesData } from "./api/apiService";
import Header from "./components/Header";
import Hero from "./components/Hero";
import List from "./components/List";
import Map from "./components/Map/Map";
import WeatherCard from "./components/Weather/WeatherCard";
import AskAI from "./components/AskAI";
import SavedDrawer from "./components/SavedDrawer";
import Footer from "./components/Footer";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 48.8566, lng: 2.3522 }); // Default Paris
  const [bounds, setBounds] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);

  // Saved Wishlist State (Synced with localStorage)
  const [savedPlaces, setSavedPlaces] = useState(() => {
    try {
      const stored = localStorage.getItem("travelgenius_wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("travelgenius_wishlist", JSON.stringify(savedPlaces));
    } catch (e) {
      console.error("Failed to save wishlist:", e);
    }
  }, [savedPlaces]);

  // Request browser geolocation on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCoordinates({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log("Geolocation error or permission denied, using default coordinates:", error.message);
        }
      );
    }
  }, []);

  // Filter places by rating
  useEffect(() => {
    if (places) {
      const filtered = places.filter((place) => Number(place.rating || 0) >= Number(rating));
      setFilteredPlaces(filtered);
    }
  }, [rating, places]);

  // Fetch places when category or map bounds change
  useEffect(() => {
    setIsLoading(true);
    const sw = bounds.sw || { lat: coordinates.lat - 0.05, lng: coordinates.lng - 0.05 };
    const ne = bounds.ne || { lat: coordinates.lat + 0.05, lng: coordinates.lng + 0.05 };

    getPlacesData(type, sw, ne)
      .then((data) => {
        setPlaces(data || []);
        setFilteredPlaces([]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching places:", err);
        setIsLoading(false);
      });
  }, [type, coordinates, bounds]);

  // City Search handler from Hero section
  const handleSearchCity = (cityName, customCoords) => {
    if (customCoords) {
      setCoordinates(customCoords);
    } else {
      // Basic city lookup coordinates for major destinations
      const cityMap = {
        paris: { lat: 48.8566, lng: 2.3522 },
        tokyo: { lat: 35.6762, lng: 139.6503 },
        "new york": { lat: 40.7128, lng: -74.006 },
        bali: { lat: -8.4095, lng: 115.1889 },
        dubai: { lat: 25.2048, lng: 55.2708 },
        london: { lat: 51.5074, lng: -0.1278 },
        rome: { lat: 41.9028, lng: 12.4964 },
        sydney: { lat: -33.8688, lng: 151.2093 },
      };
      const found = cityMap[cityName.toLowerCase()];
      if (found) {
        setCoordinates(found);
      }
    }

    const listSection = document.getElementById("list-section");
    if (listSection) listSection.scrollIntoView({ behavior: "smooth" });
  };

  // Toggle Save/Bookmark
  const handleToggleSave = (place) => {
    setSavedPlaces((prev) => {
      const exists = prev.some((item) => item.name === place.name);
      if (exists) {
        return prev.filter((item) => item.name !== place.name);
      } else {
        return [...prev, place];
      }
    });
  };

  const handleClearAllSaved = () => {
    setSavedPlaces([]);
  };

  const activePlacesList = filteredPlaces.length ? filteredPlaces : places;

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "#F8FAFC" }}>
      {/* Top Header */}
      <Header savedCount={savedPlaces.length} onOpenSaved={() => setSavedDrawerOpen(true)} />

      {/* Hero Section */}
      <Hero onSearchCity={handleSearchCity} />

      {/* Main Content Area */}
      <Container maxWidth="xl" id="main-content" sx={{ py: 4, flexGrow: 1 }}>
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} lg={8}>
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={activePlacesList}
              setChildClicked={setChildClicked}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <WeatherCard coordinates={coordinates} />
          </Grid>
        </Grid>

        {/* Places List */}
        <List
          places={activePlacesList}
          childClicked={childClicked}
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          savedPlaces={savedPlaces}
          onToggleSave={handleToggleSave}
        />

        {/* AI Travel Concierge */}
        <AskAI />
      </Container>

      {/* Saved Wishlist Drawer */}
      <SavedDrawer
        open={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
        savedPlaces={savedPlaces}
        onRemoveItem={handleToggleSave}
        onClearAll={handleClearAllSaved}
      />

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default App;
