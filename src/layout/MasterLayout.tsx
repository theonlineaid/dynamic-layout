import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { setLayout } from '../app/slice/layoutSlice';

// Sample data for grid items
type GridData = {
  [key: string]: { title: string; description: string }; // Dynamic key type
};

export const gridData: GridData = {
  market: { title: "Market Data", description: "Live market updates." },
  depth: { title: "Depth Data", description: "Market depth information." },
  blotter: { title: "Blotter Data", description: "Recent trade blotter." },
};

type Breakpoint = 'lg' | 'md' | 'sm' | 'xs' | 'xxs';

interface LayoutItem {
  i: string; // Item identifier
  w: number; // Width
  h: number; // Height
  x: number; // X position
  y: number; // Y position
}

// Create a ResponsiveGridLayout with WidthProvider for responsive grids
const ResponsiveGridLayout = WidthProvider(Responsive);

const MasterLayout: React.FC = () => {
  const dispatch = useDispatch();

  // Access layouts from the Redux store
  const { layouts } = useSelector((state: any) => state.layout);

  // Local state for managing the current breakpoint
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('lg');

  // Handle breakpoint change
  const handleBreakPointChange = (newBreakpoint: Breakpoint) => {
    setBreakpoint(newBreakpoint);
  };

  // Handle layout change
  const handleLayoutChange = (newLayout: LayoutItem[]) => {
    if (breakpoint) {
      dispatch(setLayout({ breakpoint, newLayout }));
    }
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts} // Redux state with layouts for each breakpoint
      onBreakpointChange={handleBreakPointChange}
      onLayoutChange={handleLayoutChange}
      isDraggable
      isResizable
      draggableHandle=".grid-item__title"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
    >
      {/* Render grid items based on the 'layouts' object and 'gridData' */}
      {layouts[breakpoint]?.map((layoutItem: LayoutItem, index: number) => {
        const itemData = gridData[layoutItem.i];

        // Handle case when gridData item is not found
        if (!itemData) {
          return null; // Return nothing if data for this layout item is not available
        }

        return (
          <div
            key={layoutItem.i}
            data-grid={layoutItem} // Pass layout information for each item
            className="grid-item"
          >
            {/* Display item content, using itemData */}
            <div className="grid-item__title">{itemData.title}</div>
            <div className="grid-item__description">{itemData.description}</div>
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
};

export default MasterLayout;
