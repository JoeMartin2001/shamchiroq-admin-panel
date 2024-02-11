import { useCallback, useEffect, useState } from "react";
import { BASE_URL_API } from "../../utils/api";
import { useAxios } from "../../hooks/useAxios";
import { Block } from "../../model";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { BlocksSliceActions } from "../../store/features/blocksSlice";
import { Grid, Pagination } from "@mui/material";
import { BlockCard } from "../../components/blocks/BlockCard";
import { LoadingBackdrop } from "../../components/shared/LoadingBackdrop";

const limit = 10;

const BlocksPage = () => {
  const axios = useAxios();
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.blocks);

  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getAllBlocks = useCallback(async () => {
    try {
      const items = await axios.get(
        `${BASE_URL_API}/block/getBlocks?page=${page}&limit=${limit}`
      );

      if (items.data) {
        const newItems = items.data.rows as Block[];
        const updatedCount = Math.ceil(items.data.count / limit);

        setCount(updatedCount);

        dispatch(BlocksSliceActions.setData(newItems));
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (data.length === 0) {
      setIsLoading(true);

      getAllBlocks().finally(() => {
        setIsLoading(false);
      });
    }
  }, [data.length, getAllBlocks]);

  if (isLoading) {
    return <LoadingBackdrop isLoading={isLoading} />;
  }

  return (
    <div>
      {data.length > 0 ? (
        <div>
          <Grid container spacing={2} marginBottom={5}>
            {data.map((block, idx) => (
              <Grid item xs={4} key={idx + block.id!}>
                <BlockCard block={block} />
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

export default BlocksPage;
