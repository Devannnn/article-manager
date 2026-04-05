// Libraries
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Article } from "../../constants/types";

interface TableauProps {
  data: Article[];
  columns: GridColDef[];
}

/***
 * The goal of this component is to render a data grid using the DataGrid component
 * from the Material-UI library. The component takes in data and columns as props,
 * which represent the rows and columns of the data grid, respectively.
 */
function DataTable({ data, columns }: Readonly<TableauProps>) {
  return (
    <div className="min-h-[420px] bg-white dark:bg-slate-900">
      <DataGrid
        className="app-data-grid"
        rows={data}
        columns={columns}
        getRowHeight={() => "auto"}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            printOptions: { disableToolbarButton: false },
            csvOptions: { disableToolbarButton: true },
            showQuickFilter: true,
          },
        }}
        hideFooter
        sx={{ border: 0 }}
      />
    </div>
  );
}

// Exportation
export default DataTable;
