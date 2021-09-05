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
  },
  cardMedia: {
    margin: "auto",
    padding: 57.5,
    height: 230,
    width: 145,
  },
  cardContent: {
    flexGrow: "1",
    height: 90,
  },
  heading: {
    marginTop: "30px",
    marginBottom: "10px",
  },
  imagelistContainer: { minHeight: "600px" },
}));
