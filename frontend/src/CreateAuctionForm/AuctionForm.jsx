import React, { useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import { userState } from '../context/UserContextProvider';
import { useFormState } from '../context/FormContextProvide';

const AuctionForm = () => {
    const { user } = userState();
    const { auction, setAuctionData } = useFormState();

    
    useEffect(() => {
        setAuctionData((prevData) => ({
            ...prevData,
            jobProvider: user.id,
        }));
    }, [user.id, setAuctionData]);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuctionData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    
    

    return (
        <Box component="form"  sx={{ p: 3 }}>
            <Typography variant="h5" mb={2}>Create Auction</Typography>
            
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Job Title"
                        name="jobTitle"
                        value={auction.jobTitle}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>

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
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Pickup Location ID"
                        name="pickupLocation"
                        value={auction.pickupLocation}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Drop Location ID"
                        name="dropLocation"
                        value={auction.dropLocation}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
            </Grid>

            
        </Box>
    );
};

export default AuctionForm;
