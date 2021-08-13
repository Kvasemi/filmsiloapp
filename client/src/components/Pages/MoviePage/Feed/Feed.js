import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  ImageList,
  Typography,
} from "@material-ui/core";

import { useAuth } from "../../../../context/AuthContext";
import Reviews from "../Reviews/Reviews";
import Sidebar from "../Sidebar/Sidebar";

import useStyles from "./styles";

const Feed = () => {
  const classes = useStyles();
  const { getLocalCrew, personClickHandler } = useAuth();

  const crew = getLocalCrew();

  const mappedCrewList = crew.cast.map((crew) => (
    <Link to={`/person/${crew.id}`} style={{ textDecoration: "none" }}>
      <Card
        key={crew.id}
        className={classes.castCard}
        elevation={4}
        onClick={() => personClickHandler(crew.id)}
      >
        <CardMedia
          className={classes.cardMedia}
          image={`https://image.tmdb.org/t/p/w500${crew.profile_path}`}
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
    </Link>
  ));

  return (
    <div className={classes.rootDiv}>
      <Typography variant='h6'>Cast and Crew</Typography>
      <Grid container spacing={4} style={{ marginBottom: "200px" }}>
        <Grid item xs={12} md={8}>
          <Grid container className={classes.castGridContainer} spacing={2}>
            <Grid item className={classes.castGridItem}>
              <ImageList className={classes.imageList} cols={2.5}>
                {mappedCrewList}
              </ImageList>
            </Grid>
          </Grid>

          <Reviews />
        </Grid>
        <Sidebar />
      </Grid>
    </div>
  );
};

export default Feed;
