import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  div: {
    minWidth: "100vw",
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: "40px",
    padding: "0",
  },
  heroTextTitle: { color: "white", paddingTop: "50px" },
  heroTextSlogan: { color: "white" },
  search: { marginTop: "40px" },
  form: { display: "flex" },
  searchBar: { flexDirection: "row", color: "white" },
}));
