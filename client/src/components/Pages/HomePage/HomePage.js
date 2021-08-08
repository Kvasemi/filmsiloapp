import Feed from "./Feed/Feed";
import Hero from "./Hero/Hero";
import Header from "../../Modules/Header/Header";
import Footer from "../../Modules/Footer/Footer";

const HomePage = () => {
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
