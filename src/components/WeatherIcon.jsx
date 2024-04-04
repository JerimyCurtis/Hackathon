import React from 'react';

const WeatherIcon = ({ condition }) => {
  // Function to map weather condition description to corresponding Weather Icons class
  const getWeatherIconClass = (weatherCondition) => {
    const iconMapping = {
      "Clear": "wi wi-day-sunny",
      "Partly Cloudy": "wi wi-day-cloudy",
      "Cloudy": "wi wi-cloudy",
      "Rain": "wi wi-rain",
      "Snow": "wi wi-snow",
      "Sleet": "wi wi-sleet",
      "Wind": "wi wi-strong-wind",
      "Fog": "wi wi-fog",
      // Add more mappings as needed
    };

    return iconMapping[weatherCondition] || "wi wi-day-sunny"; // Default icon
  };

  const iconClass = getWeatherIconClass(condition);

  return <i className={iconClass}></i>;
};

export default WeatherIcon;
