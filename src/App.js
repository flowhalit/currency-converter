import React, { useEffect } from "react";
import { Helmet } from "react-helmet";


import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Stack
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getListSymbolListAsync } from "./lib/store/currency";
import Layout from "./components/layout";

const theme = createTheme();

function App() {
 const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getListSymbolListAsync());
  },[])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <link
          rel="stylesheet"
          href={
            "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          }
        />
      </Helmet>
      <>
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
      </>
    </ThemeProvider>
  );
}

export default App;
