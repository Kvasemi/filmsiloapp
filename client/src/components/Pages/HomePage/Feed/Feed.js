import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import { useAuth } from "../../../../context/AuthContext";
import useStyles from "./styles";

const Feed = ({ popularMovies, upcomingMovies, movieList }) => {
  const { formatDate, movieClickHandler } = useAuth();
  const classes = useStyles();

  const mappedMovieList = movieList.map((movie) => (
    <Grid item key={movie.id} xs={12} sm={6} md={3} lg={2}>
      <Card
        className={classes.castCard}
        elevation={4}
        onClick={() => movieClickHandler(movie.id)}
      >
        <CardMedia
          className={classes.cardMedia}
          image={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
          title={movie.title}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant='subtitle2'>
            <strong>{movie.title}</strong>
          </Typography>
          <Typography variant='body2'>
            {formatDate(movie.release_date)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ));

  return (
    <div className={classes.container}>
      <ToggleButtonGroup exclusive className={classes.toggleContainer}>
        <ToggleButton
          className={classes.popularButton}
          value='POPULAR MOVIES'
          onClick={popularMovies}
        >
          POPULAR MOVIES
        </ToggleButton>
        <ToggleButton
          className={classes.upcomingButton}
          value='UPCOMING MOVIES'
          onClick={upcomingMovies}
        >
          UPCOMING MOVIES
        </ToggleButton>
      </ToggleButtonGroup>
      <Container className={classes.cardGrid} maxWidth='xl'>
        <Grid container spacing={4}>
          {mappedMovieList}
        </Grid>
      </Container>
    </div>
  );
};

export default Feed;
