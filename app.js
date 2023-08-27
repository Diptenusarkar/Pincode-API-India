const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const port = 3000;

const data = [];

// Load CSV file
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    console.log('CSV file loaded');
  });

// Endpoint to get all data
app.get('/api/data', (req, res) => {
  res.json(data);
});

// Endpoint to get data by Pincode
app.get('/api/data/:pincode', (req, res) => {
  const requestedPincode = req.params.pincode; // Extract the pincode from the URL parameter
  const items = data.filter(item => item.pincode === requestedPincode); // Use filter to get all matching rows
  if (items.length > 0) {
    res.json(items);
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
