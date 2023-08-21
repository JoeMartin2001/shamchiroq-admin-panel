import React from "react";
import { User } from "../../model";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useAxios } from "../../hooks/useAxios";
import { BASE_URL_API } from "../../utils/api";
import { DraggableDialog } from "../shared/ConfirmationDialog";
import { useNavigate } from "react-router-dom";

interface Props {
  user: User;
}

export const UserCard = (props: Props) => {
  const { user } = props;

  const axios = useAxios();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleRemoveUser = async () => {
    try {
      await axios.deleteData(`${BASE_URL_API}/user/removeUserById/${user.id}`);

      setOpen(false);
    } catch (error) {
      console.log(error);

      setOpen(false);
    }
  };

  const handleLearnMore = () => {
    return navigate(`/users/${user.id}`);
  };

  return (
    <Card sx={{}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Email: {user.email || "None"}
        </Typography>
        <Typography variant="h5" component="div">
          {user.firstName + user.lastName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {user.phone}
        </Typography>
        <Typography variant="body2">
          Joined at {moment(new Date(user.createdAt!)).format("MM/DD/YYYY")}
        </Typography>
        <Typography variant="body2">ID: {user.id}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleLearnMore}>
          Learn More
        </Button>

        <DraggableDialog
          title="Are you sure"
          description="Are you sure you want to remove this user?"
          open={open}
          setOpen={setOpen}
          onProceed={handleRemoveUser}
        >
          <Button size="small" color="error" onClick={() => setOpen(true)}>
            Remove
          </Button>
        </DraggableDialog>
      </CardActions>
    </Card>
  );
};
