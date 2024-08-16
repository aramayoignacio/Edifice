import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function OutlinedCard() {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate('/home');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', minWidth: 275 }}>
      
      {/* %%%%%%%%%%PRIMER CARD%%%%%%%%%% */}
      <Card variant="outlined" sx={{ margin: 1, width: 300 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            2024
          </Typography>
          <Typography variant="h5" component="div">
            Delta Center
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Dirección
          </Typography>
          <Typography variant="body2">
            Edificio con insfraestructura departamental adaptado tambien a oficinas y locales comerciales. Buena ubicación geográfica, estrategicamente en ambas entradas a Nordelta.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="small" onClick={handleClickHome}>Ingresar</Button>
        </CardActions>
      </Card>

      {/* %%%%%%%%%%SEGUNDA CARD%%%%%%%%%% */}
      <Card variant="outlined" sx={{ margin: 2, width: 300 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            2024
          </Typography>
          <Typography variant="h5" component="div">
            Ocean View
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Dirección
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae numquam iusto voluptates, soluta magni illum quis, mollitia dicta tempore impedit deserunt eius odio, maiores officia commodi ratione tenetur facilis enim.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="small" onClick={handleClickHome}>Ingresar</Button>
        </CardActions>
      </Card>

      {/* %%%%%%%%%%TERCER CARD%%%%%%%%%% */}
      <Card variant="outlined" sx={{ margin: 2, width: 300 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            2024
          </Typography>
          <Typography variant="h5" component="div">
            Mountain Retreat
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Dirección
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos laudantium necessitatibus amet impedit eum! Voluptate iste officia quaerat repellat, suscipit expedita maxime quis molestiae autem laboriosam debitis explicabo fuga asperiores.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="small" onClick={handleClickHome}>Ingresar</Button>
        </CardActions>
      </Card>

      {/* %%%%%%%%%%CUARTA CARD%%%%%%%%%% */}
      <Card variant="outlined" sx={{ margin: 2, width: 300 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            2024
          </Typography>
          <Typography variant="h5" component="div">
            Urban Plaza
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Dirección
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium, ducimus! Voluptatem, quas nesciunt perspiciatis ut, placeat enim eligendi quidem possimus sapiente, fugit minima libero. Cum eaque ea incidunt ratione optio!
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="small" onClick={handleClickHome}>Ingresar</Button>
        </CardActions>
      </Card>

      {/* %%%%%%%%%%QUINTA CARD%%%%%%%%%% */}
      <Card variant="outlined" sx={{ margin: 2, width: 300 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            2024
          </Typography>
          <Typography variant="h5" component="div">
            Riverside Park
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Dirección
          </Typography>
          <Typography variant="body2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis eius praesentium autem fugit voluptatum corrupti necessitatibus, similique explicabo porro! Omnis, maxime. Neque quod, numquam itaque impedit similique molestias vel! Deserunt.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="small" onClick={handleClickHome}>Ingresar</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
