import React from "react";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";

import useMediaQuery from "@mui/material/useMediaQuery";

import { Grid, IconButton, Stack } from "@mui/material";
import HistoryComponent from "./history/historyComponent";
import { Container } from "@mui/system";
import CurrencyComponent from "./currency/currencyComponent";
import FormattedInputs from "./currency/numbericComponent";
import TopComponent from "./top";
import BottomComponent from "./bottom";
import { getConvertToMoneyActionAsync, selectFromSymbols, selectResult, selectSearch, selectSearchText, selectToSymbols } from "../lib/store/currency";
import { useDispatch, useSelector } from "react-redux";
import { setAmountAction, setSearchFromAction, setSearchToAction,setStatusAction,setSwapAction } from "../lib/store/actions/currencyActions";
import CustomSnackBarComponent from "./customSnackBarComponent";

const Layout = () => {
  const dispatch=useDispatch();
  const matches = useMediaQuery("(max-width:900px)");
  const fromSymbols =useSelector(selectFromSymbols);
  const toSymbols =useSelector(selectToSymbols);
  const searchText = useSelector(selectSearchText)
  const search = useSelector(selectSearch)
  const result = useSelector(selectResult)

  const onSwapChange = () => {
    if(search.from ==="" || search.from===null || search.to==="" ||search.to===null){
        dispatch(setStatusAction({
          message:"Please select money type",
          isShow:true
        }))
    }else{
      dispatch(setSwapAction(null))
      dispatch(getConvertToMoneyActionAsync())
    }
  };
  return (
    <Container>
      <Grid
        container
        xs={12}
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        <TopComponent/>
        <Grid
          container
          justifyContent="center"
          alignItems={"center"}
          xs={12}
          direction={{ xs: "column", md: "row" }}
        >
          <Stack direction={{ xs: "column", md: "row" }}>
            <CurrencyComponent
              action={setSearchFromAction}
              value={searchText.from}
              placeholder=""
              label="From"
              items={fromSymbols}
            ></CurrencyComponent>
            {!matches && (
              <IconButton
                aria-label="exchange"
                color="primary"
                onClick={()=>onSwapChange()}
              >
                <SwapHorizontalCircleIcon
                  style={{ fontSize: "xxx-large" }}
                ></SwapHorizontalCircleIcon>
              </IconButton>
            )}
            <CurrencyComponent
              action={setSearchToAction}
              value={searchText.to}
              placeholder=""
              label="To"
              items={toSymbols}
            ></CurrencyComponent>
            {matches && (
              <IconButton aria-label="exchange" color="primary"  onClick={()=>onSwapChange()}>
                <SwapHorizontalCircleIcon
                  style={{ fontSize: "xxx-large" }}
                ></SwapHorizontalCircleIcon>
              </IconButton>
            )}
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }}>
            <FormattedInputs
              label={search.from}
              value={search.amount}
              onChange={(value) => {
                if(value){
                  dispatch(setAmountAction(parseFloat(value)))
                }
                else{
                  dispatch(setAmountAction(0))
                }
              }}
            />
            {!matches && (
              <IconButton
                aria-label="exchange"
                color="primary"
                style={{ visibility: "hidden" }}
                onClick={()=>onSwapChange()}
              >
                <SwapHorizontalCircleIcon
                  style={{ fontSize: "xxx-large" }}
                ></SwapHorizontalCircleIcon>
              </IconButton>
            )}
            <FormattedInputs
              label={search.to}
              value={result.totalAmount}
              disabled={true}
              onChange={() => {
                // setNumber2(value);
              }}
            />
          </Stack>
        </Grid>
        <BottomComponent></BottomComponent>
        <HistoryComponent></HistoryComponent>
        <CustomSnackBarComponent />
      </Grid>
    </Container>
  );
};
export default Layout;
