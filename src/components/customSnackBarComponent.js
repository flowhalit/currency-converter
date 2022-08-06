import { Snackbar, Stack } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatusAction } from "../lib/store/actions/currencyActions";
import { selectStatus } from "../lib/store/selectors";
import Fade from "@mui/material/Fade";
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackBarComponent() {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const handleClose = () => {
    dispatch(
      setStatusAction({
        message: "",
        isShow: false,
      })
    );
  };
  const action = (
    <Stack
      spacing={2}
      sx={{ width: "100%" }}
      display={"flex"}
      position={"absolute"}
      left={0}
    >
      <Alert severity="error">{status.message}</Alert>
    </Stack>
  );
  return (
    <Snackbar
      TransitionComponent={Fade}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={status.isShow}
      autoHideDuration={6000}
      onClose={handleClose}
      // message={status.message}
      action={action}
    />
  );
}
