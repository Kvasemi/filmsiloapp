import { useEffect } from "react";

import Feed from "./Feed/Feed";
import Hero from "./Hero/Hero";
import Header from "../../Modules/Header/Header";
import Footer from "../../Modules/Footer/Footer";
import { useAuth } from "../../../context/AuthContext";

const HomePage = () => {
  const { homepageRender } = useAuth();

  useEffect(() => {
    homepageRender();
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

export default HomePage;
