import { createSlice } from '@reduxjs/toolkit';
import { Layout } from 'react-grid-layout';
import { RootState } from '../store';

// Define the initial layoutConfig as a constant (you can use the same layoutConfig as before)
export const layoutConfig: Layout[] = [
    {
        i: "a", // Component key
        x: 0, // Grid position
        y: 0, // Grid position
        w: 1, // Width in grid units
        h: 50, // Height in grid units
        static: false, // Static layout, can't be resized or dragged
        minW: 1, // Minimum width
        minH: 40, // Minimum height
        isDraggable: true, // Draggable
        isResizable: true, // Resizable
        resizeHandles: ["se"], // Resize handle at bottom-right corner
        isBounded: false, // Constrained within the grid
    },
    {
        i: "b",
        x: 5,
        y: 0,
        w: 1,
        h: 50,
        minW: 1,
        minH: 40,
        static: false,
        isDraggable: true,
        isResizable: true,
        resizeHandles: ["se"],
        isBounded: false,
    },
    {
        i: "c",
        x: 0,
        y: 0,
        w: 1,
        h: 50,
        minW: 1,
        minH: 40,
        static: false,
        isDraggable: true,
        isResizable: true,
        resizeHandles: ["se"],
        isBounded: false,
    },
    {
        i: "d",
        x: 1,
        y: 0,
        w: 1,
        h: 50,
        minW: 1,
        minH: 40,
        static: false,
        isDraggable: true,
        isResizable: true,
        resizeHandles: ["se"],
        isBounded: false,
    },
];

// Define initial state based on the layoutConfig
export const initialState = {
    lg: layoutConfig,
    md: layoutConfig,
    sm: layoutConfig,
    xs: layoutConfig,
    xxs: layoutConfig,
};

console.log('initialState', initialState);

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        // Set the layout configuration properly by mutating the state directly
        setLayouts: () => {
            // Update each breakpoint's layout with the new configuration
            return
        },
    },
});

export const { setLayouts } = layoutSlice.actions;

// Selector to access layouts from the Redux state
export const selectLayouts = (state: RootState) => state;

export default layoutSlice.reducer;
