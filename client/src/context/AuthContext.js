import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [movieQueryList, setMovieQueryList] = useState([]);
  const [personQueryList, setPersonQueryList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [movie, setMovie] = useState({});
  const [crewList, setCrewList] = useState([]);
  const [query, setQuery] = useState(null);
  const [randMovie, setRandMovie] = useState({});
  const [person, setPerson] = useState({});
  const [relatedMovieList, setRelatedMovieList] = useState([]);
  const [searchToggle, setSearchToggle] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  const history = useHistory();

  const inputHandler = (e) => {
    e.preventDefault();

    setQuery(e.target.value);
  };

  const randMoviePicker = (fetchedMovieList) => {
    const rand = (max, min) => Math.random() * (max - min) + min;
    return fetchedMovieList[Math.round(rand(fetchedMovieList.length - 1, 0))];
  };

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

  const numOfDays = 15;

  const formatDate = (date) => {
    const newArray = date.split("-");
    const newDate = `${newArray[1]}/${newArray[2]}/${newArray[0]}`;
    return newDate;
  };

  const popularMovies = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=96aef73142a3bf028320faa7a7476a67"
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data.results);
        setRandMovie(randMoviePicker(data.results));
      });
  };

  const upcomingMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=96aef73142a3bf028320faa7a7476a67&page=1&language=en-US&release_date.gte=${getDay()}&release_date.lte=${addDays(
        getDay(),
        numOfDays
      )}&with_release_type=2|3&include_video=false&region=US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data.results);
        setRandMovie(randMoviePicker(data.results));
      });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!query) {
      console.log("null was called");
    } else {
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?&api_key=96aef73142a3bf028320faa7a7476a67&query=${query}`
      );
      const movieData = await movieResponse.json();
      localStorage.setItem("movieQueryList", JSON.stringify(movieData.results));
      setMovieQueryList(movieData.results);
      const personResponse = await fetch(
        `https://api.themoviedb.org/3/search/person?api_key=96aef73142a3bf028320faa7a7476a67&search_type=ngram&query=${query}`
      );
      const personData = await personResponse.json();
      localStorage.setItem(
        "personQueryList",
        JSON.stringify(personData.results)
      );
      setPersonQueryList(personData.results);

      if (movieData.results.length < 1 && personData.results.length < 1) {
        e.target.placeholder = "NO MATCH FOUND";
      } else {
        history.push("/search");
      }

      setQuery(null);
      setSearchToggle(false);
    }
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

  const personClickHandler = (id) => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=96aef73142a3bf028320faa7a7476a67`
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("person", JSON.stringify(data));
        setPerson(data);
      });
    fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=96aef73142a3bf028320faa7a7476a67`
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("relatedMovieList", JSON.stringify(data));
        setRelatedMovieList(data);
      });
  };

  const movieToggleHandler = () => {
    setSearchToggle(false);
  };

  const peopleToggleHandler = () => {
    setSearchToggle(true);
  };

  const getLocalMovie = () => {
    return JSON.parse(localStorage.getItem("movie", JSON.stringify(movie)));
  };

  const getLocalCrew = () => {
    return JSON.parse(
      localStorage.getItem("crewList", JSON.stringify(crewList))
    );
  };

  const getLocalPerson = () => {
    return JSON.parse(localStorage.getItem("person", JSON.stringify(person)));
  };

  const getLocalrelatedMovieList = () => {
    return JSON.parse(
      localStorage.getItem("relatedMovieList", JSON.stringify(relatedMovieList))
    );
  };

  const getLocalMovieQueryList = () => {
    return JSON.parse(
      localStorage.getItem("movieQueryList", JSON.stringify(movieQueryList))
    );
  };

  const getLocalPersonQueryList = () => {
    return JSON.parse(
      localStorage.getItem("personQueryList", JSON.stringify(personQueryList))
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
    personClickHandler,
    person,
    setPerson,
    getLocalPerson,
    relatedMovieList,
    setRelatedMovieList,
    getLocalrelatedMovieList,
    popularMovies,
    upcomingMovies,
    personQueryList,
    setPersonQueryList,
    getLocalMovieQueryList,
    getLocalPersonQueryList,
    getDay,
    addDays,
    movieToggleHandler,
    peopleToggleHandler,
    searchToggle,
    formatDate,
    showToggle,
    setShowToggle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
