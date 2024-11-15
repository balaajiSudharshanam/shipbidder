import React, { useState } from 'react';
import MenuBar from '../Components/MenuBar/MenuBar';
import ProviderWidget from '../Components/ProviderWidget/ProviderWidget';
import SideDrawer from '../Components/SideDrawer/SideDrawer';
import { Grid, Modal, Box } from '@mui/material';
import CreateAuction from '../CreateAuctionForm/CreateAuction';


const ProviderDashBoard = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleModal=()=>{
    setOpenModal(!openModal);
  }
  

  return (
    <div>
      <MenuBar />
      <Grid container spacing={1}>
        {/* Side Drawer with modal control passed as prop */}
        <Grid item xs={2}>
          <SideDrawer handleModal={handleModal} />
        </Grid>

        {/* Main Content Area for Provider Widget */}
        <Grid item xs={10} sx={{ mt: 2 }}>
          <ProviderWidget />
        </Grid>
      </Grid>

      {/* Modal outside of SideDrawer */}
      <Modal open={openModal} 
      onClose={handleModal}>
        <Box sx={{
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          bgcolor: 'background.paper', 
          p: 4, 
          boxShadow: 24,
          outline: 'none'

        }}>
          <CreateAuction handleModal={handleModal}/>
        </Box>
      </Modal>
    </div>
  );
};

export default ProviderDashBoard;
