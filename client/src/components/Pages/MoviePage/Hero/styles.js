import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  container: {
    padding: "0",
    margin: "0",
    marginTop: "70px",
    width: "100vw",
  },
  backgroundCard: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    "&:before": {
      position: "fixed",
    },
    webkitTransform: "translate3d(0,0,0)",
    // "@media (max-width: 412px)": {
    //   left: "60px",
    //   width: "100vw",
    // },
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
    "@media (max-width: 376px)": {
      margin: "auto 20px 0 20px",
    },
  },
  // cardMedia: { paddingTop: "56.25%", height: "400px" },
  textDiv: {
    margin: "50px 100px 0px 50px",
    "@media (max-width: 376px)": {
      margin: "auto 20px 0 20px",
    },
  },
  movieDetails: { color: "white" },
  text_container: {
    display: "inline-block",
    marginRight: "200px",
    "@media (max-width: 376px)": {
      margin: "auto",
      width: "200px",
    },
  },
  text: {
    color: "white",
  },
  text_names: {
    color: "white",
    "&:hover": {
      color: "rgba(223, 234, 255, 0.9)",
    },
    display: "inline-block",
    marginRight: "20px",
    marginBottom: "10px",
    cursor: "pointer",
    "@media (max-width: 376px)": {
      display: "inline-block",
      width: "110px",
      marginRight: "0px",
      marginBottom: "10px",
    },
  },
}));
