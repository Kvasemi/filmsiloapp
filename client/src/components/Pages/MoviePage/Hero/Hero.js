import {
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";

import useStyles from "./styles";
import { useAuth } from "../../../../context/AuthContext";

const Hero = () => {
  const classes = useStyles();
  const { getLocalMovie } = useAuth();

  const movie = getLocalMovie();

  return (
    <Container maxWidth={false} className={classes.container}>
      <CardMedia
        style={{
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
        image={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
      >
        <Grid container className={classes.gridContainer} spacing={2}>
          <Grid item xs={12} md={4}>
            <Card className={classes.card} elevation={4}>
              <CardMedia
                className={classes.cardMedia}
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title={movie.title}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={8} className={classes.details}>
            <Typography className={classes.movieDetails} variant='h2'>
              <strong>{movie.title}</strong>
            </Typography>
            <Typography
              className={classes.movieDetails}
              variant='body1'
              gutterBottom
            >
              {movie.release_date}
              {movie.runtime}
            </Typography>
            <Typography
              className={classes.movieDetails}
              variant='subtitle1'
              style={{ marginTop: "50px" }}
            >
              <strong>Overview</strong>
            </Typography>
            <Typography className={classes.movieDetails} variant='body1'>
              {movie.overview}
            </Typography>
          </Grid>
        </Grid>
      </CardMedia>
    </Container>
  );
};

export default Hero;
