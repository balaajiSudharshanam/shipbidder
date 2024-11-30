import { Card, CircularProgress, Typography, Box, Modal, Button, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { userState } from '../context/UserContextProvider';
import BidForm from '../Components/BidForm';
import MenuBar from '../Components/MenuBar/MenuBar';

const AuctionPage = () => {
    const { user } = userState();
    const { auctionId } = useParams();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [auctionData, setAuctionData] = useState({});

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchAuctionData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setLoading(true);
                const response = await axios.get(`http://localhost:3500/api/auction/${auctionId}`, config);
                setAuctionData(response.data);
            } catch (error) {
                console.error('Error fetching auction data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (auctionId && user?.token) {
            fetchAuctionData();
        }
    }, [auctionId, user]);

    return (
        <>
        <MenuBar/>
        <Box sx={{ p: 3 }}>
            {loading ? (
                <CircularProgress />
            ) : auctionData ? (
                <Card sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                        
                        <Grid item xs={12} md={6}>
                            <img
                                src={auctionData.item?.pic || 'placeholder-image-url'}
                                alt={auctionData?.jobTitle || 'Auction Item'}
                                style={{
                                    width: '50%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                    objectFit: 'cover',
                                }}
                            />
                        </Grid>

                        {/* Details Section */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" mb={2}>
                                {auctionData?.jobTitle || 'No Title'}
                            </Typography>
                            <Typography variant="body1" mb={1}>
                                Description: {auctionData?.jobDescription || 'N/A'}
                            </Typography>
                            <Typography variant="body1" mb={1}>
                                Budget: ${auctionData?.budget || 'N/A'}
                            </Typography>
                            <Typography variant="body1" mb={1}>
                                Status: {auctionData?.status || 'N/A'}
                            </Typography>
                            <Typography variant="body1" mb={1}>
                                Pickup Location: {auctionData?.pickupLocation?.address || 'N/A'}
                            </Typography>
                            <Typography variant="body1" mb={1}>
                                Drop Location: {auctionData?.dropLocation?.address || 'N/A'}
                            </Typography>
                            <Button variant="contained" color="primary" onClick={handleOpen}>
                                Place a Bid
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            ) : (
                <Typography variant="body1">No auction data found.</Typography>
            )}

            <Modal open={open} onClose={handleClose}>
                <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 1, mx: 'auto', my: 5, width: 400 }}>
                    <BidForm auction={auctionId} bidder={user.id} onClose={handleClose} />
                </Box>
            </Modal>
        </Box>
        </>
    );
};

export default AuctionPage;
