import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [movieQueryList, setMovieQueryList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [movie, setMovie] = useState({});
  const [crewList, setCrewList] = useState([]);
  const [query, setQuery] = useState(null);
  const [randMovie, setRandMovie] = useState({});

  const inputHandler = (e) => {
    e.preventDefault();

    setQuery(e.target.value);
  };

  const submitHandler = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?&api_key=96aef73142a3bf028320faa7a7476a67&query=${query}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieQueryList(data);
        setQuery(null);
      });
  };

  const movieClickHandler = (id) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=96aef73142a3bf028320faa7a7476a67`
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("movie", JSON.stringify(data));
        setMovie(data);
      });
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=96aef73142a3bf028320faa7a7476a67`
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("crewList", JSON.stringify(data));
        setCrewList(data);
      });
  };

  const getLocalMovie = () => {
    return JSON.parse(localStorage.getItem("movie", JSON.stringify(movie)));
  };

  const getLocalCrew = () => {
    return JSON.parse(
      localStorage.getItem("crewList", JSON.stringify(crewList))
    );
  };

  const value = {
    movieList,
    setMovieList,
    crewList,
    setCrewList,
    movie,
    setMovie,
    movieClickHandler,
    submitHandler,
    inputHandler,
    getLocalMovie,
    getLocalCrew,
    randMovie,
    setRandMovie,
    movieQueryList,
    setMovieQueryList,
  };

  const randMoviePicker = (fetchedMovieList) => {
    const rand = (max, min) => Math.random() * (max - min) + min;
    return fetchedMovieList[Math.round(rand(fetchedMovieList.length - 1, 0))];
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=96aef73142a3bf028320faa7a7476a67"
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data.results);
        setRandMovie(randMoviePicker(data.results));
      });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
