import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  mainContainer: {
    margin: "auto",
    width: "80vw",
  },
  card: {
    display: "flex",
    margin: "20px",
    marginTop: "0px",
    height: "250px",
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
  moviesButton: { marginRight: "5px" },
  peopleButton: { marginLeft: "5px" },
}));
