import { Link } from "react-router-dom";
import { CardMedia, Container, Typography } from "@material-ui/core";

import useStyles from "./styles";
import { useAuth } from "../../../../context/AuthContext";

const Hero = () => {
  const classes = useStyles();
  const { formatDate, getLocalCrew, getLocalMovie, personClickHandler } =
    useAuth();

  const movie = getLocalMovie();
  const crew = getLocalCrew();

  const roleFinder = (role) => {
    return crew.crew.filter((crew) => crew.job.includes(role));
  };

  const mappedCrewList = (role) => {
    return roleFinder(role).map(
      (crew) =>
        crew && (
          <Link to={`/person/${crew.id}`} style={{ textDecoration: "none" }}>
            <Typography
              style={{ display: "inline-block", marginRight: "20px" }}
              key={crew.id}
              className={classes.text_names}
              variant='body1'
              onClick={() => personClickHandler(crew.id)}
            >
              <strong>{crew.name}</strong>
            </Typography>
          </Link>
        )
    );
  };

  return (
    <Container maxWidth={false} className={classes.container}>
      <CardMedia
        style={{
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
        image={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
      >
        <div className={classes.gridContainer}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
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
              {formatDate(movie.release_date)}
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
            {mappedCrewList("Director").length > 0 && (
              <div className={classes.text_container}>
                <Typography
                  className={classes.text}
                  variant='subtitle2'
                  style={{ marginTop: "50px" }}
                >
                  <strong>Director</strong>
                </Typography>
                {mappedCrewList("Director")}
              </div>
            )}
            {mappedCrewList("Screenplay").length > 0 && (
              <div className={classes.text_container}>
                <Typography
                  className={classes.text}
                  variant='subtitle2'
                  style={{ marginTop: "50px" }}
                >
                  Screenwriter
                </Typography>
                {mappedCrewList("Screenplay")}
              </div>
            )}
            {mappedCrewList("Producer").length > 0 && (
              <div className={classes.text_container}>
                <Typography
                  className={classes.text}
                  variant='subtitle2'
                  style={{ marginTop: "20px" }}
                >
                  Producer
                </Typography>
                {mappedCrewList("Producer")}
              </div>
            )}
          </div>
        </div>
      </CardMedia>
    </Container>
  );
};

export default Hero;
