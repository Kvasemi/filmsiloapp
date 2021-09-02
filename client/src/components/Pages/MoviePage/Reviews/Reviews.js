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
  const {
    changeRatingHandler,
    getLocalReviewCollectionList,
    review,
    reviewBodyHandler,
    reviewSubmitHandler,
    reviewTitleHandler,
    showComponent,
  } = useAuth();

  const reviews = getLocalReviewCollectionList();

  const mappedReviews = reviews.map((review) => (
    <Card className={classes.card}>
      <div className={classes.cardDetails}>
        <CardContent>
          <Typography component='h2' variant='h5' gutterBottom>
            {review.review_title}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            <StarRatings
              rating={review.num_stars}
              starRatedColor='blue'
              numberOfStars={5}
              name='rating'
              starDimension='30px'
              starSpacing='10px'
            />
          </Typography>
          <Typography variant='subtitle1' paragraph>
            {review.review_body}
          </Typography>
        </CardContent>
      </div>
    </Card>
  ));

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
                rating={review.num_stars}
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
                  onClick={reviewSubmitHandler}
                >
                  Submit Review
                </Button>
              </form>
            </div>
          </Container>
        ) : (
          <>{reviews.length > 0 && mappedReviews}</>
        )}
      </Grid>
    </Grid>
  );
};

export default Reviews;
