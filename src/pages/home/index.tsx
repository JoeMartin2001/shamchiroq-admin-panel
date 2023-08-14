import { Grid, Pagination } from "@mui/material";
import { useAxios } from "../../hooks/useAxios";
import { Report } from "../../model";
import { useCallback, useEffect, useState } from "react";
import { BASE_URL_API } from "../../utils/api";
import ReportCard from "../../components/home/ReportCard";
import { LoadingBackdrop } from "../../components/shared/LoadingBackdrop";

const limit = 10;

const HomePage = () => {
  const axios = useAxios();

  const [allReports, setAllReports] = useState<Report[]>([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getAllReports = useCallback(async () => {
    try {
      const reports = await axios.get(
        `${BASE_URL_API}/report/getReports?page=${page}&limit=${limit}`
      );

      const newReports = reports.data.rows as Report[];
      const updatedCount = Math.ceil(reports.data.count / limit);

      setCount(updatedCount);
      setAllReports(newReports);
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    setIsLoading(true);

    getAllReports().finally(() => {
      setIsLoading(false);
    });
  }, [getAllReports]);

  if (isLoading) {
    return <LoadingBackdrop isLoading={isLoading} />;
  }

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
            count={count}
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
