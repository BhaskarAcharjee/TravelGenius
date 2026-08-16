import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Typography,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { styled } from "@mui/material/styles";
import { getWeatherData } from "../../api/apiService";
import weatherIconImg from "../../assets/images/weather-icon.webp";
import weatherClearIcon from "../../assets/images/weather-clear.png";
import weatherCloudsIcon from "../../assets/images/weather-clouds.png";
import weatherDrizzleIcon from "../../assets/images/weather-drizzle.png";
import weatherMistIcon from "../../assets/images/weather-mist.webp";
import weatherRainIcon from "../../assets/images/weather-rain.webp";
import weatherSnowIcon from "../../assets/images/weather-snow.webp";

const GlassWeatherCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "24px",
  background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)",
  backdropFilter: "blur(16px)",
  color: "#FFFFFF",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.15)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  position: "relative",
  overflow: "hidden",
}));

const WeatherCard = ({ coordinates }) => {
  const [city, setCity] = useState("Paris");
  const [temp, setTemp] = useState("24°C");
  const [feelsLike, setFeelsLike] = useState("25°C");
  const [humidity, setHumidity] = useState("58%");
  const [windSpeed, setWindSpeed] = useState("12 km/h");
  const [weatherDesc, setWeatherDesc] = useState("Clear Sky");
  const [weatherIcon, setWeatherIcon] = useState(weatherClearIcon);

  const getIconForWeather = (main) => {
    switch (main) {
      case "Clouds":
        return weatherCloudsIcon;
      case "Clear":
        return weatherClearIcon;
      case "Mist":
      case "Haze":
      case "Fog":
        return weatherMistIcon;
      case "Rain":
        return weatherRainIcon;
      case "Drizzle":
        return weatherDrizzleIcon;
      case "Snow":
        return weatherSnowIcon;
      default:
        return weatherIconImg;
    }
  };

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      getWeatherData(coordinates.lat, coordinates.lng).then((data) => {
        if (data && data.main) {
          setCity(data.name || "Current Location");
          const celsius = Math.round(data.main.temp - 273.15);
          const feelsCelsius = Math.round((data.main.feels_like || data.main.temp) - 273.15);
          setTemp(`${celsius}°C`);
          setFeelsLike(`${feelsCelsius}°C`);
          setHumidity(`${data.main.humidity}%`);
          setWindSpeed(`${Math.round(data.wind.speed * 3.6)} km/h`);
          if (data.weather && data.weather[0]) {
            setWeatherDesc(data.weather[0].description);
            setWeatherIcon(getIconForWeather(data.weather[0].main));
          }
        }
      });
    }
  }, [coordinates]);

  return (
    <GlassWeatherCard id="weather-section">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <LocationOnIcon sx={{ color: "#0EA5E9" }} />
          <Typography variant="h6" fontWeight={700}>
            {city}
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: "#38BDF8", bgcolor: "rgba(14, 165, 233, 0.15)", px: 1.5, py: 0.5, borderRadius: 3, fontWeight: 700 }}>
          LIVE WEATHER
        </Typography>
      </Box>

      {/* Main Temperature display */}
      <Box display="flex" alignItems="center" justifyContent="space-between" my={2}>
        <div>
          <Typography variant="h2" fontWeight={800} letterSpacing="-0.03em" color="#FFFFFF">
            {temp}
          </Typography>
          <Typography variant="body2" sx={{ textTransform: "capitalize", color: "#94A3B8", fontWeight: 600 }}>
            {weatherDesc}
          </Typography>
        </div>

        <Avatar
          src={weatherIcon}
          alt="weather icon"
          sx={{ width: 80, height: 80, filter: "drop-shadow(0 4px 12px rgba(14, 165, 233, 0.4))" }}
        />
      </Box>

      <Divider sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.1)" }} />

      {/* Weather metrics grid */}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box textAlign="center">
            <ThermostatIcon sx={{ color: "#F59E0B", fontSize: 20 }} />
            <Typography variant="caption" display="block" color="#94A3B8" mt={0.5}>
              Feels Like
            </Typography>
            <Typography variant="body2" fontWeight={700} color="#FFFFFF">
              {feelsLike}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box textAlign="center">
            <WaterDropIcon sx={{ color: "#0EA5E9", fontSize: 20 }} />
            <Typography variant="caption" display="block" color="#94A3B8" mt={0.5}>
              Humidity
            </Typography>
            <Typography variant="body2" fontWeight={700} color="#FFFFFF">
              {humidity}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box textAlign="center">
            <AirIcon sx={{ color: "#10B981", fontSize: 20 }} />
            <Typography variant="caption" display="block" color="#94A3B8" mt={0.5}>
              Wind Speed
            </Typography>
            <Typography variant="body2" fontWeight={700} color="#FFFFFF">
              {windSpeed}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </GlassWeatherCard>
  );
};

export default WeatherCard;
