import { useState, useMemo, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { useMarket } from "../../context/MarketContext";
import { useBoardFilter } from "../../hooks/useBoardFilter";
import { columnDefs, defaultColDef, handleContextMenu } from "./MarketUtils";
import CustomDialog from "../Modal/CustomDialog";
import { RowSelectionOptions } from "ag-grid-community";
import { Menu, MenuItem } from "@mui/material";
import ShortNameAutocomplete from "./ShortNameSelect";

const MarketData = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const { marketData } = useMarket();
  const gridRef = useRef<AgGridReact>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<string>("material");

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  const {
    availableBoards,
    selectedBoard,
    setSelectedBoard,
  } = useBoardFilter(marketData);

  const onRowClicked = useCallback((event: any) => {
    console.log("Row Data: ", event.data);
  }, []);

  const onCellDoubleClicked = useCallback((event: any) => {
    setSelectedRowData(event.data);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRowData(null);
  };

  const showDetailsModal = useCallback((rowData: any) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  }, []);


  const rowSelection = useMemo<RowSelectionOptions | "single" | "multiple">(
    () => ({
      mode: "singleRow",
      checkboxes: false,
      enableClickSelection: true,
      enableSelectionWithoutKeys: true,
      enableRightClickSelection: true,
    }),
    []
  );

  const onCellContextMenu = useCallback((event: any) => {
    event.event.preventDefault();
    setContextMenu({
      mouseX: event.event.clientX,
      mouseY: event.event.clientY,
    });

    const clickedRowNode = event.node;
    if (gridRef.current && clickedRowNode) {
      gridRef.current.api.deselectAll();
      clickedRowNode.setSelected(true);
    }

    setSelectedRowData(clickedRowNode.data);
  }, []);

  const handleMenuClose = () => {
    setContextMenu(null);
  };

  const handleMenuOptionClick = (option: string) => {
    if (option === "View Details" && selectedRowData) {
      showDetailsModal(selectedRowData);
    } else {
      alert(`Option selected: ${option}`);
    }
    handleMenuClose();
  };

  const filteredData = useMemo(() => {
    return marketData.map(item => ({
      key: `${item.orderbook}`,
      label: item.filter_name
    }));
  }, [marketData]);

  return (
    <>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }} onContextMenu={handleContextMenu} >
        <div>
          <select
            value={selectedBoard}
            onChange={(e) => setSelectedBoard(e.target.value)}
          >
            <option value="">All Boards</option>
            {availableBoards.map((board) => (
              <option key={board} value={board}>
                {board}
              </option>
            ))}
          </select>
        </div>

        <ShortNameAutocomplete filteredData={filteredData}/>

        <div>
          <select
            id="theme-selector"
            value={theme}
            onChange={handleThemeChange}
            style={{ marginBottom: "20px", padding: "5px" }}
          >
            <option value="quartz">Quartz</option>
            <option value="material">Material</option>
            <option value="balham">Balham</option>
            <option value="alpine">Alpine</option>
          </select>
        </div>
      </div>
      <div
        className={`ag-theme-${theme}-dark`}
        style={{ height: 400, width: "100%" }}
        onContextMenu={handleContextMenu}
      >
        <AgGridReact
          ref={gridRef}
          rowData={marketData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressMenuHide={false}
          animateRows={false}
          headerHeight={35}
          rowHeight={30}
          rowSelection={rowSelection}
          allowShowChangeAfterFilter={true}
          onRowClicked={onRowClicked}
          pagination={false}
          paginationPageSize={50}
          onCellDoubleClicked={onCellDoubleClicked}
          onCellContextMenu={onCellContextMenu}
          preventDefaultOnContextMenu={true}
        />
      </div>

      {isModalOpen && (
        <CustomDialog
          title="Row Details"
          open={isModalOpen}
          onClose={handleCloseModal}
          isFullScreenButtonVisible
          maxWidth="sm"
          isDraggable
        >
          <div>
            {selectedRowData && (
              <pre>{JSON.stringify(selectedRowData, null, 2)}</pre>
            )}
          </div>
        </CustomDialog>
      )}

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
    </>
  );
};

export default MarketData;
