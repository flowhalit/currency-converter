import React from "react";
import PropTypes from 'prop-types';

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
import { selectSearch, selectStatus } from "../lib/store/selectors";
import { getConvertToMoneyActionAsync } from "../lib/store/currency";
import { setStatusAction } from "../lib/store/actions/currencyActions";

const PaymentButton = styled(Button)(() => {});
const CustomGrid = ({ matches,children}) => {
  if (matches) {
    return (
      <Grid
        item={matches}
        xs={12}
        m={5}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {children}
      </Grid>
    );
  } else {
    return (
      <Grid
        container={!matches}
        direction={{ xs: "column", md: "row" }}
        m={5}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {children}
      </Grid>
    );
  }
};
CustomGrid.propTypes = {
  children: PropTypes.node.isRequired,
  matches:PropTypes.bool
};
const BottomComponent = () => {
  const matches = useMediaQuery("(max-width:900px)");
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const search = useSelector(selectSearch);
  const handleToggle = async () => {
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
    dispatch(
      setStatusAction({
        message: "",
        isShow: false,
      })
    );
  };
  return (
    <CustomGrid matches={matches}>
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
    </CustomGrid>
  );
};
export default BottomComponent;
