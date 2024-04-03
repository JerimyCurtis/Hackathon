const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

// Load ZIP code data from JSON
const zipCodeData = require('./data/US.json');

// API endpoint for ZIP code lookup
app.get('/api/zip-to-coords', (req, res) => {
  const { zip } = req.query;
  const entry = zipCodeData.find(entry => entry.zip === zip);
  if (entry) {
    const coords = { lat: entry.lat, lon: entry.lon };
    console.log(`Sending coordinates for zip ${zip}:`, coords);
    res.json(coords);
  } else {
    res.status(404).send({ message: 'ZIP code not found.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
