// App.jsx

import React from 'react';
import News from './News';
import Weather from './Weather';

const App = () => {
  return (
    <div>
      <h1>News and Weather App</h1>
      <News />
      <Weather />
    </div>
  );
};

export default App;
