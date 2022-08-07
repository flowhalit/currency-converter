/* eslint-disable react/prop-types */
import * as React from "react";
// import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
// import { useDispatch } from "react-redux";
import { Box, Grid } from "@mui/material";
// import { selectHistories } from "../../lib/store/selectors";
// import { getHistories } from "../../lib/store/currency";

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
export default function HistoryComponent({rows}) {
  // const dispatch=useDispatch()
  // React.useEffect(()=>{
  //   dispatch(getHistories());      
  // },[dispatch])

  return (
    <Grid container display={"flex"}>
      <Grid item xs={0} sm={1} md={2}></Grid>
      <Grid item xs={12} sm={11} md={9} maxHeight={"100%"}>
        <Box sx={{height:400}}>
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
      <Grid item xs={0} sm={0} md={2}></Grid>
    </Grid>
  );
}
