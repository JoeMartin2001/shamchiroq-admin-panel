import { useCallback, useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { Item, ItemStatus } from "../../model";
import { BASE_URL_API } from "../../utils/api";
import { Grid, Pagination } from "@mui/material";
import ItemCard from "../../components/items/ItemCard";
import { LoadingBackdrop } from "../../components/shared/LoadingBackdrop";
import { SelectMenu } from "../../components/shared/SelectMenu";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ItemsSliceActions } from "../../store/features/itemsSlice";

const limit = 10;

export type ExtendedStatus = ItemStatus | "all";

export const CASE_OPTIONS: string[] = ["All", "Lost", "Found"];
export const STATUS_OPTIONS: ExtendedStatus[] = [
  "all",
  "active",
  "blocked",
  "inactive",
];

const ItemsPage = () => {
  const axios = useAxios();
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.items);

  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [displayedItems, setDisplayedItems] = useState<Item[]>([]);
  const [selectedCaseType, setSelectedCaseType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState<ExtendedStatus>("all");

  const getAllReports = useCallback(async () => {
    try {
      const items = await axios.get(
        `${BASE_URL_API}/item/getItems?page=${page}&limit=${limit}`
      );

      const newItems = items.data.rows as Item[];
      const updatedCount = Math.ceil(items.data.count / limit);

      setCount(updatedCount);

      dispatch(ItemsSliceActions.setData(newItems));
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

  useEffect(() => {
    const filteredItems = data.filter((item) => {
      if (selectedCaseType === "All" && selectedStatus === "all") {
        return true;
      }

      return item.case === selectedCaseType || item.status === selectedStatus;
    });

    setDisplayedItems(filteredItems);
  }, [data, selectedCaseType, selectedStatus]);

  if (isLoading) {
    return <LoadingBackdrop isLoading={isLoading} />;
  }

  return (
    <div>
      {data.length > 0 ? (
        <div>
          <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={3}>
              <SelectMenu
                value={selectedCaseType}
                label="Case Type"
                options={CASE_OPTIONS}
                onChange={setSelectedCaseType}
                labelProps={{
                  id: "caseType",
                }}
                selectProps={{
                  id: "caseType",
                  labelId: "caseType",
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <SelectMenu
                value={selectedStatus}
                label="Status"
                options={STATUS_OPTIONS}
                onChange={(v) => {
                  setSelectedStatus(v.toLowerCase() as ItemStatus);
                }}
                labelProps={{
                  id: "status",
                }}
                selectProps={{
                  id: "status",
                  labelId: "status",
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} marginBottom={5}>
            {displayedItems.map((item, idx) => (
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
