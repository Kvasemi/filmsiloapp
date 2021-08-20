import { Grid, Hidden, Typography } from "@material-ui/core";

import useStyles from "./styles.js";
import { useAuth } from "../../../../context/AuthContext.js";

const Sidebar = () => {
  const classes = useStyles();
  const { formatDate, getLocalPerson } = useAuth();

  const person = getLocalPerson();

  const names = person.also_known_as.map((name) => (
    <Typography
      key={name.indexOf()}
      variant='body1'
      className={classes.names_body}
    >
      {name}
    </Typography>
  ));

  return (
    <Hidden mdDown>
      <Grid item md={3}>
        <div>
          <Typography variant='subtitle1' className={classes.subtitle}>
            <strong>Known For</strong>
          </Typography>
          <Typography variant='body1' className={classes.body}>
            {person.known_for_department}
          </Typography>
          <Typography variant='subtitle1' className={classes.subtitle}>
            <strong>Birthday</strong>
          </Typography>
          <Typography variant='body1' className={classes.body}>
            {formatDate(person.birthday)}
          </Typography>
          <Typography variant='subtitle1' className={classes.subtitle}>
            <strong>Place Of Birth</strong>
          </Typography>
          <Typography variant='body1' className={classes.body}>
            {person.place_of_birth}
          </Typography>
          <Typography variant='subtitle1' className={classes.subtitle}>
            <strong>Also Known As</strong>
          </Typography>
          {names}
        </div>
      </Grid>
    </Hidden>
  );
};

export default Sidebar;
