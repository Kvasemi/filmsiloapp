import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Drawer,
  FormControlLabel,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

import useStyles from "./styles";
import logo from "../../../images/filmsilo.png";
import { useAuth } from "../../../context/AuthContext";
import HideOnScroll from "./HideOnScroll";
import { createUser, getUser } from "../../../actions/users";

const Header = (props) => {
  const classes = useStyles();
  const {
    currentUser,
    drawerState,
    reviewCollection,
    setAlerts,
    setCurrentUser,
    setDrawerState,
    setReviewWritten,
    setShowComponent,
    setSnackbarOpen,
    userLogInAndSignUpInitialState,
  } = useAuth();

  const [logInOrSignUp, setLogInOrSignUp] = useState(false); //
  const [userLogInAndSignUp, setUserLogInAndSignUp] = useState(
    userLogInAndSignUpInitialState
  );

  const drawerOpenHandler = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setLogInOrSignUp(false);
    setDrawerState(open);
  };

  const logInEmailHandler = (e) => {
    setUserLogInAndSignUp({ ...userLogInAndSignUp, email: e.target.value });
  };

  const logInPasswordHandler = (e) => {
    setUserLogInAndSignUp({ ...userLogInAndSignUp, password: e.target.value });
  };

  const logInHandler = async (e) => {
    e.preventDefault();
    setAlerts("");

    const res = await getUser(userLogInAndSignUp);
    if (res && !("message" in res)) {
      setCurrentUser({ ...currentUser, ...res.res });
      if (reviewCollection.length > 0) {
        const isWritten = () => {
          for (let rev of reviewCollection) {
            if (res.res.reviews.includes(rev._id)) {
              return true;
            }
          }
          return false;
        };
        if (isWritten()) {
          setReviewWritten(true);
        }
      }
      setDrawerState(false);
      setUserLogInAndSignUp(userLogInAndSignUpInitialState);
      setAlerts("success");
      setSnackbarOpen(true);
    } else {
      setAlerts("error");
      setSnackbarOpen(true);
    }
  };

  // SIGN UP
  const signUpNameHandler = (e) => {
    setUserLogInAndSignUp({ ...userLogInAndSignUp, name: e.target.value });
  };

  const signUpEmailHandler = (e) => {
    setUserLogInAndSignUp({ ...userLogInAndSignUp, email: e.target.value });
  };

  const signUpPasswordHandler = (e) => {
    setUserLogInAndSignUp({ ...userLogInAndSignUp, password: e.target.value });
  };

  const signUpConfirmPasswordHandler = (e) => {
    setUserLogInAndSignUp({
      ...userLogInAndSignUp,
      confirmPassword: e.target.value,
    });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    setAlerts("");

    if (userLogInAndSignUp.confirmPassword === userLogInAndSignUp.password) {
      const res = await createUser(userLogInAndSignUp);
      if (res) {
        setCurrentUser({ ...currentUser, ...res.res });
        setDrawerState(false);
        setAlerts("success");
        setSnackbarOpen(true);
      } else {
        setAlerts("error");
        setSnackbarOpen(true);
      }
    } else {
      setAlerts("error");
      setSnackbarOpen(true);
    }
  };

  const LogInOrSignUpHandler = () => {
    setLogInOrSignUp(!logInOrSignUp);
    setUserLogInAndSignUp(userLogInAndSignUpInitialState);
  };

  const logOutHandler = () => {
    setDrawerState(false);
    setCurrentUser(null);
    setShowComponent(false);
    setAlerts("success");
    setSnackbarOpen(true);
  };

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.headerContainer}>
            <Link to='/'>
              <img
                className={classes.image}
                src={logo}
                alt='logo'
                height='175'
              />
            </Link>
            {props.searchbar}
            <div>
              <Button onClick={drawerOpenHandler(true)}>
                <PersonIcon
                  className={
                    currentUser ? classes.loginIconLoggedIn : classes.loginIcon
                  }
                  fontSize='large'
                ></PersonIcon>
              </Button>
              <Drawer
                anchor='right'
                open={drawerState}
                onClose={drawerOpenHandler(false)}
              >
                <div role='presentation'>
                  <Container component='main' maxWidth='xs'>
                    <CssBaseline />
                    {!logInOrSignUp ? (
                      !currentUser ? (
                        <div className={classes.paper}>
                          <Typography component='h1' variant='h5'>
                            Log in
                          </Typography>
                          <form className={classes.form} noValidate>
                            <TextField
                              // inputRef={emailRef}
                              value={userLogInAndSignUp.email}
                              variant='outlined'
                              margin='normal'
                              required
                              fullWidth
                              id='email'
                              label='Email Address'
                              name='email'
                              autoComplete='email'
                              autoFocus
                              onChange={logInEmailHandler}
                            />
                            <TextField
                              // inputRef={passwordRef}
                              value={userLogInAndSignUp.password}
                              variant='outlined'
                              margin='normal'
                              required
                              fullWidth
                              name='password'
                              label='Password'
                              type='password'
                              id='password'
                              autoComplete='current-password'
                              onChange={logInPasswordHandler}
                            />
                            <FormControlLabel
                              control={
                                <Checkbox value='remember' color='primary' />
                              }
                              label='Remember me'
                            />
                            <Button
                              type='submit'
                              fullWidth
                              variant='contained'
                              color='primary'
                              className={classes.submit}
                              onClick={(e) => logInHandler(e)}
                            >
                              Sign In
                            </Button>
                            <Grid container>
                              <Grid item style={{ margin: "auto" }}>
                                <Link
                                  to='#'
                                  onClick={LogInOrSignUpHandler}
                                  variant='body2'
                                >
                                  {"Don't have an account? Sign Up"}
                                </Link>
                              </Grid>
                            </Grid>
                          </form>
                        </div>
                      ) : (
                        <div className={classes.paper}>
                          <Typography component='h1' variant='h5'>
                            Welcome {currentUser.name}
                          </Typography>
                          <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={logOutHandler}
                          >
                            Log Out
                          </Button>
                        </div>
                      )
                    ) : (
                      <div className={classes.paper}>
                        <Typography component='h1' variant='h5'>
                          Sign Up
                        </Typography>
                        <form className={classes.form} noValidate>
                          <TextField
                            value={userLogInAndSignUp.name}
                            // inputRef={nameRef}
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='name'
                            label='Name'
                            name='name'
                            autoComplete='name'
                            autoFocus
                            onChange={signUpNameHandler}
                          />
                          <TextField
                            value={userLogInAndSignUp.email}
                            // inputRef={emailRef}
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            onChange={signUpEmailHandler}
                          />
                          <TextField
                            value={userLogInAndSignUp.password}
                            // inputRef={passwordRef}
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            onChange={signUpPasswordHandler}
                          />
                          <TextField
                            value={userLogInAndSignUp.confirmPassword}
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='confirm-password'
                            label='Confirm Password'
                            type='password'
                            id='confirm-password'
                            onChange={signUpConfirmPasswordHandler}
                          />
                          <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={(e) => signUpHandler(e)}
                          >
                            Sign Up
                          </Button>
                          <Grid container>
                            <Grid item style={{ margin: "auto" }}>
                              <Link
                                to='#'
                                onClick={LogInOrSignUpHandler}
                                variant='body2'
                              >
                                {"Already have an account? Sign In"}
                              </Link>
                            </Grid>
                          </Grid>
                        </form>
                      </div>
                    )}
                  </Container>
                </div>
              </Drawer>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export default Header;
