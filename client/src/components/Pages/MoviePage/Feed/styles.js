import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  rootDiv: { margin: "50px", marginBottom: "0px" },
  castGridContainer: {
    height: "350px",
    marginBottom: "20px",
  },
  castGridItem: {
    overflow: "hidden",
  },
  imageList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    height: "350px",
  },
  linkContainer: {
    textDecoration: "none",
    maxWidth: "175px",
  },
  castCard: {
    margin: "10px 10px",
    width: "150px",
    height: "320px",
    cursor: "pointer",
    borderRadius: "7px",
    transition: "transform 250ms",
    "&:hover": {
      transform: "translateX(5px)",
    },
  },
  cardMedia: {
    margin: "auto",
    padding: 57.5,
    height: 210,
    width: 150,
  },
  cardContent: {
    flexGrow: "1",
    height: 90,
  },
  toggleContainer: {
    margin: "15px 0px 15px 10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "center",
  },
  reviewsButton: {
    padding: "15px",
    fontWeight: "bold",
    width: "145px",
  },
  formButton: {
    padding: "15px",
    fontWeight: "bold",
  },
  imagelistContainer: { minHeight: "650px" },
}));
