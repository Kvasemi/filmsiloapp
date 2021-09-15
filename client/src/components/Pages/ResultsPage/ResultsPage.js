import { useEffect } from "react";

import Feed from "./Feed/Feed";
import Header from "../../Modules/Header/Header";
import Searchbar from "../../Modules/Searchbar/Searchbar";

const ResultsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header searchbar={<Searchbar />} />
      <Feed />
    </>
  );
};

export default ResultsPage;
