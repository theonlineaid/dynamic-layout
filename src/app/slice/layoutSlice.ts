// layoutSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { layoutConfig } from '../../layout/layoutConflig';

const initialState = layoutConfig

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        updateGridItemHeight(state, action) {
            const { id, height } = action.payload;
            const gridItem = state.find(item => item.i === id);
            if (gridItem) {
                gridItem.h = height;
            }
        },
        updateGridItemPosition(state, action) {
            const { id, x, y } = action.payload;
            const gridItem = state.find(item => item.i === id);
            if (gridItem) {
                gridItem.x = x;
                gridItem.y = y;
            }
        },
    },
});

export const { updateGridItemHeight, updateGridItemPosition } = layoutSlice.actions;

export default layoutSlice.reducer;
