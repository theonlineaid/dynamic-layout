import { useState, useMemo, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { useMarket } from "../../context/MarketContext";
import { useBoardFilter } from "../../hooks/useBoardFilter";
import { columnDefs, defaultColDef } from "./MarketUtils";
import CustomDialog from "../Modal/CustomDialog";
import { RowSelectionOptions } from "ag-grid-community";
import InstrumentSearch from "./InstruementSelect";
import { ControlledMenu, MenuItem } from '@szhsin/react-menu';


const MarketData = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [selectedShortName, setSelectedShortName] = useState<string | null>(null);
  const { marketData } = useMarket();
  const gridRef = useRef<AgGridReact>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<string>("material"); // Default theme

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  const {
    filteredData,
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


  const filteredGridData = useMemo(() => {
    if (!selectedShortName) return filteredData;
    return filteredData.filter(
      (data) => data.short_name === selectedShortName
    );
  }, [filteredData, selectedShortName]);

  const handleShortNameChange = (selectedOption: any) => {
    setSelectedShortName(selectedOption ? selectedOption.value : null);
  };

  const rowSelection = useMemo<RowSelectionOptions | "single" | "multiple">(
    () => ({
      mode: "singleRow",
      checkboxes: false,
      enableClickSelection: true,
      enableSelectionWithoutKeys: true,
      enableRightClickSelection: true
    }),
    []
  );
  
  const onCellContextMenu = useCallback((event: any) => {
    const clickedRowNode = event.node;
    if (gridRef.current && clickedRowNode) {
      gridRef.current.api.deselectAll();
      clickedRowNode.setSelected(true);
    }

    // Set the selected row data for the menu
    setSelectedRowData(clickedRowNode.data);
    setMenuPosition({ x: event.event.clientX, y: event.event.clientY });
    setIsMenuOpen(true);
    event.event.preventDefault();
  }, []);

  const handleMenuOptionClick = (option: string) => {
    if (option === "View Details" && selectedRowData) {
      showDetailsModal(selectedRowData);
    } else {
      alert(`Option selected: ${option}`);
    }
    setIsMenuOpen(false);
  };
  

  return (
    <>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }} >
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

        <div style={{ minWidth: "200px" }}>
          <InstrumentSearch
            marketData={marketData} // Pass marketData as a prop
            onChange={handleShortNameChange}
            placeholder="Search or Select..."
          />
        </div>

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
      >
        <AgGridReact
          ref={gridRef}
          rowData={filteredGridData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressMenuHide={false}
          animateRows={false}
          headerHeight={35}
          rowHeight={30}
          // rowBuffer={300}
          rowSelection={rowSelection}
          allowShowChangeAfterFilter={true}
          onRowClicked={onRowClicked}
          pagination={false}
          paginationPageSize={50}
          onCellDoubleClicked={onCellDoubleClicked}
          preventDefaultOnContextMenu={true}
          onCellContextMenu={onCellContextMenu} // Add right-click handler
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

      <ControlledMenu
        anchorPoint={menuPosition}
        state={isMenuOpen ? "open" : "closed"}
        onClose={() => setIsMenuOpen(false)}
        menuStyle={{
          cursor: 'move',
          userSelect: 'none',
        }}
        onMouseDown={(e) => {
          const menu = e.currentTarget;
          const startX = e.clientX - menu.offsetLeft;
          const startY = e.clientY - menu.offsetTop;
          const onMouseMove = (e: any) => {
            menu.style.left = `${e.clientX - startX}px`;
            menu.style.top = `${e.clientY - startY}px`;
          };

          const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          };

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        }}
      >
        <MenuItem disabled>
          {selectedRowData?.full_name || "No name available"}
        </MenuItem>
        <MenuItem onClick={() => handleMenuOptionClick("Edit")}>Edit</MenuItem>
        <MenuItem onClick={() => handleMenuOptionClick("Delete")}>Delete</MenuItem>
        <MenuItem onClick={() => handleMenuOptionClick("View Details")}>View Details</MenuItem>
      </ControlledMenu>
    </>
  );
};

export default MarketData;
