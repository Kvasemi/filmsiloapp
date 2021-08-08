import {
  Button,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import useStyles from "./styles";
import { useAuth } from "../../../../context/AuthContext";

const Hero = () => {
  const classes = useStyles();
  const { inputHandler, randMovie, submitHandler } = useAuth();

  return (
    <Container
      className={classes.container}
      direction='column'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
    >
      <CardMedia
        style={{
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          height: "300px",
        }}
        image={`https://image.tmdb.org/t/p/w1280${randMovie.backdrop_path}`}
      >
        <Typography
          className={classes.heroTextTitle}
          variant='h2'
          align='center'
          color='textPrimary'
          gutterBottom
        >
          Movie Data Finder
        </Typography>
        <Typography
          variant='h5'
          align='center'
          className={classes.heroTextSlogan}
          paragraph
        >
          Search information about your favorites movies, actors, directors.
          Read and write reviews about them!
        </Typography>
        <div className={classes.search}>
          <Grid container spacing={2} justifyContent='center'>
            <Grid item>
              <form className={classes.form} noValidate autoComplete='off'>
                <TextField
                  className={classes.searchBar}
                  style={{ width: 350 }}
                  autoFocus={true}
                  fullWidth={true}
                  placeholder='Search movies, actors, directors..'
                  onChange={inputHandler}
                />
              </form>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                onClick={submitHandler}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </div>
      </CardMedia>
    </Container>
  );
};

export default Hero;
