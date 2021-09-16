import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Hidden,
  Typography,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import { useAuth } from "../../../../context/AuthContext";
import useStyles from "./styles";
import Footer from "../../../Modules/Footer/Footer";
import missingMovie from "../../../../images/missing.png";
import missingPerson from "../../../../images/person.png";

const Feed = () => {
  const classes = useStyles();
  const {
    getLocalMovieQueryList,
    getLocalPersonQueryList,
    showMovieResultsHandler,
    showPersonResultsHandler,
    movieClickHandler,
    personClickHandler,
    formatDate,
    showMovieOrPersonResults,
  } = useAuth();

  const movies = getLocalMovieQueryList();
  const people = getLocalPersonQueryList();

  const movieDetails = (movie, num) => {
    if (movie.overview.length > num) {
      return (
        <Typography
          className={classes.details}
          style={{
            marginTop: "10px",
            marginRight: "20px",
          }}
          variant='subtitle1'
          paragraph
        >
          {movie.overview.slice(0, num)}...
        </Typography>
      );
    } else
      return (
        <Typography
          className={classes.details}
          style={{
            marginTop: "10px",
            marginRight: "20px",
          }}
          variant='subtitle1'
          paragraph
        >
          {movie.overview}
        </Typography>
      );
  };

  const mappedMovieList = (personProp) => {
    const moviesKnownFor = personProp.known_for.filter(
      (movie) => movie.media_type === "movie"
    );
    return moviesKnownFor.map((movie) => (
      <Typography
        key={movie.id}
        style={{
          display: "inline-block",
          marginTop: "10px",
          marginRight: "20px",
        }}
        className={classes.movie_title}
        variant='body1'
        onClick={() => movieClickHandler(movie.id)}
        gutterBottom
      >
        <strong>{movie.title}</strong>
      </Typography>
    ));
  };

  const mappedMovieResults = movies.map((movie) => (
    <Grid item key={movie.id} xs={12}>
      <Card className={classes.card_movie}>
        <Hidden xsDown>
          <CardMedia
            className={classes.card_media}
            image={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : missingMovie
            }
            title={movie.title}
          />
        </Hidden>
        <div className={classes.detail_container}>
          <CardContent>
            <Typography
              component='h2'
              variant='h5'
              onClick={() => movieClickHandler(movie.id)}
              className={classes.movie_title}
            >
              <strong>{movie.title}</strong>
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {movie.release_date && formatDate(movie.release_date)}
            </Typography>
            {movieDetails(movie, 60)}
          </CardContent>
        </div>
      </Card>
    </Grid>
  ));

  const mappedPeopleResults = people.map((person) => (
    <Grid item key={person.id} xs={12}>
      <Card className={classes.card_person}>
        <Hidden xsDown>
          <CardMedia
            className={classes.card_media}
            image={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                : missingPerson
            }
            title={person.name}
          />
        </Hidden>
        <div className={classes.detail_container}>
          <CardContent>
            <Typography
              className={classes.movie_title}
              component='h2'
              variant='h5'
              onClick={() => personClickHandler(person.id)}
            >
              <strong>{person.name}</strong>
            </Typography>
            <Typography
              className={classes.details}
              variant='subtitle1'
              color='textSecondary'
              paragraph
            >
              {person.known_for_department}
            </Typography>
            {mappedMovieList(person)}
          </CardContent>
        </div>
      </Card>
    </Grid>
  ));

  return (
    <>
      <div className={classes.root_container}>
        <Grid container className={classes.grid_container}>
          <ToggleButtonGroup exclusive className={classes.toggle_container}>
            <ToggleButton
              className={classes.movie_button}
              onClick={showMovieResultsHandler}
            >
              MOVIES
            </ToggleButton>
            <ToggleButton
              className={classes.person_button}
              onClick={showPersonResultsHandler}
            >
              PEOPLE
            </ToggleButton>
          </ToggleButtonGroup>
          {!showMovieOrPersonResults && movies.length > 0
            ? mappedMovieResults
            : mappedPeopleResults}
        </Grid>
      </div>
      <div className={classes.footer}>
        <Footer />
      </div>
    </>
  );
};

export default Feed;
