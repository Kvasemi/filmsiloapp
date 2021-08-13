import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: "40px",
    padding: "0",
  },
  backgroundCard: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height: "400px",
  },
  outerLayer: {
    backgroundColor: "rgba(100, 181, 246,0.7)",
    height: "400px",
    position: "relative",
  },
  heroTextTitle: { color: "white", paddingTop: "50px" },
  heroTextSlogan: { color: "white" },
  searchContainer: {
    position: "absolute",
    width: "100%",
    bottom: "50px",
  },
  searchBar: { flexDirection: "row", color: "white" },
  input: {
    color: "white",
    background: "rgb(232, 241, 250)",
    paddingTop: "6px",
    shrink: "true",
  },
  searchButton: {},
}));
