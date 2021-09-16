import {
  Card,
  CardMedia,
  CardContent,
  Divider,
  Grid,
  ImageList,
  Typography,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import { useAuth } from "../../../../context/AuthContext";
import Footer from "../../../Modules/Footer/Footer";
import Reviews from "../Reviews/Reviews";
import Sidebar from "../Sidebar/Sidebar";
import missingPerson from "../../../../images/person.png";

import useStyles from "./styles";

const Feed = () => {
  const classes = useStyles();
  const {
    currentUser,
    getLocalCrew,
    getLocalMovie,
    personClickHandler,
    review,
    reviewWritten,
    setReview,
    setShowComponent,
  } = useAuth();

  const crew = getLocalCrew();

  const toggleReviewHandler = () => {
    setShowComponent(false);
    setReview(null);
  };

  const toggleFormHandler = () => {
    setShowComponent(true);
    setReview({
      ...review,
      user_id: currentUser._id,
      username: currentUser.name,
      date_created: new Date(),
      movie_id: getLocalMovie().id,
      movie_name: getLocalMovie().title,
    });
  };

  const crewCharacter = (crewArray, num) => {
    if (crewArray.character) {
      if (crewArray.character.length > num) {
        return (
          <Typography className={classes.biographyDetails} variant='body2'>
            {crewArray.character.slice(0, num)}...
          </Typography>
        );
      } else
        return (
          <Typography variant='body2' gutterBottom>
            {crewArray.character}
          </Typography>
        );
    }
  };

  const mappedCrewList = crew.cast.map((crew) => (
    <div className={classes.linkContainer} key={crew.id}>
      <Card
        className={classes.castCard}
        elevation={4}
        onClick={() => personClickHandler(crew.id)}
      >
        <CardMedia
          className={classes.cardMedia}
          image={
            crew.profile_path
              ? `https://image.tmdb.org/t/p/h632${crew.profile_path}`
              : missingPerson
          }
          title={crew.name}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant='subtitle2' gutterBottom>
            <strong>{crew.name}</strong>
          </Typography>
          {crewCharacter(crew, 40)}
        </CardContent>
      </Card>
    </div>
  ));

  return (
    <div className={classes.rootDiv}>
      <Grid container spacing={4}>
        <Sidebar />
        <Grid item xs={12} lg={9} style={{ marginBottom: "0px" }}>
          <div className={classes.imagelistContainer}>
            <Typography variant='h6' gutterBottom>
              Cast
            </Typography>
            <Grid container className={classes.castGridContainer} spacing={2}>
              <Grid item className={classes.castGridItem}>
                <ImageList className={classes.imageList} cols={2.5}>
                  {mappedCrewList}
                </ImageList>
              </Grid>
            </Grid>
            <Divider variant='middle' />
            {currentUser && !reviewWritten && (
              <ToggleButtonGroup exclusive className={classes.toggleContainer}>
                <ToggleButton
                  className={classes.reviewsButton}
                  value='REVIEWS'
                  onClick={toggleReviewHandler}
                >
                  REVIEWS
                </ToggleButton>
                <ToggleButton
                  className={classes.formButton}
                  value='WRITE A REVIEW'
                  onClick={toggleFormHandler}
                >
                  WRITE A REVIEW
                </ToggleButton>
              </ToggleButtonGroup>
            )}
            <Reviews />
          </div>
          <div className={classes.footer}>
            <Footer />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Feed;
