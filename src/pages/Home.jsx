import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getBuildingsByUser } from '../api/requests';

const Home = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        setLoading(true);
        const data = await getBuildingsByUser();
        setBuildings(data.body);
      } catch (err) {
        setLoading(false);
      }
      setLoading(false);
    };

    fetchBuildings();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      {buildings.map(b => <Box key={b.id} sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', minWidth: 275 }}>
        <Card variant="outlined" sx={{ margin: 1, width: 300 }}>
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
      </Box>)}
    </>
  );
}

export default Home;
