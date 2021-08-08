import { useState } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import useStyles from "./styles";

const Hero = () => {
  const [query, setQuery] = useState(null);
  const classes = useStyles();

  const inputHandler = (e) => {
    e.preventDefault();

    setQuery(e.target.value);
  };

  const submitHandler = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?&api_key=96aef73142a3bf028320faa7a7476a67&query=${query}`
    );
    const movieList = await res.json();
    console.log(movieList.results[0]);
    setQuery(null);
  };

  return (
    <div className={classes.container}>
      <Container maxWidth='md'>
        <Typography
          variant='h2'
          align='center'
          color='textPrimary'
          gutterBottom
        >
          Movie Data Finder
        </Typography>
        <Typography variant='h5' align='center' color='textSecondary' paragraph>
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
      </Container>
    </div>
  );
};

export default Hero;
