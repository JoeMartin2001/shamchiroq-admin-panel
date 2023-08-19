import { ChevronLeft } from "@mui/icons-material";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Case, Item, ItemStatus } from "../../../model";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { SelectMenu } from "../../../components/shared/SelectMenu";
import { useAxios } from "../../../hooks/useAxios";
import { BASE_URL_API } from "../../../utils/api";
import { ItemsSliceActions } from "../../../store/features/itemsSlice";

export const CASE_OPTIONS: string[] = ["Lost", "Found"];
export const STATUS_OPTIONS: ItemStatus[] = ["active", "blocked", "inactive"];

const ManageItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const axios = useAxios();

  const { data } = useAppSelector((state) => state.items);

  const [itemInfo, setItemInfo] = useState<Item>();

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const [selectedCaseType, setSelectedCaseType] = useState<Case>("Lost");
  const [selectedStatus, setSelectedStatus] = useState<ItemStatus>("active");

  useEffect(() => {
    const currentItem = data.find((item) => item.id === params.id);

    if (currentItem) {
      setSelectedStatus(currentItem.status);
      setSelectedCaseType(currentItem.case);
      setItemInfo(currentItem);
    }
  }, [data, params.id]);

  const handleGoBack = () => {
    navigate("/items");
  };

  const handleSaveChanges = async () => {
    if (!itemInfo) {
      return;
    }

    const updatedData: Item = {
      ...itemInfo,
      case: selectedCaseType,
      status: selectedStatus,
    };

    try {
      await axios.update(
        `${BASE_URL_API}/item/updateItem/${updatedData.id}`,
        updatedData
      );

      setIsSnackbarOpen(true);

      dispatch(ItemsSliceActions.updateItem(updatedData));
    } catch (error) {
      console.log(error);
    }
  };

  if (!itemInfo) {
    return null;
  }

  return (
    <Container disableGutters maxWidth={false}>
      <Box sx={{ flexGrow: 1 }} marginBottom={5}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleGoBack}
            >
              <ChevronLeft />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {itemInfo.title}
            </Typography>

            <Button color="inherit" onClick={handleSaveChanges}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Grid container spacing={2} marginBottom={2} paddingX={5}>
        <Grid item xs={3}>
          <SelectMenu
            value={selectedCaseType}
            label="Case Type"
            options={CASE_OPTIONS}
            onChange={(v) => setSelectedCaseType(v as Case)}
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

      <Box paddingX={5} marginBottom={2}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Title
        </Typography>

        <Typography variant="body1" gutterBottom>
          {itemInfo.title}
        </Typography>
      </Box>

      <Box paddingX={5} marginBottom={2}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Description
        </Typography>

        <Typography variant="body1" gutterBottom>
          {itemInfo.description}
        </Typography>
      </Box>

      <Box paddingX={5} marginBottom={2}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Images
        </Typography>

        <ImageList sx={{ width: 500, height: 450 }} cols={3}>
          {itemInfo.images.map((img) => (
            <ImageListItem key={img}>
              <img src={img} srcSet={img} alt={img} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
        message="Note archived"
      >
        <Alert severity="success">Item successfully updated</Alert>
      </Snackbar>
    </Container>
  );
};

export default ManageItem;
