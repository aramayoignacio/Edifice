import { Card, CardActions, CardContent } from "@mui/material";

const CustomCard = ({ content, actions }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        margin: 1,
        width: 300,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
      }}
    >
      <CardContent>{content}</CardContent>
      <CardActions>{actions}</CardActions>
    </Card>
  );
};

export default CustomCard;
