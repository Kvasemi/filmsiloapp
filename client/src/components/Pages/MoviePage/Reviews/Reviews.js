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

import { REVIEWONE, REVIEWTWO } from "../../../Constants/constants";
import { useAuth } from "../../../../context/AuthContext";
import useStyles from "./styles";

const Reviews = () => {
  const classes = useStyles();
  const {
    changeRatingHandler,
    reviewBodyHandler,
    reviewSubmitHandler,
    reviewTitleHandler,
    showComponent,
    starRating,
  } = useAuth();

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
                rating={starRating}
                starRatedColor='blue'
                changeRating={changeRatingHandler}
                starDimension='30px'
                starSpacing='10px'
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
                  onChange={reviewTitleHandler}
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
                  onChange={reviewBodyHandler}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  onClick={(e) => reviewSubmitHandler(e)}
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
                    {REVIEWONE.review_title}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    <StarRatings
                      rating={REVIEWONE.num_stars}
                      starRatedColor='blue'
                      numberOfStars={5}
                      name='rating'
                      starDimension='30px'
                      starSpacing='10px'
                    />
                  </Typography>
                  <Typography variant='subtitle1' paragraph>
                    {REVIEWONE.review_body}
                  </Typography>
                </CardContent>
              </div>
            </Card>
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component='h2' variant='h5' gutterBottom>
                    {REVIEWTWO.review_title}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    <StarRatings
                      rating={REVIEWTWO.num_stars}
                      starRatedColor='blue'
                      numberOfStars={5}
                      name='rating'
                      starDimension='30px'
                      starSpacing='10px'
                    />
                  </Typography>
                  <Typography variant='subtitle1' paragraph>
                    {REVIEWTWO.review_body}
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
