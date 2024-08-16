import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("isLogged");
    navigate("/");
  };

  const backToBuildings = () => {
    navigate("/buildings");
  };

  return (
    <>
      <h1>Este es el Home</h1>
      <Button onClick={logOut} variant="outlined" sx={{ marginLeft: 2 }}>
        Cerrar Sesión
      </Button>
      <Button onClick={backToBuildings} variant="outlined" sx={{ marginLeft: 2 }}>
        Volver a Edificios
      </Button>
    </>
  );
};

export default Home;
