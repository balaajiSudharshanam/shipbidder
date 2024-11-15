import { FormControl, Input, InputLabel, Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { userState } from '../../context/UserContextProvider';
import { useNavigate } from 'react-router';

const Signup = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const { user, setUser } = userState();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3500/api/user/auth', {
        email,
        password,
      });
      if (response) {
        setUser(response.data);
        let path = response.data.role === 'provider' ? '/provider' : '/seeker';
        navigate(path);
        setSnackbarMessage('Sign-in successful!');
        setAlertSeverity('success');
      }
    } catch (error) {
      setSnackbarMessage('Login failed. Please check your credentials.');
      setAlertSeverity('error');
    } finally {
      setOpenSnackbar(true); 
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Signup;
