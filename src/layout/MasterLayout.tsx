import React, { lazy, Suspense, useState } from "react";
import { handleDragStart, handleDragStop, handleResizeStart, handleResizeStop, layoutConfig, layouts } from "./layoutConflig";
import { Responsive, WidthProvider } from "react-grid-layout";
import CustomDialog from "../component/Modal/CustomDialog";
const ResponsiveGridLayout = WidthProvider(Responsive);
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { CircularProgress, LinearProgress } from "@mui/material";
// import MarketData from "../component/Market/MarketData";
const MarketData = lazy(() => import('../component/Market/MarketData'));

const MasterLayout: React.FC = () => {

  const [openModal, setOpenModal] = useState(false);
  // const [modalContent, setModalContent] = useState<string>("");
  const handleHeaderClick = () => {
    // setModalContent(headerContent);
    setOpenModal(true);
  };

  return (
    <>
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
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "#141414" }}>
              <div className="grid-header"> Header {item.i} </div>
              <div onClick={() => handleHeaderClick()}><FullscreenIcon /></div>
            </div>
            <div className="grid-content">
              <Suspense fallback={<LinearProgress color="success" />}>
                <MarketData />
              </Suspense>
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>

      {/* Your custom modal */}
      <CustomDialog
        title="Modal Title"
        open={openModal}
        onClose={() => setOpenModal(false)}  // Close modal handler
        isDraggable={true}
      // maxWidth={"sm"}
      // isFullScreenButtonVisible={false}
      >
        <Suspense fallback={<CircularProgress />}>
          <MarketData />
        </Suspense>
      </CustomDialog>

    </>
  );
};

export default MasterLayout;
