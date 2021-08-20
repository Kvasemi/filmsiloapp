import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  ImageList,
  Typography,
} from "@material-ui/core";

import { useAuth } from "../../../../context/AuthContext";
import Sidebar from "../Sidebar/Sidebar";

import useStyles from "./styles";

const Feed = () => {
  const classes = useStyles();
  const { formatDate, getLocalrelatedMovieList, movieClickHandler } = useAuth();

  const relatedMovieList = getLocalrelatedMovieList();

  const mappedRelatedMovieList = relatedMovieList.cast.map((movie) => (
    <Link
      to={`/movie/${movie.id}`}
      className={classes.linkContainer}
      key={movie.id}
    >
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
          <Typography variant='subtitle2' gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant='body2' gutterBottom>
            {movie.release_date && formatDate(movie.release_date)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  ));

  const filterByDirectingWorks = relatedMovieList.crew.filter(
    (movie) => movie.job === "Director"
  );

  const filterByWritingWorks = relatedMovieList.crew.filter(
    (movie) => movie.job === "Screenplay" || movie.job === "Writer"
  );

  const filterByProducingWorks = relatedMovieList.crew.filter((movie) =>
    movie.job.includes("Producer")
  );

  const mappedRelatedDirectedList = filterByDirectingWorks.map((movie) => (
    <Link
      to={`/movie/${movie.id}`}
      className={classes.linkContainer}
      key={movie.id}
    >
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
          <Typography variant='subtitle2' gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant='body2' gutterBottom>
            {movie.release_date && formatDate(movie.release_date)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  ));

  const mappedRelatedScreenplayList = filterByWritingWorks.map((movie) => (
    <Link
      to={`/movie/${movie.id}`}
      className={classes.linkContainer}
      key={movie.id}
    >
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
          <Typography variant='subtitle2' gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant='body2' gutterBottom>
            {movie.release_date && formatDate(movie.release_date)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  ));

  const mappedRelatedProducedList = filterByProducingWorks.map((movie) => (
    <Link
      to={`/movie/${movie.id}`}
      className={classes.linkContainer}
      key={movie.id}
    >
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
          <Typography variant='subtitle2' gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant='body2' gutterBottom>
            {movie.release_date && formatDate(movie.release_date)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  ));

  return (
    <div className={classes.rootDiv}>
      <Grid container spacing={4} style={{ marginBottom: "200px" }}>
        <Sidebar />
        <Grid item xs={12} md={9}>
          <Grid container className={classes.castGridContainer} spacing={2}>
            <Grid item className={classes.castGridItem}>
              {relatedMovieList.cast.length > 0 && (
                <>
                  <Typography variant='h6' className={classes.heading}>
                    Movies Acted in
                  </Typography>

                  <ImageList className={classes.imageList} cols={3}>
                    {mappedRelatedMovieList}
                  </ImageList>
                </>
              )}
              {filterByDirectingWorks.length > 0 && (
                <>
                  <Typography variant='h6' className={classes.heading}>
                    Movies Directed
                  </Typography>

                  <ImageList className={classes.imageList} cols={3}>
                    {mappedRelatedDirectedList}
                  </ImageList>
                </>
              )}
              {filterByWritingWorks.length > 0 && (
                <>
                  <Typography variant='h6' className={classes.heading}>
                    Movies Written
                  </Typography>
                  <ImageList className={classes.imageList} cols={3}>
                    {mappedRelatedScreenplayList}
                  </ImageList>
                </>
              )}
              {filterByProducingWorks.length > 0 && (
                <>
                  <Typography variant='h6' className={classes.heading}>
                    Movies Produced
                  </Typography>
                  <ImageList className={classes.imageList} cols={3}>
                    {mappedRelatedProducedList}
                  </ImageList>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Feed;
