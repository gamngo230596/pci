const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000; // You can change this to the desired port

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
  });

// Define a route to send a POST request to the external API
app.get('/call-external-api', async (req, res) => {
  const apiUrl = 'https://api.sandbox.datatrans.com/v1/transactions/secureFields';
  const username = '1110014625';
  const password = 'ZdyxmR2rsdJarlJM';

  const requestData = {
    amount: 100,
    currency: 'CHF',
    returnUrl: 'http://example.org/return',
  };

  try {
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username,
        password,
      },
    });

    // Forward the response from the external API to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Unknown error' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});