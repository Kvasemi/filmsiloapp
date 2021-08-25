import React, { useState } from "react";
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
import logo from "../../../images/theslidestack.png";
import { useAuth } from "../../../context/AuthContext";

const Header = () => {
  const classes = useStyles();
  const {
    confirmPasswordHandler,
    emailHandler,
    emailRef,
    passwordHandler,
    passwordRef,
    signInHandler,
    signInUpHandler,
    signUpHandler,
    toggleSignInUp,
  } = useAuth();
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <>
      <AppBar className={classes.appBar} position='relative'>
        <Toolbar className={classes.headerContainer}>
          <Link to='/'>
            <img className={classes.image} src={logo} alt='logo' height='175' />
          </Link>
          <div>
            <Button onClick={toggleDrawer(true)}>
              <PersonIcon
                className={classes.loginIcon}
                fontSize='large'
              ></PersonIcon>
            </Button>
            <Drawer anchor='right' open={state} onClose={toggleDrawer(false)}>
              <div role='presentation'>
                <Container component='main' maxWidth='xs'>
                  <CssBaseline />
                  {!toggleSignInUp ? (
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
                          onChange={emailHandler}
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
                          onChange={passwordHandler}
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
                        Sign Up
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
                          onChange={emailHandler}
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
                          onChange={passwordHandler}
                        />
                        <TextField
                          variant='outlined'
                          margin='normal'
                          required
                          fullWidth
                          name='confirm-password'
                          label='Confirm Password'
                          type='confirm-password'
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
    </>
  );
};

export default Header;
