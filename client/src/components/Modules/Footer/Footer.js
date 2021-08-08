import { Typography } from "@material-ui/core";

import useStyles from "./styles";

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant='h6' align='center' gutterBottom>
        FOOTER
      </Typography>
      <Typography variant='subtitle1' align='center' color='textSecondary'>
        Something here to give footer a purpose
      </Typography>
    </footer>
  );
};

export default Footer;
