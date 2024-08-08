import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleClickLogin = ()=>{
    alert("vas a irte al login");
    navigate("/login");
    alert("estas en el login");
  }
  return (
    <>
      <h1>ESTE ES EL HOME</h1>
      <button onClick={handleClickLogin}>Ir al login</button>
    </>
  );
};

export default Home;
