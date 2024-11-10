import { Responsive, WidthProvider } from "react-grid-layout";
import layoutConfig from "./layoutConflig";
const ResponsiveGridLayout = WidthProvider(Responsive);

const MasterLayout: React.FC = () => {

  const layouts = {
    lg: layoutConfig,
    md: layoutConfig,
    sm: layoutConfig,
    xs: layoutConfig,
    xxs: layoutConfig,
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={30}
      width={window.innerWidth}
      draggableHandle={".grid-header"}
    >
      {layoutConfig.map((item) => (
        <div className="grid-item" key={item.i}>
          <div className="grid-header">Header {item.i}</div>
          <div className="grid-content">Content {item.i}</div>
          {item.i}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default MasterLayout;
