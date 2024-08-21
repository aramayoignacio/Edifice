import { Box, ListItemIcon, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Logout from '@mui/icons-material/Logout';
import { Fragment, useContext, useState } from 'react';
import { AccountContext } from '../context/account.context';
import { Outlet } from 'react-router-dom';
import CustomModal from '../components/Modal';
import { AddUserForm } from '../forms';


export default function AppWrapper() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [addUserModal, setAddUserModal] = useState(false);
  const { logOut, session } = useContext(AccountContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeAddUserModal = () => setAddUserModal(false);
  const openAddUserModal = () => setAddUserModal(true);

  return (
    <Fragment>
      <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
        <IconButton
          onClick={handleClick}
          size="large"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 40, height: 40 }}>{session?.username?.split('')[0].toUpperCase()}</Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {session.isAdmin && <MenuItem onClick={() => {
          openAddUserModal();
          handleClose();
        }}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          Add User
        </MenuItem>}
        <MenuItem onClick={() => {
          logOut();
          handleClose();
        }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <CustomModal open={addUserModal} handleClose={closeAddUserModal} children={<AddUserForm handleClose={closeAddUserModal} />} />
      <Box sx={{ maxWidth: "80%", marginX:"auto", marginBottom:"40px" }}>
        <Outlet />
      </Box>
    </Fragment>
  );
}

