import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  rootDiv: { margin: "50px" },
  castGridContainer: {
    height: "100%",
    marginBottom: "20px",
  },
  castGridItem: {
    display: "flex",
    overflow: "hidden",
  },
  imageList: { flexWrap: "nowrap", transform: "translateZ(0)" },
  castCard: {
    margin: "10px 10px",
    minWidth: "125px",
    minHeight: "290px",
  },
  cardMedia: {
    padding: 57.5,
    height: 60,
    width: 10,
  },
  cardContent: { flexGrow: "1", height: 60 },
}));
