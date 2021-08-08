import { Link } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";

import useStyles from "./styles";
import logo from "../../../images/theslidestack.png";

const Header = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.appBar} position='relative'>
        <Toolbar>
          <Link to='/'>
            <img className={classes.image} src={logo} alt='logo' height='175' />
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
