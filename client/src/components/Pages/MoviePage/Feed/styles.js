import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  rootDiv: { margin: "50px" },
  castGridContainer: {
    height: "350px",
    marginBottom: "20px",
  },
  castGridItem: {
    display: "flex",
    overflow: "hidden",
  },
  imageList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  castCard: {
    margin: "10px 10px",
    minWidth: "150px",
    maxHeight: "500px",
  },
  cardMedia: {
    margin: "auto",
    padding: 57.5,
    height: 230,
    width: 145,
  },
  cardContent: { flexGrow: "1", height: 90 },
}));
