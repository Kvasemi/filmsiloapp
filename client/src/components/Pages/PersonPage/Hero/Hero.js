import { useState } from "react";
import { Button, CardMedia, Container, Typography } from "@material-ui/core";

import useStyles from "./styles";
import { useAuth } from "../../../../context/AuthContext";
import missingPerson from "../../../../images/person.png";

const Hero = () => {
  const classes = useStyles();
  const { getLocalPerson } = useAuth();

  const [readMore, setReadMore] = useState(false);

  const person = getLocalPerson();

  const personBiography = (num) => {
    if (person.biography.length > num) {
      return (
        <>
          <Typography className={classes.biographyDetails} variant='body1'>
            {!readMore ? person.biography.slice(0, num) : person.biography}
          </Typography>
          <Button
            className={classes.showButton}
            onClick={() => setReadMore(!readMore)}
          >
            {!readMore ? "Read More..." : "Read Less..."}
          </Button>
        </>
      );
    } else
      return (
        <Typography className={classes.biographyDetails} variant='body1'>
          {person.biography}
        </Typography>
      );
  };

  return (
    <Container maxWidth={false} className={classes.container}>
      <CardMedia
        className={classes.image}
        image={
          person.profile_path
            ? `https://image.tmdb.org/t/p/h632${person.profile_path}`
            : missingPerson
        }
        alt={person.name}
      />
      <div className={classes.textDiv}>
        <Typography className={classes.personDetails} variant='h4'>
          <strong>{person.name}</strong>
        </Typography>
        <Typography
          className={classes.biographyText}
          variant='h6'
          style={{ marginTop: "50px" }}
        >
          <strong>Biography</strong>
        </Typography>
        {person.biography
          ? personBiography(1250)
          : `We don't have a biography for ${person.name}.`}
      </div>
    </Container>
  );
};

export default Hero;
