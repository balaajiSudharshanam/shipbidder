import React, { useEffect, useState } from 'react';
import { userState } from '../../context/UserContextProvider';
import axios from 'axios';
import { List, ListItem, Card, Typography, Box, LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const AuctionListEmployer = () => {
  const [auctionList, setAuctionList] = useState([]);
  const[bidPlaced,setBidPlace]=useState(false);
  const { user } = userState();

  const fetchAuction = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(`http://localhost:3500/api/auction/employer/${user.id}`, config);
      setAuctionList(response.data);
      console.log(auctionList);
      console.log("Fetched auctions:", response.data);
    } catch (e) {
      console.error("Error fetching auctions:", e.message);
    }
  };
  
  useEffect(() => {
    fetchAuction();
    
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Jobs
      </Typography>
      <List>
        {auctionList.length > 0 ? (
          auctionList.map((auction) => (
            <Link to={`/auction/${auction._id}`} key={auction._id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card sx={{ m: 2, p: 2 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  
                  <Box
                    component="img"
                    src={auction.item?.pic || 'placeholder-image-url'}
                    alt={auction.jobTitle}
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                 
                  <Box flex={1}>
                    <ListItem>
                      <Typography variant="h6">{auction.jobTitle}</Typography>
                    </ListItem>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">Status: {auction.status}</Typography>
                      <Typography variant="body2">Bids Received: {auction.bids?.length||0}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Link>
          ))
        ) : (
          <LinearProgress />
        )}
      </List>
    </div>
  );
};

export default AuctionListEmployer;
