import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
  const navigate = useNavigate();
  const logOut = ()=>{
    localStorage.removeItem("isLogged")
    navigate("/login");
  }
  return (
    <>
      <h1>Este es el Home</h1>
      <Button onClick={logOut} variant="outlined">
            Cerrar Sesión
      </Button>
    </>
  );
};

export default Home;
