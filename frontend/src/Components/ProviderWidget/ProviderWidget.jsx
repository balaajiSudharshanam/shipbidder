import { Card, Grid2, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { userState } from '../../context/UserContextProvider';
import axios from 'axios';
import {io} from 'socket.io-client'

const ProviderWidget = () => {
    const { user } = userState();
    const [auctionData, setAuctionData] = useState([]);
    const [completedAuction,setCompletedAuction]=useState(0);
    const [openAuction,setOpenAuction]=useState(0);

    const[socketConnected,setSocketConnected]=useState(false);

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
        const countCompletedAuctions = auctionData.filter(auction => auction.status === 'Closed').length;
        setCompletedAuction(countCompletedAuctions);
        console.log(completedAuction)

        const countOpenAuctions=auctionData.filter(auction=>auction.status=='Open').length;
        setOpenAuction(countOpenAuctions);

    }, [auctionData]);
    useEffect(()=>{
        const socket = io('http://localhost:3500');
        // console.log(user);
        socket.emit("setup",user.id);
        
        socket.on('connection',()=>{
            setSocketConnected(true);
        });
        socket.on('auctioinCreated',(newAuction)=>{
            console.log('created new one');
            setAuctionData((prevData)=>[...prevData,newAuction]);
            if(newAuction.status==='Open'){
                setOpenAuctions((prev)=>prev+1);
            }
        })

        

        return ()=>socket.disconnect();
    })

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
                        {openAuction}
                    </Typography>
                </Card>
            </Grid2>
            <Grid2 item>
                <Card sx={{ p: 2, minWidth: 150 }}>
                    <Typography variant="h6">Completed Auctions</Typography>
                    <Typography variant="body1">
                        {completedAuction}
                    </Typography>
                </Card>
            </Grid2>
            
        </Grid2>
    );
};

export default ProviderWidget;
