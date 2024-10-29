import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import axios from 'axios';

const CreateLocation = () => {
  const [formData, setFormData] = useState({
    pickupAddress: '',
    pickupCity: '',
    pickupState: '',
    pickupPostalCode: '',
    pickupLatitude: '',
    pickupLongitude: '',
    dropAddress: '',
    dropCity: '',
    dropState: '',
    dropPostalCode: '',
    dropLatitude: '',
    dropLongitude: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchCoordinates = async (address, type) => {
    const apiKey = 'd3540bd1-d845-4c29-a663-235b97d384a6';
    try {
      const response = await axios.get(`https://graphhopper.com/api/1/geocode`, {
        params: {
          q: address,
          locale: 'en',
          limit: 1,
          key: apiKey
        }
      });
      
      if (response.data.hits && response.data.hits.length > 0) {
        const { lat, lng } = response.data.hits[0].point;
        console.log(response);
        setFormData((prevData) => ({
          ...prevData,
          [`${type}Latitude`]: lat,
          [`${type}Longitude`]: lng
        }));
      } else {
        console.log(`No coordinates found for ${type} location.`);
      }
    } catch (error) {
      console.error(`Error fetching coordinates for ${type} location:`, error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pickupAddress = `${formData.pickupAddress}, ${formData.pickupCity}, ${formData.pickupState} - ${formData.pickupPostalCode}`;
    const dropAddress = `${formData.dropAddress}, ${formData.dropCity}, ${formData.dropState} - ${formData.dropPostalCode}`;

    
    const coordinates =await fetchCoordinates(pickupAddress, 'pickup');
    await fetchCoordinates(dropAddress, 'drop');
    console.log(formData);
    console.log(dropAddress)
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>
        Create Location
      </Typography>
      
      <Grid container spacing={2}>
        {/* Pickup Location Fields */}
        <Grid item xs={12}>
          <Typography variant="h6">Pickup Location</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Address (e.g., 123 Main St)"
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            name="pickupCity"
            value={formData.pickupCity}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="State"
            name="pickupState"
            value={formData.pickupState}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            label="Postal Code"
            name="pickupPostalCode"
            value={formData.pickupPostalCode}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            label="Latitude"
            name="pickupLatitude"
            value={formData.pickupLatitude}
            onChange={handleChange}
            fullWidth
            disabled
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            label="Longitude"
            name="pickupLongitude"
            value={formData.pickupLongitude}
            onChange={handleChange}
            fullWidth
            disabled
          />
        </Grid>

        {/* Drop Location Fields */}
        <Grid item xs={12}>
          <Typography variant="h6">Drop Location</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Address (e.g., 456 Elm St)"
            name="dropAddress"
            value={formData.dropAddress}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            name="dropCity"
            value={formData.dropCity}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="State"
            name="dropState"
            value={formData.dropState}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            label="Postal Code"
            name="dropPostalCode"
            value={formData.dropPostalCode}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            label="Latitude"
            name="dropLatitude"
            value={formData.dropLatitude}
            onChange={handleChange}
            fullWidth
            disabled
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            label="Longitude"
            name="dropLongitude"
            value={formData.dropLongitude}
            onChange={handleChange}
            fullWidth
            disabled
          />
        </Grid>
      </Grid>

      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary">
          Fetch Coordinates
        </Button>
      </Box>
    </Box>
  );
};

export default CreateLocation;
