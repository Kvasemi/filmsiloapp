import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";

import { useAuth } from "../../../../context/AuthContext";
import useStyles from "./styles";

const Feed = () => {
  const {
    formatDate,
    movieClickHandler,
    movieList,
    popularMovies,
    upcomingMovies,
  } = useAuth();

  const classes = useStyles();

  const mappedMovieList = movieList.map((movie) => (
    <Grid item key={movie.id} xs={12} sm={6} md={3} lg={2}>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
        <Card
          className={classes.card}
          elevation={4}
          onClick={() => movieClickHandler(movie.id)}
        >
          <CardMedia
            className={classes.cardMedia}
            image={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            title={movie.title}
          />
          <CardContent className={classes.cardContent}>
            <Typography variant='subtitle2' gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant='body2' gutterBottom>
              {formatDate(movie.release_date)}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  ));

  return (
    <div className={classes.container}>
      <div className={classes.toggleContainer}>
        <Button
          className={classes.popularButton}
          variant='contained'
          color='primary'
          onClick={popularMovies}
        >
          POPULAR MOVIES
        </Button>
        <Button
          className={classes.upcomingButton}
          variant='contained'
          color='primary'
          onClick={upcomingMovies}
        >
          UPCOMING MOVIES
        </Button>
      </div>
      <Container className={classes.cardGrid} maxWidth='xl'>
        <Grid container spacing={4}>
          {mappedMovieList}
        </Grid>
      </Container>
    </div>
  );
};

export default Feed;
