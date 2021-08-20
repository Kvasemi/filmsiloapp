import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  rootDiv: { margin: "50px" },
  castGridContainer: {
    height: "350px",
    marginBottom: "20px",
  },
  castGridItem: {
    overflow: "hidden",
  },
  heading: { marginTop: "30px", marginBottom: "10px" },
  linkContainer: { textDecoration: "none", maxWidth: "175px" },
  imageList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    height: "350px",
  },
  castCard: {
    margin: "10px 10px",
    width: "150px",
    height: "320px",
  },
  cardMedia: {
    margin: "auto",
    padding: 57.5,
    height: 230,
    width: 145,
  },
  cardContent: { height: 90 },
}));
