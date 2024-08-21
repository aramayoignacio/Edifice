import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getAllBuildings, getBuildingsByUser } from "../api/requests";
import { AccountContext } from "../context/account.context";
import AddIcon from "@mui/icons-material/Add";
import CustomModal from "../components/Modal";
import { AddBuildingForm } from "../forms";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomCard from "../components/Card";

const Home = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { session } = useContext(AccountContext);
  const [addBuilding, setAddBuilding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        setLoading(true);
        const { success, data } = session.isAdmin
          ? await getAllBuildings()
          : await getBuildingsByUser(session.externalId);
        success && setBuildings(data);
      } catch (err) {
        setLoading(false);
      }
      setLoading(false);
    };

    session.isLogged && fetchBuildings();
  }, [session]);

  const closeAddBuilding = () => setAddBuilding(false);
  const openAddBuilding = () => setAddBuilding(true);

  if (loading) {
    return <CircularProgress size={30} />;
  }

  return (
    <>
      <Button
        startIcon={<AddIcon />}
        variant="outlined"
        onClick={openAddBuilding}
      >
        Añadir edificio
      </Button>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        {buildings.map((b) => (
          <CustomCard
            key={b.id}
            content={
              <>
                <Typography variant="h5" component="div">
                  {b.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {b.address}
                </Typography>
              </>
            }
            actions={
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate(`/building/${b.externalId}`)}
              >
                Ver
              </Button>
            }
          />
        ))}
      </Box>
      {addBuilding && (
        <CustomModal
          open={addBuilding}
          handleClose={closeAddBuilding}
          children={<AddBuildingForm handleClose={closeAddBuilding} />}
        />
      )}
    </>
  );
};

export default Home;
