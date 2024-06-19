import React, { useState } from "react";
import "./WeatherCard.css";
import weatherIconImg from "../../assets/images/3d-weather-icon.webp";
import humidityIconImg from "../../assets/images/humidity-icon.png";
import windIconImg from "../../assets/images/wind-icon.png";
import searchIconImg from "../../assets/images/search-icon.svg";

const WeatherCard = () => {
  const [city, setCity] = useState("India");
  const [temp, setTemp] = useState("32°C");
  const [humidity, setHumidity] = useState("30%");
  const [windSpeed, setWindSpeed] = useState("15km/h");
  const [weatherIcon, setWeatherIcon] = useState(weatherIconImg);

  const handleSearch = (e) => {
    // Implement the search functionality to fetch and update the weather data
    e.preventDefault();
    // Fetch weather data based on city input
  };

  return (
    <div className="weather-card">
      <div className="search">
        <input
          type="search"
          placeholder="enter city name"
          spellCheck="false"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>
          <img src={searchIconImg} alt="search icon" />
        </button>
      </div>
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
