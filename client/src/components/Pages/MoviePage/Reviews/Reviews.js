import { useState } from "react";
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
import {
  createReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../../../../actions/reviews";
import { updateUser } from "../../../../actions/users";

const Reviews = () => {
  const classes = useStyles();
  const {
    currentUser,
    formatDate,
    getLocalReviewCollectionList,
    review,
    reviewCollection,
    reviewInitialState,
    setAlerts,
    setCurrentUser,
    setReview,
    setReviewCollection,
    setReviewWritten,
    setShowComponent,
    setSnackbarOpen,
    showComponent,
    sortByNestedKey,
  } = useAuth();

  const [showEditComponent, setShowEditComponent] = useState(false);

  const reviews = getLocalReviewCollectionList();

  const reviewBodyHandler = (e) => {
    setReview({ ...review, review_body: e.target.value });
  };

  const reviewTitleHandler = (e) => {
    setReview({ ...review, review_title: e.target.value });
  };

  const changeRatingHandler = (newRating) => {
    setReview({ ...review, num_stars: newRating });
  };

  const reviewSubmitHandler = async (e) => {
    e.preventDefault();
    setAlerts("");

    const res = await createReview(review);
    currentUser.reviews.push(res._id);
    setReviewCollection([...reviewCollection, res]);
    localStorage.setItem("reviewCollection", JSON.stringify(reviewCollection));
    setCurrentUser({ ...currentUser, reviews: currentUser.reviews });
    const response = await updateUser(currentUser._id, currentUser);
    if (response.message) {
      const reviewResponse = await getReviews();
      const reviewData = reviewResponse.filter((fetchedReview) => {
        return fetchedReview.movie_id === review.movie_id;
      });
      const sortedReviews = sortByNestedKey(reviewData);
      setReviewCollection(sortedReviews);
      localStorage.setItem("reviewCollection", JSON.stringify(sortedReviews));
      setReviewWritten(true);
      setShowComponent(false);
      setReview(reviewInitialState); // changed from reviewinitialstate to null may cause error
      setAlerts("success");
      setSnackbarOpen(true);
    } else {
      setAlerts("error");
      setSnackbarOpen(true);
    }
  };

  const editReviewHandler = async (reviewProp) => {
    setShowEditComponent(true);
    setShowComponent(true);
    setReview(reviewProp);
  };

  const editReviewSubmitHandler = async (e, id, updatedReview) => {
    e.preventDefault();
    setAlerts("");

    const res = await updateReview(id, updatedReview);
    if (res.message) {
      const reviewResponse = await getReviews();
      const reviewData = reviewResponse.filter((review) => {
        return review.movie_id === updatedReview.movie_id;
      });
      const sortedReviews = sortByNestedKey(reviewData);
      setReviewCollection(sortedReviews);
      localStorage.setItem("reviewCollection", JSON.stringify(sortedReviews));
      setShowComponent(false);
      setShowEditComponent(false);
      setReview(reviewInitialState); // changed from reviewinitialstate to null may cause error
      setAlerts("success");
      setSnackbarOpen(true);
    } else {
      setAlerts("error");
      setSnackbarOpen(true);
    }
  };

  const deleteReviewHandler = async (id, reviewProp) => {
    try {
      const res = await deleteReview(id);
      const remainingReviews = currentUser.reviews.filter(
        (review) => review !== id
      );
      setCurrentUser({ ...currentUser, reviews: remainingReviews });
      const response = await updateUser(currentUser._id, {
        ...currentUser,
        reviews: remainingReviews,
      });
      if (reviewCollection.length > 1) {
        const reviewResponse = await getReviews();
        const reviewData = reviewResponse.filter((fetchedReview) => {
          return fetchedReview.movie_id === reviewProp.movie_id;
        });
        const sortedReviews = sortByNestedKey(reviewData);
        setReviewCollection(sortedReviews);
        localStorage.setItem("reviewCollection", JSON.stringify(sortedReviews));
        setShowComponent(false);
        setReviewWritten(false);
        setReview(reviewInitialState); // changed from reviewinitialstate to null may cause error
        setAlerts("success");
        setSnackbarOpen(true);
      } else {
        setReviewCollection([]);
        localStorage.setItem("reviewCollection", JSON.stringify([]));
        setReviewWritten(false);
        setReview(reviewInitialState); // changed from reviewinitialstate to null may cause error
        setShowComponent(false);
        setAlerts("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setAlerts("error");
      setSnackbarOpen(true);
    }
  };

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
          {currentUser && currentUser._id === review.user_id && (
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
