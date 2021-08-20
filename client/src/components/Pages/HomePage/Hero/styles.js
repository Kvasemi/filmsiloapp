import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
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
    // backgroundColor: "rgba(0, 229, 255, 0.5)",
    backgroundImage:
      "linear-gradient(to right, rgba(4, 59, 86, 0.3) , rgba(22, 172, 220, 0.3))",
    boxShadow: "inset 0px 30px 100px #000000, inset 0px -30px 100px #000000",

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
  searchBar: {
    flexDirection: "row",
    margin: "auto",
  },
  searchButton: {
    borderTopRightRadius: "50px",
    borderBottomRightRadius: "50px",
  },
  input: {
    color: "grey",
    background: "rgb(232, 241, 250)",
    padding: "6px 0px 6px 10px",
    shrink: "true",
    borderTopLeftRadius: "20px",
    borderBottomLeftRadius: "20px",
    height: "36px",
    textDecoration: "none",
  },
}));
