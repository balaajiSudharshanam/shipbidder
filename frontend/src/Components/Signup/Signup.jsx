import { FormControl, Input, InputLabel, Box, Typography, Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { userState } from '../../context/UserContextProvider';
import { useNavigate } from 'react-router';

const Signup = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const{user,setUser}=userState();
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('http://localhost:3500/api/user/auth', {
        email,
        password,
      });
      console.log(response);
      if (response) {
        console.log(response);
        setUser(response.data);
        console.log(user);
        let path = user.role === 'provider' ? '/providerDash' : '/seekerDash';
        navigate(path);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Sign In
      </Typography>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Attach the onChange to Input, not InputLabel
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Attach onChange to Input
            required
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
      </Box>
    </>
  );
};

export default Signup;
