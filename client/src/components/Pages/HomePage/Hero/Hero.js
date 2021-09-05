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
  const { query, randMovie, searchInputHandler, searchSubmitHandler } =
    useAuth();

  return (
    <Container className={classes.container} direction='column'>
      <CardMedia
        className={classes.backgroundCard}
        image={`https://image.tmdb.org/t/p/w1280${randMovie.backdrop_path}`}
      >
        <div className={classes.outerLayer}>
          <Typography
            className={classes.heroTextTitle}
            variant='h1'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            <strong>The Film Silo</strong>
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
          <Grid
            container
            className={classes.searchContainer}
            spacing={2}
            justifyContent='center'
          >
            <Grid item className={classes.searchBar}>
              <form className={classes.form} noValidate autoComplete='off'>
                <TextField
                  type='text'
                  value={query}
                  InputProps={{
                    className: classes.input,
                    disableUnderline: true,
                  }}
                  style={{ width: 350 }}
                  autoFocus={true}
                  fullWidth={true}
                  placeholder='Search movies, actors, directors..'
                  onChange={searchInputHandler}
                  required
                />
                <Button
                  className={classes.searchButton}
                  type='submit'
                  variant='contained'
                  color='primary'
                  onClick={(e) => searchSubmitHandler(e)}
                >
                  Go!
                </Button>
              </form>
            </Grid>
          </Grid>
        </div>
      </CardMedia>
    </Container>
  );
};

export default Hero;
