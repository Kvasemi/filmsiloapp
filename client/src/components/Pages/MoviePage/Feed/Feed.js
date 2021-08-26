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
import Reviews from "../Reviews/Reviews";
import Sidebar from "../Sidebar/Sidebar";

import useStyles from "./styles";

const Feed = () => {
  const classes = useStyles();
  const {
    getLocalCrew,
    personClickHandler,
    toggleReviewHandler,
    toggleFormHandler,
  } = useAuth();

  const crew = getLocalCrew();

  const mappedCrewList = crew.cast.map((crew) => (
    <div className={classes.linkContainer} key={crew.id}>
      <Card
        className={classes.castCard}
        elevation={4}
        onClick={() => personClickHandler(crew.id)}
      >
        <CardMedia
          className={classes.cardMedia}
          image={`https://image.tmdb.org/t/p/h632${crew.profile_path}`}
          title={crew.name}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant='subtitle2' gutterBottom>
            {crew.name}
          </Typography>
          <Typography variant='body2' gutterBottom>
            {crew.character}
          </Typography>
        </CardContent>
      </Card>
    </div>
  ));

  return (
    <div className={classes.rootDiv}>
      <Grid container spacing={4} style={{ marginBottom: "200px" }}>
        <Sidebar />
        <Grid item xs={12} lg={9}>
          <Typography variant='h6'>Cast</Typography>
          <Grid container className={classes.castGridContainer} spacing={2}>
            <Grid item className={classes.castGridItem}>
              <ImageList className={classes.imageList} cols={2.5}>
                {mappedCrewList}
              </ImageList>
            </Grid>
          </Grid>
          <Divider variant='middle' />
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
          <Reviews />
        </Grid>
      </Grid>
    </div>
  );
};

export default Feed;
