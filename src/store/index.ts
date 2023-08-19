import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./features/itemsSlice";
import reportsSlice from "./features/reportsSlice";
import usersSlice from "./features/usersSlice";
import notificationsSlice from "./features/notificationsSlice";
import blocksSlice from "./features/blocksSlice";

export const store = configureStore({
  reducer: {
    items: itemsSlice,
    reports: reportsSlice,
    users: usersSlice,
    notifications: notificationsSlice,
    blocks: blocksSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
