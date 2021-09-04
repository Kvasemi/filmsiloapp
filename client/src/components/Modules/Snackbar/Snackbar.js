import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import { useAuth } from "../../../context/AuthContext";
import useStyles from "./styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function CustomizedSnackbars() {
  const classes = useStyles();
  const { alerts, snackbarOpen, snackbarCloseHandler } = useAuth();

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
