import React, { Children } from "react";
import Paper from "@mui/material/Paper";
import { Helmet } from "react-helmet";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Autocomplete,
  TextField,
  Grid,
  ListItem,
  styled,
  Button,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useSymbol } from "./lib/hooks/symbolHooks";

import Layout from "./components/layout/layout";

const theme = createTheme({
  // palette: {
  //   primary: {
  //     light: '#63b8ff',
  //     main: '#0989e3',
  //     dark: '#005db0',
  //     contrastText: '#000',
  //   },
  //   secondary: {
  //     main: '#4db6ac',
  //     light: '#82e9de',
  //     dark: '#00867d',
  //     contrastText: '#000',
  //   },
  // },
});

function App() {
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
          <Layout></Layout>
        </Stack>
      </>
    </ThemeProvider>
  );
}

export default App;
