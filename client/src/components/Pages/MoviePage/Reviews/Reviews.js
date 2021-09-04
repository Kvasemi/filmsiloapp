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
import { ToggleButtonGroup } from "@material-ui/lab";
import StarRatings from "react-star-ratings";

import { useAuth } from "../../../../context/AuthContext";
import useStyles from "./styles";

const Reviews = () => {
  const classes = useStyles();
  const {
    changeRatingHandler,
    currentUser,
    deleteReviewHandler,
    editReviewHandler,
    editReviewSubmitHandler,
    formatDate,
    getLocalReviewCollectionList,
    review,
    reviewBodyHandler,
    reviewSubmitHandler,
    reviewTitleHandler,
    showComponent,
    showEditComponent,
  } = useAuth();

  const reviews = getLocalReviewCollectionList();

  const mappedReviews = reviews.map((review) => (
    <Card className={classes.card}>
      <div className={classes.cardDetails}>
        <CardContent>
          <Typography variant='subtitle1' color='textSecondary'>
            <StarRatings
              rating={review.num_stars}
              starRatedColor='blue'
              numberOfStars={5}
              name='rating'
              starDimension='20px'
              starSpacing='10px'
            />
          </Typography>
          <Typography component='h2' variant='h5' gutterBottom>
            {review.review_title}
          </Typography>
          <Typography component='h2' variant='subtitle1'>
            by: {review.username}
          </Typography>
          <Typography component='h2' variant='subtitle1' gutterBottom>
            {formatDate(review.date_created.slice(0, 10))}
          </Typography>
          <Typography component='h2' variant='h6' paragraph>
            {review.review_body}
          </Typography>
          {currentUser._id === review.user_id && (
            <ToggleButtonGroup exclusive className={classes.toggleContainer}>
              <Button
                variant='contained'
                color='primary'
                className={classes.editButton}
                onClick={() => editReviewHandler(review)}
              >
                EDIT REVIEW
              </Button>
              <Button
                variant='contained'
                color='primary'
                className={classes.deleteButton}
                onClick={() => deleteReviewHandler(review._id, review)}
              >
                DELETE REVIEW
              </Button>
            </ToggleButtonGroup>
          )}
        </CardContent>
      </div>
    </Card>
  ));

  return (
    <Grid container className={classes.mainContainer}>
      <Grid item className={classes.item}>
        {showComponent ? (
          showEditComponent ? (
            <Container component='main' maxWidth='xs'>
              <CssBaseline />
              <div className={classes.paper}>
                <Typography component='h1' variant='h5' gutterBottom>
                  Edit Your Review
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
                    value={review.review_title}
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
                    value={review.review_body}
                    onChange={reviewBodyHandler}
                  />
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                    onClick={(e) =>
                      editReviewSubmitHandler(e, review._id, review)
                    }
                  >
                    Edit Review
                  </Button>
                </form>
              </div>
            </Container>
          ) : (
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
          )
        ) : (
          <>
            {reviews.length > 0 ? (
              mappedReviews
            ) : (
              <p className={classes.no_reviews}>NO REVIEWS YET</p>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Reviews;
