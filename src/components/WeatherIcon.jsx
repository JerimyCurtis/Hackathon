import React from 'react';

const WeatherIcon = ({ condition }) => {
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
    };

    return iconMapping[weatherCondition] || "wi wi-day-sunny";
  };

  const iconClass = getWeatherIconClass(condition);

  return <i className={iconClass}></i>;
};

export default WeatherIcon;
