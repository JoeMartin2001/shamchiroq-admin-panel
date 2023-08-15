import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../model";

type InitialState = {
  data: User[];
};

const initialState: InitialState = {
  data: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<User[]>) => {
      state.data = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      const updatedState = { ...state };
      const updatedData = [...updatedState.data];

      const newUser = action.payload;
      updatedData.push(newUser);

      updatedState.data = updatedData;

      return updatedState;
    },
    removeUser: (state, action: PayloadAction<string>) => {
      const updatedState = { ...state };
      const updatedData = [...updatedState.data];

      const userId = action.payload;
      const userIndex = updatedData.findIndex((user) => user.id === userId);
      updatedData.splice(userIndex, 1);

      updatedState.data = updatedData;

      return updatedState;
    },
    reset: () => initialState,
  },
});

export const UsersSliceActions = usersSlice.actions;

export default usersSlice.reducer;
