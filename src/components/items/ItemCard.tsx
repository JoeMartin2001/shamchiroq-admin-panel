import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Item } from "../../model";
import { DraggableDialog } from "../shared/ConfirmationDialog";
import { BASE_URL_API } from "../../utils/api";
import { useAxios } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

interface Props {
  item: Item;
}

const ItemCard = (props: Props) => {
  const { item } = props;

  const axios = useAxios();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleRemoveItem = async () => {
    try {
      await axios.deleteData(`${BASE_URL_API}/item/removeItemById/${item.id}`);

      setOpen(false);
    } catch (error) {
      console.log(error);

      setOpen(false);
    }
  };

  const handleLearnMore = () => {
    return navigate(`/items/${item.id}`);
  };

  return (
    <Card sx={{}}>
      <CardContent>
        <Typography variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {item.description}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {item.case}
        </Typography>
        <Typography variant="body2">
          Posted by{" "}
          {item.itemUser
            ? `${item.itemUser.firstName} ${item.itemUser.lastName}`
            : "No user found"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleLearnMore}>
          Learn More
        </Button>

        <DraggableDialog
          title="Are you sure"
          description="Are you sure you want to remove this item?"
          open={open}
          setOpen={setOpen}
          onProceed={handleRemoveItem}
        >
          <Button size="small" color="error" onClick={() => setOpen(true)}>
            Remove
          </Button>
        </DraggableDialog>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
