import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root_container: { minHeight: "550px" },
  grid_container: {
    margin: "auto",
    marginTop: "70px",
    width: "80vw",
  },
  toggle_container: {
    marginTop: "15px",
    marginBottom: "15px",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "center",
  },
  card_movie: {
    display: "flex",
    margin: "20px",
    marginTop: "0px",
    width: "100%",
    height: "200px",
    borderRadius: "10px",
    boxShadow: "10px 5px 5px rgba(0, 0, 0, .2)",
  },
  card_person: {
    display: "flex",
    margin: "20px",
    marginTop: "0px",
    width: "100%",
    height: "200px",
    border: 0,
  },
  card_media: {
    minWidth: "135px",
  },
  details: { marginTop: "0px" },
  movie_button: {
    padding: "15px",
    fontWeight: "bold",
  },
  person_button: {
    padding: "15px",
    fontWeight: "bold",
  },
  footer: { width: "100vw" },
  movie_title: {
    "&:hover": {
      color: "rgba(223, 234, 255, 0.9)",
    },
    cursor: "pointer",
    width: "fit-content",
  },
}));
