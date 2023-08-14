import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Item } from "../../model";

interface Props {
  item: Item;
}

const ItemCard = (props: Props) => {
  const { item } = props;

  return (
    <Card sx={{}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {item.title}
        </Typography>
        <Typography variant="h5" component="div">
          {item.description}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {item.case}
        </Typography>
        <Typography variant="body2">{item.user}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
