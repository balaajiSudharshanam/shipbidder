import React, { useEffect, useState } from 'react';
import { userState } from '../../context/UserContextProvider';
import axios from 'axios';
import { Card, Input, InputLabel, Box, Typography, Grid, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

const AuctionList = () => {
  const { user } = userState();
  const [auctions, setAuctions] = useState([]);
  const [filter, setFilter] = useState({
    jobTitle: '',
    category: '',
    location: '',
    status: 'Open',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get('http://localhost:3500/api/auction', {
          params: { ...filter },
          ...config,
        });
        setAuctions(response.data.auctions || []);
        console.log(auctions);
      } catch (e) {
        console.log("Error fetching auctions:", e.message);
      }
    };

    fetchAuctions();
  }, [filter, user.token]);

  return (
    <Box>
      {/* Filter Section */}
      <Card sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" mb={2}>
          Filter Auctions
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Box>
            <InputLabel htmlFor="jobTitle">Job Title</InputLabel>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={filter.jobTitle}
              onChange={handleChange}
              placeholder="Enter job name"
              fullWidth
            />
          </Box>
          <Box>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Input
              id="category"
              name="category"
              value={filter.category}
              onChange={handleChange}
              placeholder="Enter category"
              fullWidth
            />
          </Box>
          <Box>
            <InputLabel htmlFor="location">Location</InputLabel>
            <Input
              id="location"
              name="location"
              value={filter.location}
              onChange={handleChange}
              placeholder="Enter location"
              fullWidth
            />
          </Box>
          <Box>
            <InputLabel htmlFor="status">Status</InputLabel>
            <Input
              id="status"
              name="status"
              value={filter.status}
              onChange={handleChange}
              placeholder="Enter status (e.g., Open, Closed)"
              fullWidth
            />
          </Box>
        </Box>
      </Card>

     
      <Card sx={{ p: 2 }}>
        <Typography variant="h6" mb={2}>
          Auctions
        </Typography>
        <Grid container spacing={2}>
            <ImageList >
          {auctions.length > 0 ? (
            auctions.map((auction) => (
           
            <ImageListItem key={auction._id}>
            <img
              srcSet={`${auction.item.pic}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${auction.item.pic}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={auction.jobTitle}
              loading="lazy"
              style={{ height: '300px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <ImageListItemBar
              title={auction.jobTitle}
              subtitle={<span>$: {auction.budget}</span>}
              position="below"
            />
          </ImageListItem>

            ))
        ) : (
            <Typography variant="body1">No auctions found</Typography>
        )}
       
        </ImageList>
        </Grid>
      </Card>
    </Box>
  );
};

export default AuctionList;
