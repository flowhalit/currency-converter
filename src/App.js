import React, { useEffect } from "react";

import { Stack } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { getHistories, getListSymbolListAsync } from "./lib/store/currency";
import Layout from "./components/layout";
import { useDispatch } from "react-redux";
import { getHistories, getListSymbolListAsync } from "./lib/store/currency";

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    (async ()=>{
      dispatch(getListSymbolListAsync());
      dispatch(getHistories());     
    })()
  },[])
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={10}
      mt={10}
      mb={10}
    >
      <Layout />
    </Stack>
  );
}

export default App;
