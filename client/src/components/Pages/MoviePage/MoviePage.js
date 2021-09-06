import { useEffect } from "react";

import Feed from "./Feed/Feed";
import Hero from "./Hero/Hero";
import Header from "../../Modules/Header/Header";
import Searchbar from "../../Modules/Searchbar/Searchbar";

const MoviePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header searchbar={<Searchbar />} />
      <Hero />
      <Feed />
    </>
  );
};

export default MoviePage;
