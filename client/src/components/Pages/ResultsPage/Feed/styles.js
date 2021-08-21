import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainContainer: {
    margin: "auto",
    width: "80vw",
  },
  card: {
    display: "flex",
    margin: "20px",
    marginTop: "0px",
    height: "250px",
    borderRadius: "10px",
    boxShadow: "10px 5px 5px rgba(0, 0, 0, .2)",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: "175px",
  },
  toggleContainer: {
    marginTop: "15px",
    marginBottom: "15px",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "center",
  },
  paragraph: { marginTop: "20px" },
  moviesButton: {
    padding: "15px",
    fontWeight: "bold",
  },
  peopleButton: {
    padding: "15px",
    fontWeight: "bold",
  },
}));
