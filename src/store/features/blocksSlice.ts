import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Block } from "../../model";

type InitialState = {
  data: Block[];
};

const initialState: InitialState = {
  data: [],
};

export const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Block[]>) => {
      state.data = action.payload;
    },
    addBlock: (state, action: PayloadAction<Block>) => {
      const updatedState = { ...state };
      const updatedData = [...updatedState.data];

      const newBlock = action.payload;
      updatedData.push(newBlock);

      updatedState.data = updatedData;

      return updatedState;
    },
    updateBlock: (state, action: PayloadAction<Block>) => {
      const newBlock = action.payload;
      const updatedData = [...state.data];

      const idx = updatedData.findIndex((block) => block.id === newBlock.id);
      updatedData[idx] = newBlock;

      state.data = updatedData;
    },
    removeBlock: (state, action: PayloadAction<string>) => {
      const updatedState = { ...state };
      const updatedData = [...updatedState.data];

      const blockId = action.payload;
      const blockIndex = updatedData.findIndex((block) => block.id === blockId);
      updatedData.splice(blockIndex, 1);

      updatedState.data = updatedData;

      return updatedState;
    },
    reset: () => initialState,
  },
});

export const BlocksSliceActions = blocksSlice.actions;

export default blocksSlice.reducer;
