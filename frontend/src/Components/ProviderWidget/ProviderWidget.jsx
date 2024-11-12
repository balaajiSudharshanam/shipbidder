import { Card, Grid2, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { userState } from '../../context/UserContextProvider';
import axios from 'axios';

const ProviderWidget = () => {
    const { user } = userState();
    const [auctionData, setAuctionData] = useState([]);
    const [completedAuction,setCompletedAuction]=useState(0);

    useEffect(() => {
        const fetchAuctionData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const response = await axios.get(`http://localhost:3500/api/auction/employer/${user.id}`, config);
                setAuctionData(response.data);
                console.log(response.data); 
            } catch (error) {
                console.error("Error fetching auction data:", error);
            }
        };

        if (user && user.token) {
            fetchAuctionData();
        }
        console.log(auctionData);
       
    }, [user]);
    useEffect(() => {
        const countCompletedAuctions = auctionData.filter(auction => auction.status === 'Open').length;
        setCompletedAuction(countCompletedAuctions);
        console.log(completedAuction)
    }, [auctionData]);

    return (
        <Grid2 container spacing={2} sx={{ m: 2 }} direction="row">
            <Grid2 item>
                <Card sx={{ p: 2, minWidth: 150 }}>
                    <Typography variant="h6">Total Contracts</Typography>
                    <Typography variant="body1">
                        {auctionData.length}
                    </Typography>
                </Card>
            </Grid2>
            <Grid2 item>
                <Card sx={{ p: 2, minWidth: 150 }}>
                    <Typography variant="h6">Open Auctions</Typography>
                    <Typography variant="body1">
                        {completedAuction}
                    </Typography>
                </Card>
            </Grid2>
        </Grid2>
    );
};

export default ProviderWidget;
