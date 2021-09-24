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
    "&:before": {
      position: "fixed",
    },
    height: "400px",
    width: "100%",
    webkitTransform: "translate3d(0,0,0)",
  },
  outerLayer: {
    backgroundImage:
      "linear-gradient(to right, rgba(4, 59, 86, 0.3) , rgba(22, 172, 220, 0.3))",
    marginTop: "70px",
    boxShadow: "inset 0px 30px 100px #000000, inset 0px -30px 100px #000000",

    height: "400px",
    position: "relative",
  },
  heroTextTitle: {
    color: "white",
    paddingTop: "50px",
    "@media (max-width: 541px)": {
      fontSize: "70px",
    },
    "@media (max-width: 415px)": {
      fontSize: "60px",
    },
    "@media (max-width: 376px)": {
      fontSize: "50px",
    },
    "@media (max-width: 321px)": {
      fontSize: "40px",
    },
  },
  heroTextSlogan: {
    color: "white",
    margin: "15px 40px 15px 40px",
    "@media (max-width: 769px)": {
      fontSize: "30px",
    },
    "@media (max-width: 541px)": {
      fontSize: "20px",
    },
  },
  searchContainer: {
    position: "absolute",
    width: "100%",
    bottom: "50px",
    "@media (max-width: 376px)": {
      left: "60px",
      width: "70%",
    },
  },
  searchBar: {
    flexDirection: "row",
    margin: "auto",
  },
  form: {},
  input: {
    color: "grey",
    background: "rgb(232, 241, 250)",
    padding: "6px 0px 6px 10px",
    shrink: "true",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
    height: "36px",
    textDecoration: "none",
    width: "350px",
    "@media (max-width: 415px)": {
      width: "150px",
      marginLeft: "20px",
      display: "inline-block",
      color: "rgb(232, 241, 250)",
    },
    "@media (max-width: 376px)": {
      width: "150px",
      marginLeft: "20px",
      display: "inline-block",
      color: "rgb(232, 241, 250)",
    },
    "@media (max-width: 321px)": {
      width: "140px",
      marginLeft: "0px",
      display: "inline-block",
      color: "rgb(232, 241, 250)",
    },
    "@media (max-width: 281px)": {
      width: "100px",
      marginLeft: "0px",
      display: "inline-block",
      color: "rgb(232, 241, 250)",
    },
  },
  searchButton: {
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
    "@media (max-width: 412px)": {
      display: "inline-block",
    },
  },
}));
