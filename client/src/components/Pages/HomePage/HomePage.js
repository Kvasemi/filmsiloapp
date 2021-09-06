import { useEffect } from "react";

import Feed from "./Feed/Feed";
import Hero from "./Hero/Hero";
import Header from "../../Modules/Header/Header";
import Footer from "../../Modules/Footer/Footer";
import { useAuth } from "../../../context/AuthContext";

const HomePage = () => {
  const { popularMovies } = useAuth();

  useEffect(() => {
    console.log("useEffect triggered");
    popularMovies();
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <Feed />
      <Footer />
    </>
  );
};

export default HomePage;
