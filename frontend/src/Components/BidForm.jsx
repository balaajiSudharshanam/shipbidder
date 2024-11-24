import { Alert, Box, FormControl, Typography, InputLabel, Input, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { userState } from '../context/UserContextProvider';

const BidForm = ({ auctionId, userId, onClose }) => {
    const { user } = userState();
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        };

        try {
            const response = await axios.post(
                'http://localhost:3500/api/bid',
                { auctionId, userId, amount },
                config
            );

            if (response) {
                setSuccess(true); 
                setError(null); 
                if (onClose) {
                    onClose(); 
                }
            }
        } catch (e) {
            setError("Failed to place the bid. Please try again."); 
            setSuccess(false);
        }
    };

    return (
        <div>
            <Typography variant="h5" mb={2}>Place Your Bid</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">Bid placed successfully!</Alert>}

                <FormControl>
                    <InputLabel htmlFor="bid">Bid Amount</InputLabel>
                    <Input
                        id="bid"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </FormControl>

                <Button type="submit" variant="contained" color="primary">
                    Place Bid
                </Button>
            </Box>
        </div>
    );
};

export default BidForm;
