import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

interface Props {
  isLoading: boolean;
}

export const LoadingBackdrop = ({ isLoading }: Props) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
