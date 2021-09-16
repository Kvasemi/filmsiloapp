import { CardMedia, Container, Typography } from "@material-ui/core";

import useStyles from "./styles";
import { useAuth } from "../../../../context/AuthContext";
import missingMovie from "../../../../images/missing.png";

const Hero = () => {
  const classes = useStyles();
  const { formatDate, getLocalCrew, getLocalMovie, personClickHandler } =
    useAuth();

  const movie = getLocalMovie();
  const crew = getLocalCrew();

  const roleFinder = (department, job) => {
    return crew.crew.filter(
      (crew) => crew.department === department && crew.job === job
    );
  };

  const mappedCrewList = (department, job) => {
    return roleFinder(department, job)
      .slice(0, 5)
      .map(
        (crew) =>
          crew && (
            <Typography
              key={crew.id}
              style={{
                display: "inline-block",
                marginRight: "20px",
                marginBottom: "10px",
              }}
              className={classes.text_names}
              variant='body1'
              onClick={() => personClickHandler(crew.id)}
              gutterBottom
            >
              <strong>{crew.name}</strong>
            </Typography>
          )
      );
  };

  return (
    <Container maxWidth={false} className={classes.container}>
      <CardMedia
        className={classes.backgroundCard}
        image={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
      >
        <div className={classes.gridContainer}>
          <img
            className={classes.image}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
                : missingMovie
            }
            alt={movie.title}
          />
          <div className={classes.textDiv}>
            <Typography className={classes.movieDetails} variant='h2'>
              <strong>{movie.title}</strong>
            </Typography>
            <Typography
              className={classes.movieDetails}
              variant='body1'
              gutterBottom
            >
              {movie.release_date && formatDate(movie.release_date)}
            </Typography>
            <Typography
              className={classes.movieDetails}
              variant='h6'
              style={{ marginTop: "50px" }}
            >
              <strong>Overview</strong>
            </Typography>
            <Typography className={classes.movieDetails} variant='body1'>
              {movie.overview}
            </Typography>
            {mappedCrewList("Directing", "Director").length > 0 && (
              <div className={classes.text_container}>
                <Typography
                  className={classes.text}
                  variant='subtitle2'
                  style={{ marginTop: "50px" }}
                >
                  Director
                </Typography>
                {mappedCrewList("Directing", "Director")}
              </div>
            )}
            {mappedCrewList("Writing", "Screenplay").length > 0 && (
              <div className={classes.text_container}>
                <Typography
                  className={classes.text}
                  variant='subtitle2'
                  style={{ marginTop: "10px" }}
                >
                  Screenwriter
                </Typography>
                {mappedCrewList("Writing", "Screenplay")}
              </div>
            )}
            {mappedCrewList("Production", "Producer").length > 0 && (
              <div className={classes.text_container}>
                <Typography
                  className={classes.text}
                  variant='subtitle2'
                  style={{ marginTop: "20px" }}
                >
                  Producer
                </Typography>
                {mappedCrewList("Production", "Producer")}
              </div>
            )}
          </div>
        </div>
      </CardMedia>
    </Container>
  );
};

export default Hero;
