import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Item } from "../../model";

type InitialState = {
  data: Item[];
};

const initialState: InitialState = {
  data: [],
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Item[]>) => {
      state.data = action.payload;
    },
    addItem: (state, action: PayloadAction<Item>) => {
      const updatedState = { ...state };
      const updatedData = [...updatedState.data];

      const newItem = action.payload;
      updatedData.push(newItem);

      updatedState.data = updatedData;

      return updatedState;
    },
    updateItem: (state, action: PayloadAction<Item>) => {
      const newItem = action.payload;
      const updatedData = [...state.data];

      const idx = updatedData.findIndex((item) => item.id === newItem.id);
      updatedData[idx] = newItem;

      state.data = updatedData;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const updatedState = { ...state };
      const updatedData = [...updatedState.data];

      const itemId = action.payload;
      const itemIndex = updatedData.findIndex((item) => item.id === itemId);
      updatedData.splice(itemIndex, 1);

      updatedState.data = updatedData;

      return updatedState;
    },
    reset: () => initialState,
  },
});

export const ItemsSliceActions = itemsSlice.actions;

export default itemsSlice.reducer;
