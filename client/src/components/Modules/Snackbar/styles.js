import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  snackbar_container: {
    width: "0%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
