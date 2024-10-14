import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';


const MenuBar = () => {
  return (
    <AppBar >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Shipbid
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
          <Button color="inherit" component={Link} to="/service">
            Service
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
