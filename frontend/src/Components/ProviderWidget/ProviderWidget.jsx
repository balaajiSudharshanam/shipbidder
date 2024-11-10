import { Card } from '@mui/material'
import React, { useEffect } from 'react'
import { userState } from '../../context/UserContextProvider'
import axios from 'axios';

const ProviderWidget = () => {
    const{user,setUser}=userState();
    if(user){
        // console.log(user.token);

    }
    try{
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        // console.log(config);
        const data= axios.get(`http://localhost:3500/api/auction/employer/${user.id}`,config)
        console.log(data);
        if(data){
            console.log(data);
        }
    }catch(e){
        console.log(e);
    }
  return (
    <div>
        <Card sx={{m:2}}>
           widget
        </Card>
     
    </div>
  )
}

export default ProviderWidget
