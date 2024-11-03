import React from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { userState } from '../context/UserContextProvider';
import { useFormState } from '../context/FormContextProvide';


const CreateLocation = () => {
    const { user } = userState();
    const { locationFormData, setLocationFormData } = useFormState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocationFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    

    

    return (
        <Box component="form"  sx={{ p: 3 }}>
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
                        value={locationFormData.pickupAddress}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="City"
                        name="pickupCity"
                        value={locationFormData.pickupCity}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="State"
                        name="pickupState"
                        value={locationFormData.pickupState}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Postal Code"
                        name="pickupPostalCode"
                        value={locationFormData.pickupPostalCode}
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
                        value={locationFormData.dropAddress}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="City"
                        name="dropCity"
                        value={locationFormData.dropCity}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="State"
                        name="dropState"
                        value={locationFormData.dropState}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Postal Code"
                        name="dropPostalCode"
                        value={locationFormData.dropPostalCode}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
            </Grid>

            
        </Box>
    );
};

export default CreateLocation;
