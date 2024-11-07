// layoutSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Breakpoint = 'lg' | 'md' | 'sm' | 'xs' | 'xxs';

interface LayoutItem {
  i: string; // Item identifier
  w: number; // Width
  h: number; // Height
  x: number; // X position
  y: number; // Y position
}

interface LayoutState {
  layouts: Record<Breakpoint, LayoutItem[]>; // layouts object should be indexed by breakpoint
}

const initialState: LayoutState = {
  layouts: {
    lg: [],
    md: [],
    sm: [],
    xs: [],
    xxs: [],
  },
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayout: (state, action: PayloadAction<{ breakpoint: Breakpoint; newLayout: LayoutItem[] }>) => {
      const { breakpoint, newLayout } = action.payload;
      state.layouts[breakpoint] = newLayout; // Update layout for the specific breakpoint
    },
  },
});

export const { setLayout } = layoutSlice.actions;
export default layoutSlice.reducer;
