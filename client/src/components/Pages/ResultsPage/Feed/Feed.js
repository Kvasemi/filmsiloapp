import { Link } from "react-router-dom";
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
              image={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : missingMovie
              }
              title={movie.title}
            />
          </Hidden>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component='h2' variant='h5'>
                {movie.title}
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                {movie.release_date && formatDate(movie.release_date)}
              </Typography>
              <Typography
                variant='subtitle1'
                className={classes.paragraph}
                paragraph
              >
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
              image={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                  : missingPerson
              }
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
    <>
      <div className={classes.imagelistContainer}>
        <Grid container className={classes.mainContainer}>
          <ToggleButtonGroup exclusive className={classes.toggleContainer}>
            <ToggleButton
              className={classes.moviesButton}
              onClick={showMovieResultsHandler}
            >
              MOVIES
            </ToggleButton>
            <ToggleButton
              className={classes.peopleButton}
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
