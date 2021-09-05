import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    padding: "0",
    backgroundColor: theme.palette.background.paper,
    margin: "0",
    marginTop: "70px",
    width: "100vw",
    display: "flex",
  },
  image: {
    top: "50%",
    flexShrink: "0",
    marginTop: "50px",
    marginLeft: "100px",
    width: "300px",
    height: "450px",
    borderRadius: "10px",
    boxShadow: "10px 5px 5px rgba(0, 0, 0, .2)",
  },
  textDiv: {
    margin: "50px 100px 0px 50px",
  },
  biographyText: { marginBottom: "15px" },
  cardMedia: { paddingTop: "56.25%", height: 325 },
  details: {
    marginTop: "30px",
  },
  showButton: { display: "block", margin: "20px 20px 20px 0px" },
}));
