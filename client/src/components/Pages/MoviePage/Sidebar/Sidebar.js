import { Grid, Hidden, Typography } from "@material-ui/core";

import useStyles from "./styles.js";
import { useAuth } from "../../../../context/AuthContext.js";

const Sidebar = () => {
  const classes = useStyles();
  const { getLocalMovie } = useAuth();

  const movie = getLocalMovie();

  const commaAdder = (num) => {
    if (num) {
      return `$${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    } else return "-";
  };

  const companies = movie.production_companies.map((comp) => (
    <Typography
      key={comp.id}
      variant='body1'
      className={classes.companies_body}
    >
      {comp.name}
    </Typography>
  ));

  return (
    <Hidden mdDown>
      <Grid item md={3}>
        <div>
          <Typography variant='subtitle1' className={classes.subtitle}>
            <strong>Status</strong>
          </Typography>
          <Typography variant='body1' className={classes.body}>
            {movie.status ? movie.status : "-"}
          </Typography>
          <Typography variant='subtitle1' className={classes.subtitle}>
            <strong>Original Language</strong>
          </Typography>
          <Typography variant='body1' className={classes.body}>
            {movie.original_language ? movie.original_language : "-"}
          </Typography>
          <Typography variant='subtitle1' className={classes.subtitle}>
            <strong>Budget</strong>
          </Typography>
          <Typography variant='body1' className={classes.body}>
            {commaAdder(movie.budget)}
          </Typography>
          <Typography variant='subtitle1' className={classes.subtitle}>
            <strong>Revenue</strong>
          </Typography>
          <Typography variant='body1' className={classes.body}>
            {commaAdder(movie.revenue)}
          </Typography>
          <Typography variant='subtitle1' className={classes.subtitle}>
            <strong>Production Companies</strong>
          </Typography>
          {companies}
          <Typography variant='subtitle1' className={classes.subtitle}>
            <strong>Runtime</strong>
          </Typography>
          <Typography variant='body1' className={classes.body}>
            {movie.runtime ? `${movie.runtime} minutes` : "-"}
          </Typography>
        </div>
      </Grid>
    </Hidden>
  );
};

export default Sidebar;
