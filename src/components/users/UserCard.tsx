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

interface Props {
  user: User;
}

export const UserCard = (props: Props) => {
  const { user } = props;

  return (
    <Card sx={{}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {user.id}
        </Typography>
        <Typography variant="h5" component="div">
          {user.email || "No email"}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {user.phone}
        </Typography>
        <Typography variant="body2">
          {moment(new Date(user.createdAt)).format("MM/DD/YYYY")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
