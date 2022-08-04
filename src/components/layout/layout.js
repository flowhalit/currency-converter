import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import {
  Autocomplete,
  TextField,
  Grid,
  Button,
  Backdrop,
  CircularProgress,
  styled,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import HistoryComponent from "../historyComponent";
import { useSymbol } from "./../../lib/hooks/symbolHooks";
import { Container } from "@mui/system";
import CurrencyComponent from "../currencyComponent";

const TitleH2 = styled("h2")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize:"xxx-large"
}));


const Layout = () => {
  const [items, setItems] = useSymbol();
  const [autoItems1, setAutoItems1] = useState({});
  const [autoItems2, setAutoItems2] = useState({});
  const [selected, setSelected] = useState("");
  const [autoSelected, setAutoSelected] = useState({});
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getToAutoComplete = (value = null) => {
    return Object.keys(items)
      .filter((x) => {
        if (value === null) {
          return true;
        }
        return items[x] !== value;
      })
      .map((item) => {
        return { label: items[item], value: item };
      });
  };
  useEffect(() => {
    setAutoItems1(getToAutoComplete(null));
    setAutoItems2(getToAutoComplete(null));
  }, [items]);

  return (
    <Container>
      <Grid
        container
        spacing={4}
        xs={12}
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          justifyContent="center"
          alignItems={"center"}
        >
          <TitleH2>Currency Converter</TitleH2>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <CurrencyComponent
            placeholder=""
            label="Currency"
            items={autoItems1}
            selected={selected}
            setSelected={(value,id) => {
              setSelected(value);
              setAutoItems2(getToAutoComplete(value));
              setAutoSelected({
                ...autoSelected,
                [0]:id
              })
            }}
          ></CurrencyComponent>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <CurrencyComponent
            placeholder=""
            label={selected ? selected + " to ..." : ""}
            items={autoItems2}
            selected={selected}
            setSelected={(value,id) => {
              setSelected(value);
              setAutoItems1(getToAutoComplete(value));
              setAutoSelected({
                ...autoSelected,
                [1]:id
              })
            }}
          ></CurrencyComponent>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Button
            onClick={handleToggle}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Convert
          </Button>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} mt={10}>
        <HistoryComponent></HistoryComponent>
      </Grid>
    </Container>
  );
};
export default Layout;
