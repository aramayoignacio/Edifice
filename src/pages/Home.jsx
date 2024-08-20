import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getAllBuildings, getBuildingsByUser } from '../api/requests';
import { AccountContext } from '../context/account.context';
import AddIcon from '@mui/icons-material/Add';
import CustomModal from '../components/Modal';
import { AddBuilding } from '../forms';
import { CircularProgress } from '@mui/material';

const Home = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { session } = useContext(AccountContext);
  const [addBuilding, setAddBuilding] = useState(false);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        setLoading(true);
        const { success, data } = session.isAdmin ? await getAllBuildings() : await getBuildingsByUser(session.externalId);
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
    return <CircularProgress size={30} />
  }

  return (
    <>
      <Button startIcon={<AddIcon />} variant='outlined' onClick={openAddBuilding}>Añadir edificio</Button>
      <Box sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 2,
        justifyContent: "center",
        alignItems: "center", 
        maxWidth:"80%",
        marginX:"auto",
        marginTop:"50px"
      }}>
        {buildings.map(b =>
          <Card key={b.id} variant="outlined" sx={{ margin: 1, width: 300, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", borderRadius: "12px" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {b.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {b.address}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" size="small" onClick={() => alert("vas a ver los detalles")}>Details</Button>
            </CardActions>
          </Card>
        )}
      </Box>
      {addBuilding && <CustomModal open={addBuilding} handleClose={closeAddBuilding} children={<AddBuilding handleClose={closeAddBuilding} />} />}
    </>
  );
}

export default Home;
