import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainContainer: {
    margin: "auto",
    width: "100%",
  },
  item: { width: "100%" },
  card: {
    display: "flex",
    margin: "20px 10px 20px 10px",
    height: "200px",
  },
  cardDetails: {
    flex: 1,
    margin: "0px",
    width: "100%",
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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
