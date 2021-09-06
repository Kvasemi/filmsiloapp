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
  InputBase,
  Slide,
  TextField,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";
import logo from "../../../images/filmsilo.png";
import { useAuth } from "../../../context/AuthContext";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = (props) => {
  const classes = useStyles();
  const {
    confirmPasswordHandler,
    currentUser,
    drawerState,
    emailRef,
    isHomepage,
    logOutHandler,
    nameRef,
    passwordRef,
    searchInputHandler,
    searchSubmitHandler,
    setDrawerState,
    signInEmailHandler,
    signInHandler,
    signUpNameHandler,
    signInPasswordHandler,
    signInUpHandler,
    signUpEmailHandler,
    signUpHandler,
    signUpPasswordHandler,
    toggleSignInUp,
    setToggleSignInUp,
  } = useAuth();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setToggleSignInUp(false);
    setDrawerState(open);
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
            {!isHomepage && (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <form onSubmit={(e) => searchSubmitHandler(e)}>
                  <InputBase
                    placeholder='Search…'
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                    onChange={searchInputHandler}
                  />
                </form>
              </div>
            )}
            <div>
              <Button onClick={toggleDrawer(true)}>
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
                onClose={toggleDrawer(false)}
              >
                <div role='presentation'>
                  <Container component='main' maxWidth='xs'>
                    <CssBaseline />
                    {!toggleSignInUp ? (
                      !currentUser ? (
                        <div className={classes.paper}>
                          <Typography component='h1' variant='h5'>
                            Sign in
                          </Typography>
                          <form className={classes.form} noValidate>
                            <TextField
                              inputRef={emailRef}
                              variant='outlined'
                              margin='normal'
                              required
                              fullWidth
                              id='email'
                              label='Email Address'
                              name='email'
                              autoComplete='email'
                              autoFocus
                              onChange={signInEmailHandler}
                            />
                            <TextField
                              inputRef={passwordRef}
                              variant='outlined'
                              margin='normal'
                              required
                              fullWidth
                              name='password'
                              label='Password'
                              type='password'
                              id='password'
                              autoComplete='current-password'
                              onChange={signInPasswordHandler}
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
                              onClick={(e) => signInHandler(e)}
                            >
                              Sign In
                            </Button>
                            <Grid container>
                              <Grid item style={{ margin: "auto" }}>
                                <Link
                                  to='#'
                                  onClick={signInUpHandler}
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
                            inputRef={nameRef}
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
                            inputRef={emailRef}
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
                            inputRef={passwordRef}
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
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='confirm-password'
                            label='Confirm Password'
                            type='password'
                            id='confirm-password'
                            onChange={confirmPasswordHandler}
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
                                onClick={signInUpHandler}
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
