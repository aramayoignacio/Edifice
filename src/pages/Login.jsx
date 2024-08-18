import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../api/requests";

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = await login(form);
    if (data.success) {
      setLoading(false);
      localStorage.setItem("authToken", data.token);
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        navigate('/home');
      }
    } else {
      toast.error("Usuario o contraseña incorrectos.");
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Acceso
        </Typography>
        <form onSubmit={handleClickLogin}>
          <TextField
            name="username"
            label="Usuario"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
            required
          />
          <TextField
            label="Contraseña"
            type="password"
            name="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
            required
          />
          <Button type="submit" variant="outlined" color="primary" fullWidth disabled={loading}>
            {loading ? "Loading..." : <>
              Iniciar Sesión
              <LoginIcon sx={{ marginLeft: "auto" }} />
            </>}
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
