import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Report } from "../../model";

interface Props {
  report: Report;
}

const ReportCard = (props: Props) => {
  const { report } = props;

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
      </CardActions>
    </Card>
  );
};

export default ReportCard;
