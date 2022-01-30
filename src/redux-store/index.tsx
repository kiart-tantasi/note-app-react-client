import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import loadingReducer from "./loadingSlice";
import notificationReducer from "./notificationSlice";
import postReducer from "./postSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        loading: loadingReducer,
        notification: notificationReducer,
        post: postReducer
    }
})
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// from https://redux.js.org/usage/usage-with-typescript

