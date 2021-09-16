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
import Footer from "../../../Modules/Footer/Footer";
import missingMovie from "../../../../images/missing.png";
import useStyles from "./styles";

const Feed = () => {
  const classes = useStyles();
  const { getLocalrelatedMovieList, movieClickHandler } = useAuth();

  const relatedMovieList = getLocalrelatedMovieList();

  const sortedActedInList = relatedMovieList.cast.sort((a, b) => {
    if (a.release_date && b.release_date) {
      if (a.release_date.slice(0, 4) > b.release_date.slice(0, 4)) return -1;
      else if (a.release_date.slice(0, 4) < b.release_date.slice(0, 4))
        return 1;
      else return 0;
    }
    return 1;
  });

  const mappedRelatedMovieList = sortedActedInList.map((movie) => (
    <div className={classes.linkContainer} key={movie.id}>
      <Card
        className={classes.castCard}
        elevation={4}
        onClick={() => movieClickHandler(movie.id)}
      >
        <CardMedia
          className={classes.cardMedia}
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
              : missingMovie
          }
          title={movie.title}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant='subtitle2' gutterBottom>
            <strong>{movie.title}</strong>
          </Typography>
        </CardContent>
      </Card>
    </div>
  ));

  const filterByDirectingWorks = relatedMovieList.crew.filter(
    (movie) => movie.department === "Directing" && movie.job === "Director"
  );

  const sortedDirectedList = filterByDirectingWorks.sort((a, b) => {
    if (a.release_date && b.release_date) {
      if (a.release_date.slice(0, 4) > b.release_date.slice(0, 4)) return -1;
      else if (a.release_date.slice(0, 4) < b.release_date.slice(0, 4))
        return 1;
      else return 0;
    }
    return 1;
  });

  const mappedRelatedDirectedList = sortedDirectedList.map((movie) => (
    <div className={classes.linkContainer} key={movie.id}>
      <Card
        className={classes.castCard}
        elevation={4}
        onClick={() => movieClickHandler(movie.id)}
      >
        <CardMedia
          className={classes.cardMedia}
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
              : missingMovie
          }
          title={movie.title}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant='subtitle2' gutterBottom>
            {movie.title}
          </Typography>
        </CardContent>
      </Card>
    </div>
  ));

  const filterByWritingWorks = relatedMovieList.crew.filter(
    (movie) => movie.department === "Writing" && movie.job === "Screenplay"
  );

  const sortedWrittenForList = filterByWritingWorks.sort((a, b) => {
    if (a.release_date && b.release_date) {
      if (a.release_date.slice(0, 4) > b.release_date.slice(0, 4)) return -1;
      else if (a.release_date.slice(0, 4) < b.release_date.slice(0, 4))
        return 1;
      else return 0;
    }
    return 1;
  });

  const mappedRelatedScreenplayList = sortedWrittenForList.map((movie) => (
    <div className={classes.linkContainer} key={movie.id}>
      <Card
        className={classes.castCard}
        elevation={4}
        onClick={() => movieClickHandler(movie.id)}
      >
        <CardMedia
          className={classes.cardMedia}
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
              : missingMovie
          }
          title={movie.title}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant='subtitle2' gutterBottom>
            {movie.title}
          </Typography>
        </CardContent>
      </Card>
    </div>
  ));

  const filterByProducingWorks = relatedMovieList.crew.filter(
    (movie) => movie.department === "Production" && movie.job === "Producer"
  );

  const sortedProducedList = filterByProducingWorks.sort((a, b) => {
    if (a.release_date && b.release_date) {
      if (a.release_date.slice(0, 4) > b.release_date.slice(0, 4)) return -1;
      else if (a.release_date.slice(0, 4) < b.release_date.slice(0, 4))
        return 1;
      else return 0;
    }
    return 1;
  });

  const mappedRelatedProducedList = sortedProducedList.map((movie) => (
    <div className={classes.linkContainer} key={movie.id}>
      <Card
        className={classes.castCard}
        elevation={4}
        onClick={() => movieClickHandler(movie.id)}
      >
        <CardMedia
          className={classes.cardMedia}
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
              : missingMovie
          }
          title={movie.title}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant='subtitle2' gutterBottom>
            {movie.title}
          </Typography>
        </CardContent>
      </Card>
    </div>
  ));

  return (
    <div className={classes.rootDiv}>
      <Grid container spacing={4} style={{ marginBottom: "200px" }}>
        <Sidebar />
        <Grid item xs={12} md={9}>
          <Grid container className={classes.castGridContainer} spacing={2}>
            <Grid item className={classes.castGridItem}>
              <div className={classes.imagelistContainer}>
                {relatedMovieList.cast.length > 0 && (
                  <>
                    <Typography
                      variant='h6'
                      className={classes.heading}
                      gutterBottom
                    >
                      Films Casted In
                    </Typography>

                    <ImageList className={classes.imageList} cols={3}>
                      {mappedRelatedMovieList}
                    </ImageList>
                  </>
                )}
                {filterByDirectingWorks.length > 0 && (
                  <>
                    <Typography
                      variant='h6'
                      className={classes.heading}
                      gutterBottom
                    >
                      Films Directed
                    </Typography>

                    <ImageList className={classes.imageList} cols={3}>
                      {mappedRelatedDirectedList}
                    </ImageList>
                  </>
                )}
                {filterByWritingWorks.length > 0 && (
                  <>
                    <Typography
                      variant='h6'
                      className={classes.heading}
                      gutterBottom
                    >
                      Films Written
                    </Typography>
                    <ImageList className={classes.imageList} cols={3}>
                      {mappedRelatedScreenplayList}
                    </ImageList>
                  </>
                )}
                {filterByProducingWorks.length > 0 && (
                  <>
                    <Typography
                      variant='h6'
                      className={classes.heading}
                      gutterBottom
                    >
                      Films Produced
                    </Typography>
                    <ImageList className={classes.imageList} cols={3}>
                      {mappedRelatedProducedList}
                    </ImageList>
                  </>
                )}
              </div>
              <div className={classes.footer}>
                <Footer />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Feed;
