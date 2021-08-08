import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: "70px",
  },
  search: { marginTop: "40px" },
  form: { display: "flex" },
  searchBar: { flexDirection: "column" },
}));
