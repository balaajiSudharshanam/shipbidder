import React, { useEffect } from 'react';
import MenuBar from '../Components/MenuBar/MenuBar';
import { useNavigate } from 'react-router';


import { userState } from '../context/UserContextProvider';
import AuctionList from '../Components/AuctionList';


const SeekerDash = () => {
  const navigate = useNavigate();
  const { user } = userState();
  useEffect(() => {
    
    if (!user || user.role !== 'seeker') {
      navigate('/login'); 
    }
  }, [user, navigate]); 

  return (
    <div>
      <MenuBar />
      <AuctionList/>
    </div>
  );
};

export default SeekerDash;
