import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Hidden,
  Typography,
} from "@material-ui/core";

import { useAuth } from "../../../../context/AuthContext";
import useStyles from "./styles";

const Feed = () => {
  const classes = useStyles();
  const {
    getLocalMovieQueryList,
    getLocalPersonQueryList,
    movieToggleHandler,
    peopleToggleHandler,
    searchToggle,
    movieClickHandler,
    personClickHandler,
  } = useAuth();

  const movies = getLocalMovieQueryList();
  const people = getLocalPersonQueryList();

  const mappedMovieResults = movies.map((movie) => (
    <Grid item key={movie.id} xs={12}>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
        <Card
          className={classes.card}
          onClick={() => movieClickHandler(movie.id)}
        >
          <Hidden xsDown>
            <CardMedia
              className={classes.cardMedia}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title}
            />
          </Hidden>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component='h2' variant='h5'>
                {movie.title}
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                {movie.release_date}
              </Typography>
              <Typography variant='subtitle1' paragraph>
                {movie.overview}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </Link>
    </Grid>
  ));

  const mappedPeopleResults = people.map((person) => (
    <Grid item key={person.id} xs={12}>
      <Link to={`/person/${person.id}`} style={{ textDecoration: "none" }}>
        <Card
          className={classes.card}
          onClick={() => personClickHandler(person.id)}
        >
          <Hidden xsDown>
            <CardMedia
              className={classes.cardMedia}
              image={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              title={person.name}
            />
          </Hidden>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component='h2' variant='h5'>
                {person.name}
              </Typography>
              <Typography variant='subtitle1'>
                {person.known_for_department}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </Link>
    </Grid>
  ));

  return (
    <Grid container className={classes.mainContainer}>
      <div className={classes.toggleContainer}>
        <Button
          className={classes.moviesButton}
          variant='contained'
          color='primary'
          onClick={movieToggleHandler}
        >
          MOVIES
        </Button>
        <Button
          className={classes.peopleButton}
          variant='contained'
          color='primary'
          onClick={peopleToggleHandler}
        >
          PEOPLE
        </Button>
      </div>
      {!searchToggle ? mappedMovieResults : mappedPeopleResults}
    </Grid>
  );
};

export default Feed;
