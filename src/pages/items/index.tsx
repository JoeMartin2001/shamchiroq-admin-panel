import { useCallback, useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { Item } from "../../model";
import { BASE_URL_API } from "../../utils/api";
import { Grid, Pagination } from "@mui/material";
import ItemCard from "../../components/items/ItemCard";
import { LoadingBackdrop } from "../../components/shared/LoadingBackdrop";

const limit = 10;

const ItemsPage = () => {
  const axios = useAxios();

  const [allItems, setAllItems] = useState<Item[]>([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getAllReports = useCallback(async () => {
    try {
      const items = await axios.get(
        `${BASE_URL_API}/item/getItems?page=${page}&limit=${limit}`
      );

      const newItems = items.data.rows as Item[];
      const updatedCount = Math.ceil(items.data.count / limit);

      setCount(updatedCount);
      setAllItems(newItems);
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
      {allItems.length > 0 ? (
        <div>
          <Grid container spacing={2} marginBottom={5}>
            {allItems.map((item, idx) => (
              <Grid item xs={4} key={idx + item.id!}>
                <ItemCard item={item} />
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
          <p>No items found...</p>
        </div>
      )}
    </div>
  );
};

export default ItemsPage;
