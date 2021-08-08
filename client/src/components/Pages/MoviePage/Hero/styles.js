import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  container: { padding: "0", margin: "0", width: "100vw" },
  gridContainer: {
    background: "rgba(0,0,0,0.8)",
  },
  card: {
    height: "100%",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    margin: "30px",
  },
  cardMedia: { paddingTop: "56.25%", height: 325 },
  details: {
    marginTop: "80px",
  },
  movieDetails: { color: "white" },
}));
