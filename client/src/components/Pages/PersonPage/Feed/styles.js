import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  cardGrid: { padding: "20px 0", minWidth: "300" },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  },
  cardMedia: { paddingTop: "56.25%", height: 225 },
  cardContent: { flexGrow: "1", height: 60 },
}));
