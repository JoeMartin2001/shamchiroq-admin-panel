import { Grid, Pagination } from "@mui/material";
import { useAxios } from "../../hooks/useAxios";
import { Report } from "../../model";
import { useCallback, useEffect, useState } from "react";
import { BASE_URL_API } from "../../utils/api";
import ReportCard from "../../components/home/ReportCard";

const limit = 30;

const HomePage = () => {
  const axios = useAxios();

  const [allReports, setAllReports] = useState<Report[]>([]);
  const [page, setPage] = useState(1);

  const getAllReports = useCallback(async () => {
    try {
      const reports = await axios.get(
        `${BASE_URL_API}/report/getReports?page=${page}&limit=${limit}`
      );

      const newReports = reports.data as Report[];

      console.log(newReports);
      console.log(newReports[0]);

      setAllReports(newReports);
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    getAllReports();
  }, [getAllReports]);

  return (
    <div>
      {allReports.length > 0 ? (
        <div>
          <Grid container spacing={2} marginBottom={5}>
            {allReports.map((report, idx) => (
              <Grid item xs={4} key={idx + report.id!}>
                <ReportCard report={report} />
              </Grid>
            ))}
          </Grid>

          <Pagination
            onChange={(_, nextPage) => setPage(nextPage)}
            count={10}
            variant="outlined"
          />
        </div>
      ) : (
        <div>
          <p>No reports found...</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
