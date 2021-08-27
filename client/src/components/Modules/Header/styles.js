import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    overflow: "hidden",
    height: "70px",
    backgroundColor: "rgba(3, 34, 56, 0.8)",
  },
  headerContainer: { display: "flex", justifyContent: "space-between" },
  image: {
    marginLeft: "15px",
    marginTop: "20px",
  },
  loginIcon: { marginRight: "20px" },
  list: {
    width: 450,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
