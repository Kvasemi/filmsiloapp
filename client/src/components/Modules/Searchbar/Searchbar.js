import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";
import { useAuth } from "../../../context/AuthContext";

const Searchbar = () => {
  const classes = useStyles();

  const { searchSubmitHandler, searchInputHandler } = useAuth();

  return (
    <div className={classes.search}>
      <div className={classes.search_icon}>
        <SearchIcon />
      </div>
      <form onSubmit={(e) => searchSubmitHandler(e)}>
        <InputBase
          placeholder='Search…'
          classes={{
            root: classes.input_root,
            input: classes.input_input,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={searchInputHandler}
        />
      </form>
    </div>
  );
};

export default Searchbar;
