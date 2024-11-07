import React from 'react';

// Define the props for GridItemContainer
interface GridItemProps {
  item: string;  // The unique name/id of the grid item (e.g., 'market', 'depth')
}

const GridItemContainer: React.FC<GridItemProps> = ({ item }) => {
  return (
    <div className="grid-item">
      <h3>{item}</h3>
      {/* Render the content for the item */}
    </div>
  );
};

export default GridItemContainer;
