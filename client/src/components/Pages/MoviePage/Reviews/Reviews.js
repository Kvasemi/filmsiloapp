import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import StarRatings from "react-star-ratings";

import { useAuth } from "../../../../context/AuthContext";
import useStyles from "./styles";

const Reviews = () => {
  const classes = useStyles();
  const { showComponent } = useAuth();

  return (
    <Grid container className={classes.mainContainer}>
      <Grid item className={classes.item}>
        {showComponent ? (
          <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component='h1' variant='h5' gutterBottom>
                Write a Review
              </Typography>
              <StarRatings
                rating={2.403}
                starDimension='30px'
                starSpacing='15px'
              />
              <form className={classes.form} noValidate>
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='title'
                  label='Review Title'
                  name='title'
                  autoComplete='title'
                />
                <TextField
                  multiline={true}
                  minRows='5'
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='review'
                  label='Review'
                  type='review'
                  id='review'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Submit Review
                </Button>
              </form>
            </div>
          </Container>
        ) : (
          <>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component='h2' variant='h5' gutterBottom>
                    REVIEW TITLE
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    STARS
                  </Typography>
                  <Typography variant='subtitle1' paragraph>
                    REVIEW OVERVIEW
                  </Typography>
                </CardContent>
              </div>
            </Card>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component='h2' variant='h5' gutterBottom>
                    REVIEW TITLE
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    STARS
                  </Typography>
                  <Typography variant='subtitle1' paragraph>
                    REVIEW OVERVIEW
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Reviews;
