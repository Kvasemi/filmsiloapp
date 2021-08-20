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
    <Container className={classes.container} direction='column'>
      <CardMedia
        className={classes.backgroundCard}
        image={`https://image.tmdb.org/t/p/w1280${randMovie.backdrop_path}`}
      >
        <div className={classes.outerLayer}>
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
                  InputProps={{
                    className: classes.input,
                    disableUnderline: true,
                  }}
                  style={{ width: 350 }}
                  autoFocus={true}
                  fullWidth={true}
                  placeholder='Search movies, actors, directors..'
                  onChange={inputHandler}
                />
                <Button
                  className={classes.searchButton}
                  type='submit'
                  variant='contained'
                  color='primary'
                  onClick={(e) => submitHandler(e)}
                >
                  Search
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
