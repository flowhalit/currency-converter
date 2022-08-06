import React from 'react';

import PaymentsSharpIcon from "@mui/icons-material/PaymentsSharp";
import styled from '@emotion/styled';
import { Backdrop, Button, CircularProgress, Grid, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectOpen } from '../lib/store/currency';
import { setStatusAction } from '../lib/store/actions/currencyActions';

const PaymentButton = styled(Button)(() => {});



const BottomComponent = ()=>{
    const matches = useMediaQuery('(max-width:900px)');
    const dispatch = useDispatch();
    const open = useSelector(selectOpen);
    const handleToggle = () => {
      dispatch(setStatusAction({open:!open}))
    };
    const handleClose = () => {
      dispatch(setStatusAction({open:false}))
    };
    return(
        <Grid container={!matches} item={matches} xs={12} direction={{ xs: "column", md: "row" }} m={5} justifyContent={"center"}>
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
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Grid>
    )
}
export default BottomComponent