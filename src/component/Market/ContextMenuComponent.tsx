import { Menu, MenuItem } from "@mui/material";


const ContextMenuComponent = ({ contextMenu, handleMenuClose, selectedRowData, handleMenuOptionClick, menuRef }: any) => {

  return (
    <Menu
        ref={menuRef}
        open={contextMenu !== null}
        onClose={handleMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        onContextMenu={(e) => {
          e.preventDefault();
          handleMenuClose();
        }}
      >
        <MenuItem disabled>
          {selectedRowData?.full_name || "No name available"}
        </MenuItem>
        <MenuItem onClick={() => handleMenuOptionClick("Edit")}>Edit</MenuItem>
        <MenuItem onClick={() => handleMenuOptionClick("Delete")}>Delete</MenuItem>
        <MenuItem onClick={() => handleMenuOptionClick("View Details")}>View Details</MenuItem>
      </Menu>
  )
};

export default ContextMenuComponent;
