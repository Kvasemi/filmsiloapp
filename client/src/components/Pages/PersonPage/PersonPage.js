import { useEffect } from "react";

import Feed from "./Feed/Feed";
import Hero from "./Hero/Hero";
import Header from "../../Modules/Header/Header";
import Footer from "../../Modules/Footer/Footer";

const PersonPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Feed />
      </main>
      <Footer />
    </>
  );
};

export default PersonPage;
