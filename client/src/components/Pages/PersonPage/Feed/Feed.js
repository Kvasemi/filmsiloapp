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
  const { getLocalrelatedMovieList, movieClickHandler } = useAuth();

  const relatedMovieList = getLocalrelatedMovieList();

  const mappedRelatedMovieList = relatedMovieList.cast.map((movie) => (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
      <Card
        key={movie.id}
        className={classes.castCard}
        elevation={4}
        onClick={() => movieClickHandler(movie.id)}
      >
        <CardMedia
          className={classes.cardMedia}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          title={movie.title}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant='subtitle2' gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant='body2' gutterBottom>
            {movie.release_date}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  ));

  return (
    <div className={classes.rootDiv}>
      <Typography variant='h6'>Cast and Crew</Typography>
      <Grid container spacing={4} style={{ marginBottom: "200px" }}>
        <Grid item xs={12} md={8}>
          <Grid container className={classes.castGridContainer} spacing={2}>
            <Grid item className={classes.castGridItem}>
              <ImageList className={classes.imageList} cols={2.5}>
                {mappedRelatedMovieList}
              </ImageList>
            </Grid>
          </Grid>
        </Grid>
        <Sidebar />
      </Grid>
    </div>
  );
};

export default Feed;
