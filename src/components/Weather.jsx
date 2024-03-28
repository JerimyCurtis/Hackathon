// Weather.jsx

import React, { useState, useEffect } from 'react';
import WeatherIcon from './WeatherIcon'; // Import WeatherIcon component

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Function to fetch weather data from National Weather Service API
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.weather.gov/gridpoints/TOP/31,80/forecast');
        const data = await response.json();
        setWeatherData(data.properties.periods);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []); // Empty dependency array to fetch data only once on component mount

  return (
    <div>
      <h2>Weather</h2>
      <ul>
        {weatherData && weatherData.map((period, index) => (
          <li key={index}>
            <strong>{period.name}:</strong> {period.detailedForecast}
            <WeatherIcon icon={period.icon} /> {/* Render weather icon */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Weather;
