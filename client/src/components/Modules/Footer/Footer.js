import { Typography } from "@material-ui/core";

import useStyles from "./styles";
import Snackbar from "../Snackbar/Snackbar";

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Snackbar />
      <Typography variant='subtitle1' align='center' color='textSecondary'>
        Copyright © Film Silo 2021.
      </Typography>
    </footer>
  );
};

export default Footer;
