import { CardMedia, Container, Typography } from "@material-ui/core";

import useStyles from "./styles";
import { useAuth } from "../../../../context/AuthContext";

const Hero = () => {
  const classes = useStyles();
  const { getLocalPerson } = useAuth();

  const person = getLocalPerson();

  return (
    <Container maxWidth={false} className={classes.container}>
      <CardMedia
        className={classes.image}
        image={`https://image.tmdb.org/t/p/h632${person.profile_path}`}
        alt={person.name}
      />
      <div className={classes.textDiv}>
        <Typography className={classes.personDetails} variant='h2'>
          <strong>{person.name}</strong>
        </Typography>
        <Typography
          className={classes.biographyText}
          variant='subtitle1'
          style={{ marginTop: "50px" }}
        >
          <strong>Biography</strong>
        </Typography>
        <Typography className={classes.biographyDetails} variant='body1'>
          {person.biography}
        </Typography>
      </div>
    </Container>
  );
};

export default Hero;
