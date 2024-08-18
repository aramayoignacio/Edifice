import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AuthProvider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [showAddUser, setShowAddUser] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = !!localStorage.getItem('authToken');
      if (!loggedIn && location.pathname !== '/login') {
        navigate('/login');
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate, location]);

  const logOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  const closeModal = () => setShowAddUser(false);

  if (loading) {
    return <CircularProgress />; // Muestra un indicador de carga mientras se verifica la autenticación
  }

  return (
    <>
      <Box sx={{ marginY: "20px", display: "flex", justifyContent: "space-between", gap: "10px" }}>
        <Button variant='contained' onClick={() => setShowAddUser(true)}>Add user</Button>
        <Button variant='contained' onClick={logOut}>Log out</Button>
      </Box>
      {showAddUser && (
        <Modal
          open={showAddUser}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Agregar un nuevo usuario
            </Typography>
          </Box>
        </Modal>
      )}
      <Outlet />
    </>
  );
};

export default AuthProvider;
