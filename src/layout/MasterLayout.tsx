import { handleDragStart, handleDragStop, handleResizeStart, handleResizeStop, layoutConfig, layouts } from "./layoutConflig";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

const MasterLayout: React.FC = () => {
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      // cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      cols={{ lg: 2, md: 2, sm: 2, xs: 2, xxs: 1 }}
      rowHeight={1}
      width={window.innerWidth}
      draggableHandle={".grid-header"}
      onResizeStart={handleResizeStart}
      onResizeStop={handleResizeStop}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
    >
      {layoutConfig.map((item) => (
        <div className="grid-item" key={item.i}>
          <div className="grid-header">Header {item.i}</div>
          <div className="grid-content">Content {item.i}</div>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default MasterLayout;
