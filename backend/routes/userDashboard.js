const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware')
const axios = require('axios')
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Function to calculate the distance between two zip codes (using Google Maps API)
const calculateDistance = async (pickupZip, dropoffZip) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Your Google Maps API Key

  // Ensure that the API key is not empty
  if (!apiKey) {
    throw new Error('Google Maps API Key is missing.');
  }

  // Construct the request URL properly
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${pickupZip}&destinations=${dropoffZip}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    // Get the distance and duration from the response
    const distanceData = response.data.rows[0].elements[0];

    if (distanceData.status === "OK") {
      const distanceInMiles = distanceData.distance.text; // e.g., '643 mi'
      const distanceInMilesNumeric = parseFloat(distanceInMiles.split(' ')[0]); // Extract numeric value

      // Convert miles to kilometers
      const distanceInKm = (distanceInMilesNumeric * 1.60934).toFixed(2); // Convert and format

      const distanceduration = distanceData.duration.text; // e.g., '15 hours 50 mins'

      // Return both miles and kilometers
      const payload = {
        distanceInMiles: distanceInMilesNumeric, // Numeric value in miles
        distanceInKm, // Numeric value in kilometers
        distanceduration
      };

      return payload;
    } else {
      throw new Error(`Google Maps API error: ${distanceData.status}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Error fetching distance data');
  }
};

// Route to estimate the price based on distance and duration
router.post('/price-estimate', verifyToken, async (req, res) => {
  const { pickupZip, dropoffZip, vehicleType } = req.body;
  
  try {
    // Calculate the distance and duration
    const { distanceInMiles, distanceInKm, distanceduration } = await calculateDistance(pickupZip, dropoffZip);
    
    // Calculate the price based on the distance (simple pricing logic)
    const pricePerMile = 2; // Example price per mile
    const estimatedPrice = (distanceInMiles * pricePerMile).toFixed(2); // Calculate total price

    // Return the estimated price and other details
    return res.status(200).json({
      distanceInMiles: `${distanceInMiles} mi`,
      distanceInKm: `${distanceInKm} km`,
      estimatedPrice: `$${estimatedPrice}`,
      estimatedDuration: distanceduration
    });

  } catch (error) {
    return res.status(500).json({ message: 'Error processing request' });
  }
});

module.exports = router;
