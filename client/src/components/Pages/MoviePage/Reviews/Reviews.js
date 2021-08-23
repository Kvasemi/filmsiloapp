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

import useStyles from "./styles";

const Reviews = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.mainContainer}>
      <Grid item className={classes.item}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component='h2' variant='h5'>
                REVIEW TITLE
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                STARS
              </Typography>
              <Typography variant='subtitle1' paragraph>
                REVIEW OVERVIEW
              </Typography>
            </CardContent>
          </div>
        </Card>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component='h2' variant='h5'>
                REVIEW TITLE
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                STARS
              </Typography>
              <Typography variant='subtitle1' paragraph>
                REVIEW OVERVIEW
              </Typography>
            </CardContent>
          </div>
        </Card>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component='h2' variant='h5'>
                REVIEW TITLE
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                STARS
              </Typography>
              <Typography variant='subtitle1' paragraph>
                REVIEW OVERVIEW
              </Typography>
            </CardContent>
          </div>
        </Card>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component='h1' variant='h5'>
              Review
            </Typography>
            <StarRatings
              rating={2.403}
              starDimension='30px'
              starSpacing='15px'
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
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Submit Review
              </Button>
            </form>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Reviews;

// REVIEW DRAWER

// import React from "react";
// import clsx from "clsx";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   Container,
//   CssBaseline,
//   Typography,
//   TextField
// } from "@material-ui/core";
// import Drawer from "@material-ui/core/Drawer";
// import Button from "@material-ui/core/Button";
// import List from "@material-ui/core/List";
// import Divider from "@material-ui/core/Divider";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";

// const useStyles = makeStyles({
//   list: {
//     width: 450
//   },
//   fullList: {
//     width: "auto"
//   }
// });

// export default function TemporaryDrawer() {
//   const classes = useStyles();
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <div
//       className={clsx(classes.list, {
//         [classes.fullList]: anchor === "top" || anchor === "bottom"
//       })}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <div className={classes.paper}>
//           <Typography component="h1" variant="h5">
//             Review
//           </Typography>
//           <form className={classes.form} noValidate>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="title"
//               label="Review Title"
//               name="title"
//               autoComplete="title"
//             />
//             <TextField
//               multiline={true}
//               minRows="5"
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="review"
//               label="Review"
//               type="review"
//               id="review"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.submit}
//             >
//               Submit Review
//             </Button>
//           </form>
//         </div>
//       </Container>
//     </div>
//   );

//   return (
//     <div>
//       {["left", "right", "top", "bottom"].map((anchor) => (
//         <React.Fragment key={anchor}>
//           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//           <Drawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//           >
//             {list(anchor)}
//           </Drawer>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }

// SIGN IN DRAWER

// import React from "react";
// import clsx from "clsx";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   Container,
//   CssBaseline,
//   Typography,
//   TextField,
//   FormControlLabel,
//   Checkbox,
//   Grid,
//   Link,
//   Box
// } from "@material-ui/core";
// import Drawer from "@material-ui/core/Drawer";
// import Button from "@material-ui/core/Button";
// import List from "@material-ui/core/List";
// import Divider from "@material-ui/core/Divider";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";

// const useStyles = makeStyles((theme) => ({
//   list: {
//     width: 450
//   },
//   fullList: {
//     width: "auto"
//   },
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center"
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1)
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2)
//   }
// }));

// export default function TemporaryDrawer() {
//   const classes = useStyles();
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <div
//       className={clsx(classes.list, {
//         [classes.fullList]: anchor === "top" || anchor === "bottom"
//       })}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <div className={classes.paper}>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <form className={classes.form} noValidate>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.submit}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </form>
//         </div>
//       </Container>
//     </div>
//   );

//   return (
//     <div>
//       {["left", "right", "top", "bottom"].map((anchor) => (
//         <React.Fragment key={anchor}>
//           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//           <Drawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//           >
//             {list(anchor)}
//           </Drawer>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }
