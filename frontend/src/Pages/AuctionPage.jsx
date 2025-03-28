import { Card, CircularProgress, Typography, Box, Modal, Button, Grid, List, ListItem } from '@mui/material';
import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { userState } from '../context/UserContextProvider';
import BidForm from '../Components/BidForm';
import MenuBar from '../Components/MenuBar/MenuBar';
import MapComponent from '../Components/MapComponent/MapComponent';
import {io} from 'socket.io-client'
import WinnerCard from '../Components/WinnerCard/WinnerCard';

const AuctionPage = () => {
    const { user } = userState();
    const { auctionId } = useParams();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [auctionData, setAuctionData] = useState({});
    const [bidPlaced, setBidPlaced] = useState(false);
    

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
    
        fetchAuctionData();
        console.log(auctionData);
    }, [auctionId, user.token]);
    
    
    useEffect(() => {
        const fetchUserBid = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const response = await axios.get(`http://localhost:3500/api/bid`, {
                    params: { auctionId, userId: user.id },
                    ...config,
                });
                
                setBidPlaced(response.data.length > 0); 
                
            } catch (error) {
                console.error('Error fetching user bid:', error);
            }
        };

        if (user.role === 'seeker') {
            fetchUserBid();
        }
    }, [auctionId, user]);
    console.log(auctionData);
    return (
        <>
            <MenuBar />
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
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '8px',
                                        objectFit: 'cover',
                                    }}
                                    />
                                    {auctionData.pickupLocation && <MapComponent
                                        pickupLocation={auctionData.pickupLocation.coordinates}
                                        droplocation={auctionData.dropLocation.coordinates}
                                    />}
                                    
                            </Grid>
                            
                           
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
                                {user.role === 'seeker' ? (
                                    <Button
                                        variant="contained"
                                        disabled={bidPlaced}
                                        color="primary"
                                        onClick={handleOpen}
                                    >
                                        {bidPlaced ? 'Bid Placed' : 'Place a Bid'}
                                    </Button>
                                ) : (
                                    
                                    <>
                                        <Typography variant="h6" mb={1}>
                                            Bids Received: {auctionData.bids?.length || 0}
                                        </Typography>
                                        <Box
                                            sx={{
                                                maxHeight: 300,
                                                overflowY: 'auto',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px',
                                                p: 2,
                                                backgroundColor: '#f9f9f9',
                                            }}
                                        >
                                            <List>
                                                {auctionData.bids?.map((bid) => (
                                                    <ListItem
                                                        key={bid._id}
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            borderBottom: '1px solid #e0e0e0',
                                                            paddingBottom: 1,
                                                            marginBottom: 1,
                                                        }}
                                                    >
                                                        <Box>
                                                            <Typography variant="body1" fontWeight="bold">
                                                                {bid.bidder.name}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {bid.bidder.email}
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="body1" fontWeight="bold">
                                                            ${bid.bidAmount}
                                                        </Typography>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Box>
                                    </>
                                )}
                               
                               {auctionData.status === 'Closed' && user.role === 'provider' && <WinnerCard bidder={auctionData.won.bidder} bid={auctionData.won.bidAmount}/>}
                                
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
