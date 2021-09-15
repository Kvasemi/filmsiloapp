import { Snackbar } from "@material-ui/core";

import { useAuth } from "../../../context/AuthContext";
import useStyles from "./styles";
import Alert from "./Alert";

export default function CustomizedSnackbars() {
  const classes = useStyles();
  const { alerts, setSnackbarOpen, snackbarOpen } = useAuth();

  const snackbarCloseHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className={classes.root}>
      {alerts === "success" ? (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={snackbarCloseHandler}
          className={classes.snackbar}
        >
          <Alert onClose={snackbarCloseHandler} severity='success'>
            Success!
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={snackbarCloseHandler}
          className={classes.snackbar}
        >
          <Alert onClose={snackbarCloseHandler} severity='error'>
            There was an error!
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
