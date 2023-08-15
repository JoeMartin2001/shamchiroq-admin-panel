import { Grid, Pagination } from "@mui/material";
import { useAxios } from "../../hooks/useAxios";
import { Report } from "../../model";
import { useCallback, useEffect, useState } from "react";
import { BASE_URL_API } from "../../utils/api";
import ReportCard from "../../components/home/ReportCard";
import { LoadingBackdrop } from "../../components/shared/LoadingBackdrop";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ReportsSliceActions } from "../../store/features/reportsSlice";

const limit = 10;

const HomePage = () => {
  const axios = useAxios();
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.reports);

  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getAllReports = useCallback(async () => {
    try {
      const reports = await axios.get(
        `${BASE_URL_API}/report/getReports?page=${page}&limit=${limit}`
      );

      const newReports = reports.data.rows as Report[];
      const updatedCount = Math.ceil(reports.data.count / limit);

      setCount(updatedCount);

      dispatch(ReportsSliceActions.setData(newReports));
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (data.length === 0) {
      setIsLoading(true);

      getAllReports().finally(() => {
        setIsLoading(false);
      });
    }
  }, [data.length, getAllReports]);

  if (isLoading) {
    return <LoadingBackdrop isLoading={isLoading} />;
  }

  return (
    <div>
      {data.length > 0 ? (
        <div>
          <Grid container spacing={2} marginBottom={5}>
            {data.map((report, idx) => (
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
