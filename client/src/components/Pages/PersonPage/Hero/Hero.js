import {
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";

import useStyles from "./styles";
import { useAuth } from "../../../../context/AuthContext";

const Hero = () => {
  const classes = useStyles();
  const { getLocalPerson } = useAuth();

  const person = getLocalPerson();

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container className={classes.gridContainer} spacing={2}>
        <Grid item xs={12} md={4}>
          <Card className={classes.card} elevation={4}>
            <CardMedia
              className={classes.cardMedia}
              image={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              title={person.name}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8} className={classes.details}>
          <Typography className={classes.personDetails} variant='h2'>
            <strong>{person.name}</strong>
          </Typography>
          <Typography
            className={classes.personDetails}
            variant='body1'
            gutterBottom
          >
            {person.known_for_department}
            {person.birthday}
          </Typography>
          <Typography
            className={classes.mpersonetails}
            variant='subtitle1'
            style={{ marginTop: "50px" }}
          >
            <strong>Biography</strong>
          </Typography>
          <Typography className={classes.personDetails} variant='body1'>
            {person.biography}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Hero;
