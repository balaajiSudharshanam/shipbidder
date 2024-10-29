import { Button, Drawer, IconButton } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const SideDrawer = ({ handleModal }) => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div>
            <IconButton onClick={toggleDrawer}>
                <MenuIcon />
            </IconButton>

            <Drawer open={open} onClose={toggleDrawer}>
                <Button onClick={handleModal}>Create Auction</Button>
            </Drawer>
        </div>
    );
};

export default SideDrawer;
