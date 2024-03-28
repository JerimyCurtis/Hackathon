// App.jsx

import React from 'react';
import './css/App.css'; // Import the CSS file

import News from './components/News';
import Weather from './components/Weather';

const App = () => {
  return (
    <div className="App">
      <h1>News and Weather App</h1>
      <div className="News">
        <h2>News</h2>
        <News />
      </div>
      <div className="Weather">
        <h2>Weather</h2>
        <Weather />
      </div>
    </div>
  );
};

export default App;
