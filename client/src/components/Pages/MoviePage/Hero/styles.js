import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  container: {
    padding: "0",
    margin: "0",
    width: "100vw",
  },
  gridContainer: {
    background: "rgba(0,0,0,0.8)",
    display: "flex",
  },
  image: {
    flexShrink: "0",
    marginTop: "50px",
    marginBottom: "15px",
    marginLeft: "100px",
    width: "300px",
    height: "450px",
    borderRadius: "10px",
    boxShadow: "10px 5px 5px rgba(0, 0, 0, .2)",
  },
  cardMedia: { paddingTop: "56.25%", height: "400px" },
  textDiv: {
    margin: "50px 100px 0px 50px",
  },
  movieDetails: { color: "white" },
  text_container: { display: "inline-block", marginRight: "200px" },
  text: {
    color: "white",
  },
  text_names: {
    color: "white",
    "&:hover": {
      color: "rgba(223, 234, 255, 0.9)",
    },
  },
}));
