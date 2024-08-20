import { useContext, useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import {  toast } from "react-toastify";
import { login } from "../api/requests";
import { AccountContext } from "../context/account.context";

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { setSession } = useContext(AccountContext);

  const handleClickLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { success, data } = await login(form);
    if (success) {
      setLoading(false);
      setSession(() => ({ ...data, isLogged: true }))
      toast(`Bienvenido ${data.username}`);
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
    </Container>
  );
};

export default Login;
