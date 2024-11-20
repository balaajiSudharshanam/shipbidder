import { Card, CircularProgress, Typography, Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { userState } from '../context/UserContextProvider';

const AuctionPage = () => {
  const { user } = userState(); 
  const { auctionId } = useParams(); 
  const [loading, setLoading] = useState(false); 
  const [auctionData, setAuctionData] = useState({}); 

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
        setAuctionData(response.data[0]); 
        console.log(auctionData.jobTitle);
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
    <Box sx={{ p: 3 }}>
      {loading ? (
        <CircularProgress />
      ) : auctionData ? (
        <Card sx={{ p: 3 }}>
          <Typography variant="h5" mb={2}>
            
            {auctionData.jobTitle}
          </Typography>
          <Typography variant="body1" mb={1}>
            Description: {auctionData.jobDescription}
          </Typography>
          <Typography variant="body1" mb={1}>
            Budget: ${auctionData.budget}
          </Typography>
          <Typography variant="body1" mb={1}>
            Status: {auctionData.status}
          </Typography>
          <Typography variant="body1" mb={1}>
            Pickup Location: {auctionData.pickupLocation?.address}
          </Typography>
          <Typography variant="body1" mb={1}>
            Drop Location: {auctionData.dropLocation?.address}
          </Typography>
        </Card>
      ) : (
        <Typography variant="body1">No auction data found.</Typography>
      )}
    </Box>
  );
};

export default AuctionPage;
