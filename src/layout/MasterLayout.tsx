import React, { lazy, Suspense, useState } from "react";
import {
  handleDragStart,
  handleDragStop,
  handleResizeStart,
  handleResizeStop,
} from "./layoutConflig";
import { Responsive, WidthProvider } from "react-grid-layout";
import CustomDialog from "../component/Modal/CustomDialog";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { CircularProgress, LinearProgress } from "@mui/material";
import {  layoutConfig } from "../app/slice/layoutSlice";
import {  useAppSelector } from "../hooks/useRedux";

const MarketData = lazy(() => import("../component/Market/MarketData"));
const ResponsiveGridLayout = WidthProvider(Responsive);

const MasterLayout: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const layout = useAppSelector((state) => state.layout);

  const handleHeaderClick = () => {
    setOpenModal(true);
  };

  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        layouts={layout}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#141414",
              }}
            >
              <div className="grid-header"> Header {item.i} </div>
              <div onClick={() => handleHeaderClick()}>
                <FullscreenIcon />
              </div>
            </div>
            <div className="grid-content">
              <Suspense fallback={<LinearProgress color="success" />}>
                <MarketData />
              </Suspense>
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>

      <CustomDialog
        title="Modal Title"
        open={openModal}
        onClose={() => setOpenModal(false)}
        isDraggable={true}
      >
        <Suspense fallback={<CircularProgress />}>
          <MarketData />
        </Suspense>
      </CustomDialog>
    </>
  );
};

export default MasterLayout;
