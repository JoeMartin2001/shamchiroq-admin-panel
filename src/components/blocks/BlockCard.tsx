import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Block, User } from "../../model";
import { useAxios } from "../../hooks/useAxios";
import { BASE_URL_API } from "../../utils/api";
import { DraggableDialog } from "../shared/ConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { BlocksSliceActions } from "../../store/features/blocksSlice";
import moment from "moment";

interface Props {
  block: Block;
}

export const BlockCard = (props: Props) => {
  const { block } = props;

  const axios = useAxios();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);

  const handleRemoveReport = async () => {
    try {
      await axios.deleteData(`${BASE_URL_API}/block/deleteBlock/${block.id}`);

      dispatch(BlocksSliceActions.removeBlock(block.id!));

      setOpen(false);
    } catch (error) {
      console.log(error);

      setOpen(false);
    }
  };

  const handleLearnMore = () => {
    return navigate(`/blocks/${block.id}`);
  };

  const reportee = block.blockeeUser as User;
  const reporter = block.blockerUser as User;

  return (
    <Card sx={{}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Reporter: {reportee.firstName} {reportee.lastName}
        </Typography>
        <Typography variant="h5" component="div">
          Reportee: {reporter.firstName} {reporter.lastName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Reason: {block.description}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Date: {moment(block.createdAt).format("DD/MM/YYYY")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleLearnMore}>
          Learn More
        </Button>

        <DraggableDialog
          title="Are you sure"
          description="Are you sure you want to remove this report?"
          open={open}
          setOpen={setOpen}
          onProceed={handleRemoveReport}
        >
          <Button size="small" color="error" onClick={() => setOpen(true)}>
            Remove
          </Button>
        </DraggableDialog>
      </CardActions>
    </Card>
  );
};
