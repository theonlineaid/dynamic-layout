import { useState } from "react";
import { handleDragStart, handleDragStop, handleResizeStart, handleResizeStop, layoutConfig, layouts } from "./layoutConflig";
import { Responsive, WidthProvider } from "react-grid-layout";
import CustomDialog from "../component/Modal/CustomDialog";
const ResponsiveGridLayout = WidthProvider(Responsive);

const MasterLayout: React.FC = () => {

  const [openModal, setOpenModal] = useState(false);  // State to control modal visibility
  const [modalContent, setModalContent] = useState<string>("");  // Store the content for the modal

  // Handle the click on grid header to show the modal
  const handleHeaderClick = (headerContent: string) => {
    setModalContent(headerContent);
    setOpenModal(true);  // Show the modal
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
            <div className="grid-header"> Header {item.i} </div>
            <div  onClick={() => handleHeaderClick(`Header ${item.i}`)}>[]</div>
            <div className="grid-content">Content {item.i}</div>
          </div>
        ))}
      </ResponsiveGridLayout>


      {/* Your custom modal */}
      <CustomDialog
        title="Modal Title"
        open={openModal}
        onClose={() => setOpenModal(false)}  // Close modal handler
        isDraggable
      >
        <div>{modalContent}</div>  {/* Display clicked header content */}
      </CustomDialog>

    </>
  );
};

export default MasterLayout;
