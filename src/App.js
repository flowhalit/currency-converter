import React from "react";
import Paper from "@mui/material/Paper";
import SendIcon from "@mui/icons-material/Send"
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
} from "@mui/material";
import { useSymbol } from "./lib/hooks/symbolHooks";
import { Container } from "@mui/system";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function App() {
  const [items, setItems] = useSymbol();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Item> </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Object.keys(items).map((item) => {
                  return { label: items[item], value: item };
                })}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Currencies" />
                )}
              />
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Object.keys(items).map((item) => {
                  return { label: items[item], value: item };
                })}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Currencies" />
                )}
              />
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              <Button variant="contained" endIcon={<SendIcon />}>
                Convert
              </Button>
            </Item>
          </Grid>
        </Grid>
      </>
    </ThemeProvider>
  );
}

export default App;
