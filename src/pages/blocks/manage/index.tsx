import { ChevronLeft } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Block } from "../../../model";
import { useAxios } from "../../../hooks/useAxios";

export const ManageBlock = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const axios = useAxios();

  const { data } = useAppSelector((state) => state.blocks);

  const [itemInfo, setItemInfo] = useState<Block>();

  useEffect(() => {
    const currentItem = data.find((item) => item.id === params.id);

    if (currentItem) {
      setItemInfo(currentItem);
    }
  }, [data, params.id]);

  const handleGoBack = () => {
    navigate("/items");
  };

  const handleSaveChanges = () => {};

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
              Go Back
            </Typography>

            <Button color="inherit" onClick={handleSaveChanges}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <p>{itemInfo.id}</p>
    </Container>
  );
};
