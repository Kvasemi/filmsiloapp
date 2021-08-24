import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: { margin: "auto", maxWidth: "1600px" },
  toggleContainer: {
    margin: "15px 0px 15px 10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "center",
  },
  card: {
    height: "100%",
    width: "100%",

    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    boxShadow: "10px 5px 5px rgba(0, 0, 0, .2)",
  },
  cardMedia: {
    paddingTop: "56.25%",
    height: "250px",
    [theme.breakpoints.down("sm")]: {
      height: "450px",
    },
  },
  cardContent: { flexGrow: "1", height: 60, underline: "none" },
  popularButton: { padding: "15px", fontWeight: "bold" },
  upcomingButton: { padding: "15px", fontWeight: "bold" },
}));
