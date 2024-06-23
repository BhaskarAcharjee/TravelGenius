import axios from "axios";

// Travel Advisor API (RapidApi)
export const getPlacesData = async (type, sw, ne) => {
  if (process.env.REACT_APP_ENV !== "development") {
    try {
      const {
        data: { data },
      } = await axios.get(
        `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
        {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Development environment detected"); // for limiting api requests
  }
};

// Weather API (OpenWeatherMap)
export const getWeatherData = async (lat, lon) => {
  if (process.env.REACT_APP_ENV !== "development") {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHERMAP_KEY}`
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Development environment detected"); // for limiting api requests
  }
};
