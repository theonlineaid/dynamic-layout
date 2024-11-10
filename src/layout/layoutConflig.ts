import { Layout } from "react-grid-layout";

// layoutConfig.js
export const layoutConfig: Layout[] = [
    {
        i: "a", // Component key
        x: 0, // Grid position
        y: 0, // Grid position
        w: 1, // Width in grid units
        h: 50, // Height in grid units
        static: false, // Static layout, can't be resized or dragged
        minW: 1, // Minimum width
        //   maxW: 6, // Maximum width
        minH: 40,
        //   maxH: 12, // Maximum height
        isDraggable: true, // Not draggable
        isResizable: true, // Not resizable
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
        // maxW: 4,
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
        // maxW: 4,
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
        // maxW: 4,
        minH: 40,
        static: false,
        isDraggable: true,
        isResizable: true,
        resizeHandles: ["se"],
        isBounded: false,
    },
    // {
    //     i: "e",
    //     x: 10,
    //     y: 0,
    //     w: 1,
    //     h: 2,
    //     static: false,
    //     isDraggable: true,
    //     isResizable: true,
    //     resizeHandles: ["ne", "se"],
    //     isBounded: true,
    // },
    // {
    //     i: "f",
    //     x: 11,
    //     y: 0,
    //     w: 1,
    //     h: 2,
    //     static: false,
    //     isDraggable: true,
    //     isResizable: true,
    //     resizeHandles: ["s", "w", "e", "n", "ne", "sw", "nw", "se"],
    //     isBounded: false,
    // },
];

export const layouts = {
    lg: layoutConfig,
    md: layoutConfig,
    sm: layoutConfig,
    xs: layoutConfig,
    xxs: layoutConfig,
};


export const handleResizeStart = () => {
    document.querySelector('.layout')?.classList.add('resizing');
};

export const handleResizeStop = () => {
    document.querySelector('.layout')?.classList.remove('resizing');
};

export const handleDragStart = () => {
    document.querySelector('.layout')?.classList.add('dragging');
};

export const handleDragStop = () => {
    document.querySelector('.layout')?.classList.remove('dragging');
};