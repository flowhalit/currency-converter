import React from "react";

import PaymentsSharpIcon from "@mui/icons-material/PaymentsSharp";
import styled from "@emotion/styled";
import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { setStatusAction } from '../lib/store/actions/currencyActions';
import { selectSearch, selectStatus } from "../lib/store/selectors";
import { getConvertToMoneyActionAsync } from "../lib/store/currency";
import { setStatusAction } from "../lib/store/actions/currencyActions";

const PaymentButton = styled(Button)(() => {});

const BottomComponent = () => {
  const matches = useMediaQuery("(max-width:900px)");
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const search = useSelector(selectSearch);
  const handleToggle = () => {
    if (
      search.from === "" ||
      search.from === null ||
      search.to === "" ||
      search.to === null
    ) {
      dispatch(
        setStatusAction({
          message: "Please select money type",
          isShow: true,
        })
      );
    } else {
      dispatch(getConvertToMoneyActionAsync());
    }
  };
  const handleClose = () => {
    // dispatch(setStatusAction({loading:true}))
  };
  return (
    <Grid
      container={!matches}
      item={matches}
      xs={12}
      direction={{ xs: "column", md: "row" }}
      m={5}
      justifyContent={"center"}
    >
      <PaymentButton
        onClick={handleToggle}
        variant="contained"
        endIcon={<PaymentsSharpIcon fontSize="large" />}
      >
        Convert
      </PaymentButton>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={!status.loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};
export default BottomComponent;
