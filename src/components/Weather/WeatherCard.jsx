import React, { useState, useEffect } from "react";
import "./WeatherCard.css";
import weatherIconImg from "../../assets/images/weather-icon.webp";
import humidityIconImg from "../../assets/images/humidity-icon.png";
import windIconImg from "../../assets/images/wind-icon.png";
import weatherClearIcon from "../../assets/images/weather-clear.png";
import weatherCloudsIcon from "../../assets/images/weather-clouds.png";
import weatherDrizzleIcon from "../../assets/images/weather-drizzle.png";
import weatherMistIcon from "../../assets/images/weather-mist.webp";
import weatherRainIcon from "../../assets/images/weather-rain.webp";
import weatherSmokeIcon from "../../assets/images/weather-smoke.png";
import weatherSnowIcon from "../../assets/images/weather-snow.webp";
import { getWeatherData } from "../../api/apiService";

const WeatherCard = ({ coordinates }) => {
  const [city, setCity] = useState("India");
  const [temp, setTemp] = useState("32°C");
  const [humidity, setHumidity] = useState("60%");
  const [windSpeed, setWindSpeed] = useState("15km/h");
  const [weatherIcon, setWeatherIcon] = useState(weatherIconImg);

  const getIconForWeather = (main) => {
    switch (main) {
      case "Clouds":
        return weatherCloudsIcon;
      case "Clear":
        return weatherClearIcon;
      case "Mist":
        return weatherMistIcon;
      case "Rain":
        return weatherRainIcon;
      case "Drizzle":
        return weatherDrizzleIcon;
      case "Smoke":
        return weatherSmokeIcon;
      case "Snow":
        return weatherSnowIcon;
      default:
        return weatherIconImg;
    }
  };

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      getWeatherData(coordinates.lat, coordinates.lng).then((data) => {
        if (data) {
          setCity(data.name);
          setTemp(`${(data.main.temp - 273.15).toFixed(2)}°C`);
          setHumidity(`${data.main.humidity}%`);
          setWindSpeed(`${data.wind.speed}km/h`);
          setWeatherIcon(getIconForWeather(data.weather[0].main));
        }
      });
    }
  }, [coordinates]);

  return (
    <div className="weather-card">
      <div className="weather">
        <img className="weather-icon" src={weatherIcon} alt="weather icon" />
        <h1 className="temp">{temp}</h1>
        <h2 className="city">{city}</h2>
        <div className="details">
          <div style={{ display: "flex" }} className="col">
            <img className="humi" src={humidityIconImg} alt="humidity icon" />
            <div className="info">
              <p className="humidity">{humidity}</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="col">
            <img src={windIconImg} alt="wind icon" />
            <div className="info">
              <p className="wind">{windSpeed}</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
