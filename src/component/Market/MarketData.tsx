import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react"; 
import { useMarket } from "../../context/MarketContext";
import { useBoardFilter } from "../../hooks/useBoardFilter";
import { columnDefs, defaultColDef } from "./MarketUtils";
import CustomDialog from "../Modal/CustomDialog";
import { RowSelectionOptions } from "ag-grid-community";
import InstrumentSearch from "./InstruementSelect";

const MarketData = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [selectedShortName, setSelectedShortName] = useState<string | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedInstrument, setSelectedInstrument] = useState<any>(null);

  const { marketData } = useMarket();
  const gridRef = useRef<AgGridReact>(null);

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

  // Handle the context menu (right-click) event
  const handleContextMenu = (event: any) => {
    // Ensure that mouseEvent exists
    const { mouseEvent, data, node, api } = event;
    
    if (mouseEvent) {
      // Prevent the default browser context menu
      mouseEvent.preventDefault(); // Prevent the default browser right-click menu
      
      const { clientX, clientY } = mouseEvent; // Access the mouse position
  
      // Set the row data and context menu position
      setSelectedRowData(data); // Set the selected row data
      setSelectedInstrument(data); // Set the selected instrument for custom menu
      setContextMenuPosition({ x: clientX, y: clientY }); // Set position for the menu
  
      // Manually select the row on right-click
      if (api) {
        api.deselectAll(); // Deselect any previously selected rows
        node.setSelected(true); // Select the row that was right-clicked
      }
    } else {
      // Handle the case where mouseEvent is not available (optional fallback logic)
      console.warn('mouseEvent is undefined in contextMenu event');
    }
  };
  


  // Hide context menu when clicking outside
  const handleClickOutside = (event: any) => {
    if (contextMenuPosition && !event.target.closest('.context-menu')) {
      setContextMenuPosition(null); // Close the context menu
    }
  };

  // Attach event listener for clicking outside
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenuPosition]);

  return (
    <>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
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
      </div>

      <div
        className="ag-theme-balham"
        style={{ height: 400, width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={filteredGridData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressMenuHide={false}
          animateRows={false}
          headerHeight={54}
          rowHeight={30}
          rowBuffer={100}
          suppressColumnVirtualisation={true}
          rowSelection={rowSelection}
          allowShowChangeAfterFilter={true}
          onRowClicked={onRowClicked}
          pagination={false}
          paginationPageSize={50}
          onCellDoubleClicked={onCellDoubleClicked}
          preventDefaultOnContextMenu={true}
          onCellContextMenu={handleContextMenu} // Corrected handler
        />
      </div>

      {/* Custom Context Menu */}
      {contextMenuPosition && selectedInstrument && (
        <div
          className="context-menu"
          style={{
            position: "absolute",
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
            background: "white",
            border: "1px solid #ccc",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 9999,
            padding: "10px",
            minWidth: "150px",
            borderRadius: "5px",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <button
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  textAlign: "left",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => console.log("Option 1 selected")}
              >
                Option 1
              </button>
            </li>
            <li>
              <button
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  textAlign: "left",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => console.log("Option 2 selected")}
              >
                Option 2
              </button>
            </li>
            <li>
              <button
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  textAlign: "left",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => console.log("Option 3 selected")}
              >
                Option 3
              </button>
            </li>
            <li>
              <button
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  textAlign: "left",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => {
                  console.log("View Row Data: ", selectedInstrument);
                  setContextMenuPosition(null); // Close menu after action
                }}
              >
                View Row Data
              </button>
            </li>
          </ul>
        </div>
      )}

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
    </>
  );
};

export default MarketData;
