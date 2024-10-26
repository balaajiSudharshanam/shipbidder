import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, Input, MenuItem, Paper, Select, Typography, Grid } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('seeker');
    const [photo, setPhoto] = useState(null); // State to hold the file
    useEffect(()=>{
        console.log(photo);
    },[photo]);
    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Create a form data object to handle file upload
        const formData={
            name,
            email,
            password,
            role,
            photo
        }

        try {
          
            const response = await axios.post('http://localhost:3500/api/user', {
                name,
                email,
                password,
                role,
                photo
            });
            
            if (response) {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Typography variant="h5" align="center" gutterBottom>
                Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleRegister}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="Registeremail">Email</InputLabel>
                            <Input
                                id="Registeremail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="Registerpassword">Password</InputLabel>
                            <Input
                                id="Registerpassword"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                            <Input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <MenuItem value="seeker">Seeker</MenuItem>
                                <MenuItem value="provider">Provider</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal">
                        <Button
  component="label"
  role={undefined}
  variant="contained"
  tabIndex={-1}
  startIcon={<AddIcon />}
>
  Upload Photo
  <VisuallyHiddenInput
    type="file"
    onChange={(event) => setPhoto(event.target.files)}
    multiple
  />
</Button>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Register;
