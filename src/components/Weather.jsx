import React, { useState, useEffect } from 'react';
import WeatherIcon from './WeatherIcon';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');

  // Fetch weather by geolocation on component mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherDataByCoords(latitude, longitude);
      },
      () => {
        setError('Geolocation not available. Please enter a zip code.');
      }
    );
  }, []);

  const fetchWeatherDataByCoords = async (latitude, longitude) => {
    try {
      const pointsResponse = await fetch(`https://api.weather.gov/points/${latitude.toFixed(4)},${longitude.toFixed(4)}`);
      const pointsData = await pointsResponse.json();
      const forecastUrl = pointsData.properties.forecast;
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();
      setWeatherData(forecastData.properties.periods);
    } catch (error) {
      setError('Error fetching weather data. Please try again later.');
    }
  };

  const handleZipCodeSubmit = async (e) => {
    e.preventDefault();
    if (!zipCode || zipCode.trim().length !== 5 || isNaN(zipCode.trim())) {
      setError('Please enter a valid 5-digit ZIP code.');
      return;
    }

    try {
      const response = await fetch(`/api/zip-to-coords?zip=${zipCode}`);
      if (!response.ok) {
        throw new Error('Failed to fetch coordinates');
      }
      const { lat, lon } = await response.json();
      fetchWeatherDataByCoords(lat, lon);
      setError(''); // Clear any previous errors
    } catch (error) {
      setError(error.message || 'Failed to fetch weather for the provided ZIP code.');
    }
  };

  return (
    <div>
      <h2>Weather</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleZipCodeSubmit}>
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Enter ZIP code"
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <ul>
          {weatherData.map((period, index) => (
            <li key={index}>
              <strong>{period.name}:</strong> {period.detailedForecast}
              <WeatherIcon condition={period.shortForecast} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Weather;
