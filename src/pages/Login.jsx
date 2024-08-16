import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClickLogin = (e) => {
    e.preventDefault();

    if (username === "mikilazo" && password === "mikilazo") {
      localStorage.setItem("isLogged", true);
      navigate("/buildings");
    } else {
      toast.error("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Acceso
        </Typography>
        <form onSubmit={handleClickLogin}>
          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="outlined" color="primary" fullWidth>
            Iniciar Sesión
            <LoginIcon sx={{ marginLeft: "auto" }} />
          </Button>
        </form>
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </Container>
  );
};

export default Login;
