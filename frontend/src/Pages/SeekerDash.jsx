import React, { useEffect } from 'react';
import MenuBar from '../Components/MenuBar/MenuBar';
import { useNavigate } from 'react-router';
import { userState } from '../context/UserContextProvider';

const SeekerDash = () => {
  const navigate = useNavigate();
  const { user } = userState(); // Get user state from context

  useEffect(() => {
    
    if (!user || user.role !== 'seeker') {
      navigate('/login'); 
    }
  }, [user, navigate]); 

  return (
    <div>
      <MenuBar />
      <h1>Seeker Dashboard</h1>
    </div>
  );
};

export default SeekerDash;
