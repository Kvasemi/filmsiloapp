import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    padding: "0",
    backgroundColor: theme.palette.background.paper,
    margin: "0",
    width: "100vw",
  },
  gridContainer: {
    background: "rgba(200,200,200,0.4)",
  },
  card: {
    height: "100%",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    margin: "30px",
  },
  cardMedia: { paddingTop: "56.25%", height: 325 },
  details: {
    marginTop: "80px",
  },
}));
