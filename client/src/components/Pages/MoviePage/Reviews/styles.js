import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainContainer: {
    margin: "auto",
    width: "100%",
  },
  item: { width: "100%" },
  card: {
    display: "flex",
    margin: "auto",
    marginTop: "20px",
    marginBottom: "20px",
    height: "300px",
    width: "50%",
    borderRadius: "10px",
    boxShadow: "10px 5px 5px rgba(0, 0, 0, .2)",
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
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
