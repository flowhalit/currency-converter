import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
// import {selectHistoryRows} from './../../lib/store/history'
import { selectHistories } from "../../lib/store/selectors";
import { getHistories } from "../../lib/store/currency";

const columns = [
  {
    field: 'timestamps',
    headerName: 'Converting Date',
    width: 200,
      
    valueGetter: (params) =>`${params.row.date || ''}`,

  },
  {
    field: 'amount',
    headerName: 'Amount ',
    width: 150,
    valueGetter: (params) =>`${params.row.amount || ''} ${params.row.from || ''}`,
  },
  {
    field: 'totalAmount',
    headerName: 'Converted Amount',
    width: 150,
    valueGetter: (params) =>`${params.row.totalAmount || ''} ${params.row.to || ''}`,
  }
];
export default function DataGridDemo() {
  const dispatch=useDispatch()
  const rows = useSelector(selectHistories)
  React.useEffect(()=>{
    dispatch(getHistories());
  },[])
  return (
    <Grid container xs={8}>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
           disableExtendRowFullWidth
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          
          disableSelectionOnClick
          disableIgnoreModificationsIfProcessingProps
        />
      </Box>
    </Grid>
  );
}
