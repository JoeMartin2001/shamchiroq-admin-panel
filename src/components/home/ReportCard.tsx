import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Report, User } from "../../model";
import { useAxios } from "../../hooks/useAxios";
import { BASE_URL_API } from "../../utils/api";
import { DraggableDialog } from "../shared/ConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { ReportsSliceActions } from "../../store/features/reportsSlice";

interface Props {
  report: Report;
}

const ReportCard = (props: Props) => {
  const { report } = props;

  const axios = useAxios();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);

  const handleRemoveReport = async () => {
    try {
      await axios.deleteData(
        `${BASE_URL_API}/report/removeReportById/${report.id}`
      );

      dispatch(ReportsSliceActions.removeReport(report.id!));

      setOpen(false);
    } catch (error) {
      console.log(error);

      setOpen(false);
    }
  };

  const handleLearnMore = () => {
    return navigate(`/reports/${report.id}`);
  };

  const reportee = report.reporteeId as User;
  const reporter = report.reporterId as User;

  return (
    <Card sx={{}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {report.description}
        </Typography>
        <Typography variant="h5" component="div">
          {report.description}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Reporter: {`${reporter.firstName} ${reporter.lastName}`}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Reportee: {`${reportee.firstName} ${reportee.lastName}`}
        </Typography>
        <Typography variant="body2">{report.reporter}</Typography>
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

export default ReportCard;
