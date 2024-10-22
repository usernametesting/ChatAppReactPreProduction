

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './authSlice';
import dynamicComponentRenderSlice from './dynamicComponentRenderSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
    dynamicComponentRender: dynamicComponentRenderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true, 
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
