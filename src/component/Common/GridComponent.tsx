import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";
import { ColDef, GridOptions } from "ag-grid-community";

interface GridComponentProps {
  gridRef: RefObject<AgGridReact>;
  rowData: any[];
  columnDefs: ColDef[];
  defaultColDef?: ColDef;
  theme?: string;
  onRowClicked?: (event: any) => void;
  onCellDoubleClicked?: (event: any) => void;
  onCellContextMenu?: (event: any) => void;
  rowSelection?: GridOptions["rowSelection"];
  pagination?: boolean;
  paginationPageSize?: number;
  height?: string | number;
  width?: string | number;
}

const GridComponent = ({
  gridRef,
  rowData,
  columnDefs,
  defaultColDef = { sortable: true, filter: true },  // Default configuration
  theme = "material",
  onRowClicked,
  onCellDoubleClicked,
  onCellContextMenu,
  rowSelection = "single",
  pagination = false,
  paginationPageSize = 50,
  height = 400,
  width = "100%",
}: GridComponentProps) => (
  <div className={`ag-theme-${theme}-dark`} style={{ height, width }}>
    <AgGridReact
      ref={gridRef}
      rowData={rowData}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      suppressMenuHide={false}
      animateRows={true}
      headerHeight={35}
      rowHeight={30}
      rowSelection={rowSelection}
      allowShowChangeAfterFilter={true}
      onRowClicked={onRowClicked}
      onCellDoubleClicked={onCellDoubleClicked}
      onCellContextMenu={onCellContextMenu}
      preventDefaultOnContextMenu={true}
      pagination={pagination}
      paginationPageSize={paginationPageSize}
    />
  </div>
);

export default GridComponent;
 