import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import { userState } from '../context/UserContextProvider';
import { useFormState } from '../context/FormContextProvide';
import { useMultiStepForm } from '../../CustomHooks/useMultiStepForm';
import CreateItem from './CreateItem';
import AuctionForm from './AuctionForm';

const CreateLocation = () => {
    const { locationFormData, setLocationFormData, Errors, setErrors, steps } = useFormState();
    
      const { currentStep, step, back, next} = useMultiStepForm(steps);
    const { user } = userState();
   
    // const [errors, setErrors] = useState({});

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
        console.log(Errors);
    },[Errors]);

    return (
        <Box component="form" sx={{ p: 3 }}>
            <Grid container spacing={2}>
               
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
                        error={Errors.pickupAddress?!!Errors.pickupAddress:false}
                        helperText={Errors.pickupAddress}
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
                        error={!!Errors.pickupCity}
                        helperText={Errors.pickupCity}
                        
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="State"
                        name="pickupState"
                        value={locationFormData.pickupState}
                        onChange={handleChange}
                        fullWidth
                        error={!!Errors.pickupState}
                        helperText={Errors.pickupState}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Postal Code"
                        name="pickupPostalCode"
                        value={locationFormData.pickupPostalCode}
                        onChange={handleChange}
                        error={!!Errors.pickupPostalCode}
                        helperText={Errors.pickupPostalCode}
                        fullWidth
                    />
                </Grid>

                
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
                        error={!!Errors.dropAddress}
                        helperText={Errors.dropAddress}
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
                        error={!!Errors.dropCity}
                        helperText={Errors.dropCity}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="State"
                        name="dropState"
                        value={locationFormData.dropState}
                        error={!!Errors.dropState}
                        onChange={handleChange}
                        helperText={Errors.dropState}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Postal Code"
                        name="dropPostalCode"
                        value={locationFormData.dropPostalCode}
                        error={!!Errors.dropPostalCode}
                        helperText={Errors.dropPostalCode}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
            </Grid>
            
        </Box>
    );
};

export default CreateLocation;
