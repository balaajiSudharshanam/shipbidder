import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import { userState } from '../context/UserContextProvider';
import { useFormState } from '../context/FormContextProvide';
import { useMultiStepForm } from '../../CustomHooks/useMultiStepForm';
import CreateItem from './CreateItem';
import AuctionForm from './AuctionForm';

const CreateLocation = () => {
    const steps = [
        <CreateLocation />,
        <CreateItem />,
        <AuctionForm />
      ];
      const { currentStep, step, back, next} = useMultiStepForm(steps);
    const { user } = userState();
    const { locationFormData, setLocationFormData, locationErrors } = useFormState();
   
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocationFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value ? '' : prevErrors[name]
        }));
    };

    useEffect(()=>{
        console.log(locationErrors);
    },[locationErrors]);

    return (
        <Box component="form" sx={{ p: 3 }}>
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
                        error={!!locationErrors.pickupAddress}
                        helperText={locationErrors.pickupAddress}
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
                        error={!!locationErrors.pickupCity}
                        helperText={locationErrors.pickupCity}
                        
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="State"
                        name="pickupState"
                        value={locationFormData.pickupState}
                        onChange={handleChange}
                        fullWidth
                        error={!!locationErrors.pickupState}
                        helperText={locationErrors.pickupState}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Postal Code"
                        name="pickupPostalCode"
                        value={locationFormData.pickupPostalCode}
                        onChange={handleChange}
                        error={!!locationErrors.pickupPostalCode}
                        helperText={locationErrors.pickupPostalCode}
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
                        error={!!locationErrors.dropAddress}
                        helperText={locationErrors.dropAddress}
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
                        error={!!locationErrors.dropCity}
                        helperText={locationErrors.dropCity}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="State"
                        name="dropState"
                        value={locationFormData.dropState}
                        error={!!locationErrors.dropState}
                        onChange={handleChange}
                        helperText={locationErrors.dropState}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Postal Code"
                        name="dropPostalCode"
                        value={locationFormData.dropPostalCode}
                        error={!!locationErrors.dropPostalCode}
                        helperText={locationErrors.dropPostalCode}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
            </Grid>
            
        </Box>
    );
};

export default CreateLocation;
