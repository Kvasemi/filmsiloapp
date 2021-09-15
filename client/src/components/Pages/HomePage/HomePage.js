import { useEffect, useState } from "react";

import Feed from "./Feed/Feed";
import Hero from "./Hero/Hero";
import Header from "../../Modules/Header/Header";
import Footer from "../../Modules/Footer/Footer";

const HomePage = () => {
  const [randMovie, setRandMovie] = useState({});
  const [movieList, setMovieList] = useState([]);

  const numOfDays = 30;

  const getDay = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  const addDays = (date, days) => {
    let today = new Date(date);
    today.setDate(today.getDate() + days);
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let newDate = yyyy + "-" + mm + "-" + dd;
    return newDate;
  };

  // const randMoviePicker = (fetchedMovieList) => {
  //   const rand = (max, min) => Math.random() * (max - min) + min;
  //   const backdropPath =
  //     fetchedMovieList[Math.round(rand(fetchedMovieList.length - 1, 0))]
  //       .backdrop_path;
  //   return backdropPath;
  // };

  const randMoviePicker = (fetchedMovieList) => {
    const rand = (max, min) => Math.random() * (max - min) + min;
    return fetchedMovieList[Math.round(rand(fetchedMovieList.length - 1, 0))];
  };

  const popularMovies = async () => {
    const popularData = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=96aef73142a3bf028320faa7a7476a67"
    );
    const data = await popularData.json();
    if (data) {
      setMovieList(data.results);
      setRandMovie(randMoviePicker(data.results));
    }
  };

  const upcomingMovies = async () => {
    const upcomingData = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=96aef73142a3bf028320faa7a7476a67&page=1&language=en-US&release_date.gte=${getDay()}&release_date.lte=${addDays(
        getDay(),
        numOfDays
      )}&with_release_type=2|3&include_video=false&region=US`
    );
    const data = await upcomingData.json();
    if (data) {
      setMovieList(data.results);
      setRandMovie(randMoviePicker(data.results));
    }
  };

  useEffect(() => {
    console.log("useEffect triggered");
    popularMovies();
  }, []);

  return (
    <>
      <Header />
      <Hero randMovie={randMovie} />
      <Feed
        popularMovies={popularMovies}
        upcomingMovies={upcomingMovies}
        movieList={movieList}
      />
      <Footer />
    </>
  );
};

export default HomePage;
