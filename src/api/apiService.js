import axios from "axios";

// Curated high quality mock data for demo mode or API fallback
const MOCK_PLACES = {
  restaurants: [
    {
      name: "Le Gabriel - Gourmet Dining",
      rating: "4.8",
      num_reviews: 482,
      price_level: "$$$$",
      ranking: "#1 of 3,240 Restaurants in City Center",
      address: "42 Avenue Gabriel, 8th Arrondissement",
      phone: "+33 1 58 36 60 50",
      website: "https://www.legabriel-paris.com",
      web_url: "https://www.tripadvisor.com",
      latitude: "48.8687",
      longitude: "2.3134",
      photo: {
        images: {
          large: {
            url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
          },
        },
      },
      cuisine: [{ name: "French Fine Dining" }, { name: "Michelin Star" }, { name: "Wine Bar" }],
      awards: [
        {
          display_name: "Travelers' Choice 2025 Winner",
          images: { small: "https://static.tacdn.com/img2/awards/TC_2023_L.png" },
        },
      ],
    },
    {
      name: "Sakura Artisanal Ramen & Izakaya",
      rating: "4.7",
      num_reviews: 930,
      price_level: "$$",
      ranking: "#4 of 1,850 Asian Culinary Spots",
      address: "18 Ginza Cross Street, District 4",
      phone: "+81 3 5555 0192",
      website: "https://sakura-ramen-example.com",
      web_url: "https://www.tripadvisor.com",
      latitude: "35.6762",
      longitude: "139.7651",
      photo: {
        images: {
          large: {
            url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
          },
        },
      },
      cuisine: [{ name: "Japanese" }, { name: "Ramen" }, { name: "Izakaya" }],
    },
    {
      name: "Osteria Bella Vista",
      rating: "4.9",
      num_reviews: 1240,
      price_level: "$$$",
      ranking: "#2 of 980 Italian Trattorias",
      address: "Via della Conciliazione 15",
      phone: "+39 06 686 1234",
      website: "https://osteria-bellavista-example.com",
      web_url: "https://www.tripadvisor.com",
      latitude: "41.9028",
      longitude: "12.4583",
      photo: {
        images: {
          large: {
            url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
          },
        },
      },
      cuisine: [{ name: "Italian" }, { name: "Handmade Pasta" }, { name: "Seafood" }],
    },
    {
      name: "The Rooftop Grill & Lounge",
      rating: "4.6",
      num_reviews: 615,
      price_level: "$$$",
      ranking: "#5 Best Sunset Dining Spot",
      address: "500 Ocean Boulevard, Suite 1200",
      phone: "+1 310 555 0188",
      website: "https://rooftopgrill-example.com",
      web_url: "https://www.tripadvisor.com",
      latitude: "34.0195",
      longitude: "-118.4912",
      photo: {
        images: {
          large: {
            url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
          },
        },
      },
      cuisine: [{ name: "Steakhouse" }, { name: "Cocktails" }, { name: "American Modern" }],
    },
  ],
  hotels: [
    {
      name: "The Grand Royal Horizon Resort",
      rating: "4.9",
      num_reviews: 1540,
      price_level: "$$$$",
      ranking: "#1 Luxury Oceanfront Hotel",
      address: "1 Coastline Drive, Paradise Bay",
      phone: "+1 800 555 9900",
      website: "https://grandroyalhorizon-example.com",
      web_url: "https://www.tripadvisor.com",
      latitude: "8.3405",
      longitude: "115.0920",
      photo: {
        images: {
          large: {
            url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
          },
        },
      },
      cuisine: [{ name: "5-Star Luxury" }, { name: "Infinity Pool" }, { name: "Spa & Wellness" }],
    },
    {
      name: "Boutique Heritage Manor & Gardens",
      rating: "4.7",
      num_reviews: 320,
      price_level: "$$$",
      ranking: "#3 Historic Boutique Stays",
      address: "74 Old Town Lane, City Center",
      phone: "+44 20 7946 0912",
      website: "https://heritagemanor-example.com",
      web_url: "https://www.tripadvisor.com",
      latitude: "51.5074",
      longitude: "-0.1278",
      photo: {
        images: {
          large: {
            url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
          },
        },
      },
      cuisine: [{ name: "Boutique Hotel" }, { name: "Breakfast Included" }, { name: "Garden Lounge" }],
    },
  ],
  attractions: [
    {
      name: "Panoramica Sky Deck & Glass Bridge",
      rating: "4.8",
      num_reviews: 2100,
      price_level: "$$",
      ranking: "#1 Tourist Landmark & Observation Deck",
      address: "100 Skyline Tower Drive, Floor 88",
      phone: "+1 888 555 7599",
      website: "https://panoramica-deck-example.com",
      web_url: "https://www.tripadvisor.com",
      latitude: "40.7128",
      longitude: "-74.0060",
      photo: {
        images: {
          large: {
            url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
          },
        },
      },
      cuisine: [{ name: "Architecture" }, { name: "City Views" }, { name: "Photography Spot" }],
    },
    {
      name: "Botanical Conservatory & Light Gardens",
      rating: "4.9",
      num_reviews: 1850,
      price_level: "$",
      ranking: "#2 Nature & Outdoor Activity",
      address: "Parkside Path 12, West Sanctuary",
      phone: "+1 800 555 4321",
      website: "https://botanical-gardens-example.com",
      web_url: "https://www.tripadvisor.com",
      latitude: "37.7749",
      longitude: "-122.4194",
      photo: {
        images: {
          large: {
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
          },
        },
      },
      cuisine: [{ name: "Gardens" }, { name: "Family Friendly" }, { name: "Exhibits" }],
    },
  ],
};

// Fetch Places (RapidAPI with seamless Mock Fallback)
export const getPlacesData = async (type, sw, ne) => {
  const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;

  if (apiKey && apiKey !== "ef4600e965mshf1aeae80e629018p1fc355jsnfb73af351868") {
    try {
      const {
        data: { data },
      } = await axios.get(
        `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
        {
          params: {
            bl_latitude: sw?.lat || 12.9,
            tr_latitude: ne?.lat || 13.1,
            bl_longitude: sw?.lng || 77.5,
            tr_longitude: ne?.lng || 77.7,
          },
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          },
        }
      );

      if (data && data.length > 0) {
        return data;
      }
    } catch (error) {
      console.warn("RapidAPI call fallback to mock dataset:", error?.message);
    }
  }

  // Fallback to rich curated data
  return MOCK_PLACES[type] || MOCK_PLACES.restaurants;
};

// Fetch Weather (OpenWeatherMap with seamless Mock Fallback)
export const getWeatherData = async (lat, lon) => {
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_KEY;

  if (lat && lon && apiKey) {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      if (data) return data;
    } catch (error) {
      console.warn("Weather API fallback to mock weather:", error?.message);
    }
  }

  // Mock Weather Data Fallback
  return {
    name: "Paris",
    main: {
      temp: 297.15, // ~24°C
      humidity: 58,
      feels_like: 298.15,
      temp_min: 293.15,
      temp_max: 300.15,
    },
    wind: { speed: 4.2 },
    weather: [
      {
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
  };
};
