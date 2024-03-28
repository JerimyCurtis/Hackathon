// WeatherIcon.jsx

import React from 'react';

const WeatherIcon = ({ icon }) => {
  // Function to map weather condition code to corresponding Weather Icons class
  const getWeatherIconClass = (iconCode) => {
    switch (iconCode) {
      case 'partly-cloudy-day':
        return 'wi wi-day-cloudy';
      case 'partly-cloudy-night':
        return 'wi wi-night-alt-cloudy';
      case 'clear-day':
        return 'wi wi-day-sunny';
      case 'clear-night':
        return 'wi wi-night-clear';
      case 'cloudy':
        return 'wi wi-cloudy';
      case 'rain':
        return 'wi wi-rain';
      case 'snow':
        return 'wi wi-snow';
      case 'sleet':
        return 'wi wi-sleet';
      case 'wind':
        return 'wi wi-strong-wind';
      case 'fog':
        return 'wi wi-fog';
      default:
        return 'wi wi-day-sunny'; // Default icon
    }
  };

  const iconClass = getWeatherIconClass(icon);

  return <i className={iconClass}></i>;
};

export default WeatherIcon;
