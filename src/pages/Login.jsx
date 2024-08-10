import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { ShoppingCartRounded } from "@mui/icons-material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClickLogin = (e) => {
    e.preventDefault();
    setError("");

    if (username === "mikilazo" && password === "mikilazo") {
      localStorage.setItem("isLogged", true)
      navigate("/");
    } else {
      setError("Usuario o contraseña incorrectos.");
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
          {error && <Typography color="error">{error}</Typography>} {/* Mensaje de error */}
          <Button type="submit" variant="outlined" color="primary" fullWidth>
            Iniciar Sesión
            <ShoppingCartRounded sx={{marginLeft:"auto", color:""}}/>
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
