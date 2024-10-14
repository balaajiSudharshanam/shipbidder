import React from 'react'
import MenuBar from '../Components/MenuBar/MenuBar'
import Register from '../Components/Register/Register'
import Signup from '../Components/Signup/Signup'
import { Grid, Box, Paper } from '@mui/material'

const Login = () => {
  return (
    <div>
      <MenuBar />
      <Paper 
        elevation={3} 
        sx={{ padding: 1, backgroundColor: '#f0f0f0', margin: '20px auto', maxWidth: '80%' }} 
      >
        <Box sx={{ padding: 3 }}>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Register />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Signup />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  )
}

export default Login
