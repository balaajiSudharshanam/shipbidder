import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { userState } from '../../context/UserContextProvider';


const MenuBar = () => {
  const{user,setUser}=userState();
  
  const nav=useNavigate();
  const handleLogout=()=>{
    setUser(null);
    nav('/login');
  }
  return (
    <div>
    <AppBar position="fixed">
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
          {user?<Button color='inherit'  onClick={handleLogout}>logout</Button>:<Button color="inherit" component={Link} to='/login'>
  Login
</Button>}
          

        </Box>
      </Toolbar>
    </AppBar>
    <Toolbar/>
    </div>
  );
};

export default MenuBar;
