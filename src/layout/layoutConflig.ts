import { Layout } from "react-grid-layout";

// layoutConfig.js
const layoutConfig: Layout[] = [
    {
      i: "a", // Component key
      x: 0, // Grid position
      y: 0, // Grid position
      w: 5, // Width in grid units
      h: 10, // Height in grid units
      static: true, // Static layout, can't be resized or dragged
      minW: 1, // Minimum width
      maxW: 6, // Maximum width
      minH: 2, // Minimum height
      maxH: 12, // Maximum height
      isDraggable: false, // Not draggable
      isResizable: false, // Not resizable
      resizeHandles: ["se"], // Resize handle at bottom-right corner
      isBounded: true, // Constrained within the grid
    },
    {
      i: "b",
      x: 5,
      y: 0,
      w: 3,
      h: 2,
      minW: 2,
      maxW: 4,
      static: false,
      isDraggable: true,
      isResizable: true,
      resizeHandles: ["se", "e", "w"],
      isBounded: false,
    },
    {
      i: "c",
      x: 8,
      y: 0,
      w: 1,
      h: 16,
      static: false,
      isDraggable: true,
      isResizable: true,
      resizeHandles: ["se"],
      isBounded: true,
    },
    {
      i: "d",
      x: 9,
      y: 0,
      w: 1,
      h: 2,
      static: false,
      isDraggable: true,
      isResizable: true,
      resizeHandles: ["sw", "se"],
      isBounded: true,
    },
    {
      i: "e",
      x: 10,
      y: 0,
      w: 1,
      h: 2,
      static: false,
      isDraggable: true,
      isResizable: true,
      resizeHandles: ["ne", "se"],
      isBounded: true,
    },
    {
      i: "f",
      x: 11,
      y: 0,
      w: 1,
      h: 2,
      static: false,
      isDraggable: true,
      isResizable: true,
      resizeHandles: ["s", "w", "e", "n", "ne", "sw", "nw", "se"],
      isBounded: false,
    },
  ];


export default layoutConfig;
