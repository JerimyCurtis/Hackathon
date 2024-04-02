import React, { useState, useEffect } from 'react';
import WeatherIcon from './WeatherIcon';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');

  // Fetch weather by geolocation on component mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(latitude, longitude);
    }, () => {
      setError('Geolocation not available. Please enter a zip code for weather data.');
    });
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      // Step 1: Retrieve the gridpoint URL for the given latitude and longitude
      const pointsResponse = await fetch(`https://api.weather.gov/points/${latitude.toFixed(4)},${longitude.toFixed(4)}`);
      const pointsData = await pointsResponse.json();
      
      // Step 2: Use the forecast URL from the points data to fetch the weather forecast
      const forecastResponse = await fetch(pointsData.properties.forecast);
      const forecastData = await forecastResponse.json();
      
      setWeatherData(forecastData.properties.periods);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data. Try again later.');
    }
  };

  const handleZipCodeSubmit = async (e) => {
    e.preventDefault();
    // Assuming you have a mechanism to convert zip code to latitude and longitude or directly to a forecast URL
    // For the National Weather Service API, you might need an additional step here or use another service for the conversion

    // This is a simplified approach; in a real scenario, you would need to convert the zip code to coordinates first
    // For demonstration, I'll simulate fetching with geolocation after submitting a zip code
    // Replace this logic with your actual conversion from zip to coordinates or forecast URL
    if (zipCode && zipCode.trim().length === 5 && !isNaN(zipCode.trim())) {
      setError('');
      // Example coordinates for demonstration, replace with actual conversion logic
      fetchWeatherData(38.8894, -77.0352); // Placeholder coordinates, replace with actual logic
    } else {
      setError('Please enter a valid 5-digit zip code.');
    }
  };

  return (
    <div>
      <h2>Weather</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleZipCodeSubmit}>
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Enter zip code"
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <ul>
          {weatherData.map((period, index) => (
            <li key={index}>
              <strong>{period.name}:</strong> {period.detailedForecast}
              <WeatherIcon icon={period.icon} /> {/* Ensure WeatherIcon handles the icon appropriately */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Weather;
