import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Report } from "../../model";
import { useAxios } from "../../hooks/useAxios";
import { BASE_URL_API } from "../../utils/api";
import { DraggableDialog } from "../shared/ConfirmationDialog";

interface Props {
  report: Report;
}

const ReportCard = (props: Props) => {
  const { report } = props;

  const axios = useAxios();

  const [open, setOpen] = React.useState(false);

  const handleRemoveReport = async () => {
    try {
      await axios.deleteData(
        `${BASE_URL_API}/report/removeReportById/${report.id}`
      );

      setOpen(false);
    } catch (error) {
      console.log(error);

      setOpen(false);
    }
  };

  return (
    <Card sx={{}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {report.description}
        </Typography>
        <Typography variant="h5" component="div">
          {report.itemId}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {report.reportee}
        </Typography>
        <Typography variant="body2">{report.reporter}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>

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

export default ReportCard;
