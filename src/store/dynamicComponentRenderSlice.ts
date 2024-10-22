import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

interface ComponentState {
  component: ReactNode | null;
  mainLeftComponent: ReactNode | null;
}

const initialState: ComponentState = {
  component: null,
  mainLeftComponent: null
};

export const dynamicComponentRenderSlice = createSlice({
  name: 'dynamicComponentRender',
  initialState,
  reducers: {
    setComponent: (state, action: PayloadAction<ReactNode>) => {
      state.component = action.payload;
    },
    setMainLeftComponent: (state, action: PayloadAction<ReactNode>) => {
      state.mainLeftComponent = action.payload;
    }
  },
});

export const { setComponent ,setMainLeftComponent} = dynamicComponentRenderSlice.actions;

export default dynamicComponentRenderSlice.reducer;
