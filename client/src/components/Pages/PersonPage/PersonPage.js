import { useEffect } from "react";

import Feed from "./Feed/Feed";
import Hero from "./Hero/Hero";
import Header from "../../Modules/Header/Header";

const PersonPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <Feed />
    </>
  );
};

export default PersonPage;
