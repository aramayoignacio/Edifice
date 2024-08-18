import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Page not found</h1>
      <Button onClick={() => navigate("/login")}>Go to Login</Button>
    </>
  );
};

export default NotFound;
