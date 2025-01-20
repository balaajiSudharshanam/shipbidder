import React, { useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, Grid2 } from '@mui/material';
import { userState } from '../context/UserContextProvider';
import { useFormState } from '../context/FormContextProvide';

const AuctionForm = () => {
    const { user } = userState();
    const { auction, setAuctionData, Errors, setErrors } = useFormState();

    
    useEffect(() => {
        setAuctionData((prevData) => ({
            ...prevData,
            jobProvider: user.id,
        }));
    }, [user.id, setAuctionData]);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
       console.log(name,value);
        setAuctionData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    
    

    return (
        <Box component="form"  sx={{ p: 3 }}>
            
            
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="Job Title"
                        name="jobTitle"
                        value={auction.jobTitle}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={Errors.jobTitle}
                        helperText={Errors.jobTitle}
                    />
                    
                </Grid>
                <Grid2 item xs={6}>
                <TextField
                    label="Budget"
                    name="budget"
                    value={auction.budget}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={Errors.budget}
                        helperText={Errors.budget}
                    />
                </Grid2>
                <Grid item xs={12}>
                    <TextField
                        label="Job Description"
                        name="jobDescription"
                        value={auction.jobDescription}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Pickup Date & Time"
                        name="pickupDateTime"
                        type="datetime-local"
                        value={auction.pickupDateTime}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={Errors.pickupDateTime}
                        helperText={Errors.pickupDateTime}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Drop Date & Time"
                        name="dropDateTime"
                        type="datetime-local"
                        value={auction.dropDateTime}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={Errors.dropDateTime}
                        helperText={Errors.dropDateTime}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                
            </Grid>

            
        </Box>
    );
};

export default AuctionForm;
