import React, { useState } from 'react';
import News from './components/News';
import Weather from './components/Weather';
import './css/App.css';

import './assets/weather-icons-master/css/weather-icons.min.css';
import './assets/weather-icons-master/css/weather-icons-wind.css';
import './assets/weather-icons-master/css/weather-icons-wind.min.css';
import './assets/weather-icons-master/css/weather-icons.css';

function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="App">
      <div className="layout-container">
        <div className="news-container">
          <News onSelectItem={setSelectedItem} />
        </div>
        <div className="weather-container">
          <Weather onSelectItem={setSelectedItem} />
        </div>
      </div>
      <div className="details-section">
        {selectedItem && <pre>{JSON.stringify(selectedItem, null, 2)}</pre>}
      </div>
    </div>
  );
}

export default App;
