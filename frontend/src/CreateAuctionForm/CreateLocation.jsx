import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { userState } from '../context/UserContextProvider';

const CreateLocation = () => {
    const { user } = userState();
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

    const fetchCoordinates = async (address) => {
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
                return { lat, lng };
            } else {
                console.log(`No coordinates found for ${address}.`);
                return null;
            }
        } catch (error) {
            console.error(`Error fetching coordinates for ${address}:`, error);
            return null;
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const pickupAddress = `${formData.pickupAddress}, ${formData.pickupCity}, ${formData.pickupState} - ${formData.pickupPostalCode}`;
        const dropAddress = `${formData.dropAddress}, ${formData.dropCity}, ${formData.dropState} - ${formData.dropPostalCode}`;
    
        // Fetch both pickup and drop coordinates
        const [pickupCoordinates, dropCoordinates] = await Promise.all([
            fetchCoordinates(pickupAddress),
            fetchCoordinates(dropAddress)
        ]);
    
        if (pickupCoordinates && dropCoordinates) {
            setFormData((prevData) => ({
                ...prevData,
                pickupLatitude: pickupCoordinates.lat,
                pickupLongitude: pickupCoordinates.lng,
                dropLatitude: dropCoordinates.lat,
                dropLongitude: dropCoordinates.lng,
            }));
    
            // Prepare and send the API request
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
    
            try {
                const response = await axios.post('http://localhost:3500/api/location', {
                    ...formData,
                    pickupLatitude: pickupCoordinates.lat,
                    pickupLongitude: pickupCoordinates.lng,
                    dropLatitude: dropCoordinates.lat,
                    dropLongitude: dropCoordinates.lng,
                }, config);
                console.log("Location saved:", response.data);
            } catch (error) {
                console.error("Error saving location:", error);
            }
        } else {
            console.log("Unable to fetch coordinates for either pickup or drop location.");
        }
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
                
                
            </Grid>

            <Box mt={3}>
                <Button type="submit" variant="contained" color="primary">
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default CreateLocation;
