import { alpha, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    height: "70px",
    backgroundColor: "rgba(30, 34, 56, 0.8)",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  image: {
    marginLeft: "15px",
    marginTop: "0px",
    height: "70px",
    width: "150px",
    backgroundSize: "9600px 100%",
    webkitFilter: "grayscale(100%)",
    filter: "grayscale(100%)",
    webkitTransition: ".3s ease-in-out",
    transition: ".3s ease-in-out",
    "&:hover": {
      webkitFilter: "grayscale(0)",
      filter: "grayscale(0)",
    },
  },
  loggedInName: {
    display: "inline-block",
    marginTop: "0px",
    marginRight: "10px",
  },
  logOutButton: {
    display: "inline-block",
    color: "white",
    marginBottom: "0px",
    marginRight: "20px",
  },
  loginIcon: { marginRight: "0px", marginBottom: "2px" },
  loginIconLoggedIn: {
    marginRight: "0px",
    marginBottom: "2px",
    color: "blue",
  },
  list: {
    width: 450,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
