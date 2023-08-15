import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Report } from "../../model";

type InitialState = {
  data: Report[];
};

const initialState: InitialState = {
  data: [],
};

export const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Report[]>) => {
      state.data = action.payload;
    },
    addReport: (state, action: PayloadAction<Report>) => {
      const updatedState = { ...state };
      const updatedData = [...updatedState.data];

      const newReport = action.payload;
      updatedData.push(newReport);

      updatedState.data = updatedData;

      return updatedState;
    },
    removeReport: (state, action: PayloadAction<string>) => {
      const updatedState = { ...state };
      const updatedData = [...updatedState.data];

      const reportId = action.payload;
      const reportIndex = updatedData.findIndex(
        (report) => report.id === reportId
      );
      updatedData.splice(reportIndex, 1);

      updatedState.data = updatedData;

      return updatedState;
    },
    reset: () => initialState,
  },
});

export const ReportsSliceActions = reportsSlice.actions;

export default reportsSlice.reducer;
