import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Notification } from "../../model";

type InitialState = {
  data: Notification[];
};

const initialState: InitialState = {
  data: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Notification[]>) => {
      state.data = action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      const updatedState = { ...state };
      const updatedData = [...updatedState.data];

      const newNotification = action.payload;
      updatedData.push(newNotification);

      updatedState.data = updatedData;

      return updatedState;
    },
    updateNotification: (state, action: PayloadAction<Notification>) => {
      const newNotification = action.payload;
      const updatedData = [...state.data];

      const idx = updatedData.findIndex(
        (notification) => notification.id === newNotification.id
      );
      updatedData[idx] = newNotification;

      state.data = updatedData;
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const updatedState = { ...state };
      const updatedData = [...updatedState.data];

      const notificationId = action.payload;
      const notificationIndex = updatedData.findIndex(
        (item) => item.id === notificationId
      );
      updatedData.splice(notificationIndex, 1);

      updatedState.data = updatedData;

      return updatedState;
    },
    reset: () => initialState,
  },
});

export const NotificationsSliceActions = notificationsSlice.actions;

export default notificationsSlice.reducer;
