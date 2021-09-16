import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

import { getReviews } from "../actions/reviews";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const history = useHistory();

  const reviewInitialState = {
    movie_id: "",
    user_id: "",
    username: "",
    movie_name: "",
    date_created: "",
    num_stars: 0,
    review_title: "",
    review_body: "",
  };

  const userLogInAndSignUpInitialState = {
    name: "",
    email: "",
    password: "",
    reviews: [],
  };

  const [currentUser, setCurrentUser] = useState(null);
  const [alerts, setAlerts] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [drawerState, setDrawerState] = useState(false);
  const [reviewWritten, setReviewWritten] = useState(false);
  const [reviewCollection, setReviewCollection] = useState([]);
  const [crewList, setCrewList] = useState([]);
  const [person, setPerson] = useState({});
  const [relatedMovieList, setRelatedMovieList] = useState([]);
  const [showComponent, setShowComponent] = useState(false);
  const [review, setReview] = useState(reviewInitialState);
  const [movie, setMovie] = useState(null);
  const [movieQueryList, setMovieQueryList] = useState([]);
  const [personQueryList, setPersonQueryList] = useState([]);
  const [showMovieOrPersonResults, setShowMovieOrPersonResults] =
    useState(false);
  const [query, setQuery] = useState(null);

  const showMovieResultsHandler = () => {
    setShowMovieOrPersonResults(false);
  };

  const showPersonResultsHandler = () => {
    setShowMovieOrPersonResults(true);
  };

  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const formatDate = (date) => {
    const newArray = date.split("-");
    const newDate = `${
      months[
        Object.keys(months).find((key) => Number(key) === Number(newArray[1]))
      ]
    } ${newArray[2]}, ${newArray[0]}`;
    return newDate;
  };

  const sortByNestedKey = (array) => {
    let sorted = array.sort(
      (a, b) => new Date(b.date_created) - new Date(a.date_created)
    );
    return sorted;
  };

  const checkIfReviewWritten = (reviews) => {
    for (let rev of reviews) {
      if (currentUser.reviews.includes(rev._id)) {
        setReviewWritten(true);
        return;
      }
    }
    setReviewWritten(false);
  };

  const searchInputHandler = (e) => {
    e.preventDefault();

    setQuery(e.target.value);
  };

  const searchSubmitHandler = async (e) => {
    e.preventDefault();

    if (!query) {
      console.log("null was called");
    } else {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/search/movie?&api_key=96aef73142a3bf028320faa7a7476a67&query=${query}`
        );
        localStorage.setItem(
          "movieQueryList",
          JSON.stringify(movieResponse.data.results)
        );
        setMovieQueryList(movieResponse.data.results);
        const personResponse = await axios.get(
          `https://api.themoviedb.org/3/search/person?api_key=96aef73142a3bf028320faa7a7476a67&search_type=ngram&query=${query}`
        );
        localStorage.setItem(
          "personQueryList",
          JSON.stringify(personResponse.data.results)
        );
        setPersonQueryList(personResponse.data.results);

        if (
          movieResponse.data.results.length < 1 &&
          personResponse.data.results.length < 1
        ) {
          e.target.placeholder = "NO MATCH FOUND";
        } else {
          history.push("/search");
        }
        setQuery(null);
        setShowMovieOrPersonResults(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const movieClickHandler = async (id) => {
    try {
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=96aef73142a3bf028320faa7a7476a67`
      );
      localStorage.setItem("movie", JSON.stringify(movieResponse.data));
      setMovie(movieResponse.data);
      const crewResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=96aef73142a3bf028320faa7a7476a67`
      );
      localStorage.setItem("crewList", JSON.stringify(crewResponse.data));
      setCrewList(crewResponse.data);
      const reviewResponse = await getReviews();
      if (reviewResponse.length > 0) {
        const reviewData = reviewResponse.filter((review) => {
          return review.movie_id === movieResponse.data.id;
        });
        if (currentUser) {
          checkIfReviewWritten(reviewData);
        }
        const sortedReviews = sortByNestedKey(reviewData);
        setReviewCollection(sortedReviews);
        localStorage.setItem("reviewCollection", JSON.stringify(sortedReviews));
      } else {
        setReviewCollection(reviewResponse);
        localStorage.setItem(
          "reviewCollection",
          JSON.stringify(reviewResponse)
        );
        setReviewWritten(false);
      }
      history.push(`/movie/${id}`);
      setShowComponent(false);
    } catch (err) {
      console.log(err);
    }
  };

  const personClickHandler = async (id) => {
    try {
      const personResponse = await axios.get(
        `https://api.themoviedb.org/3/person/${id}?api_key=96aef73142a3bf028320faa7a7476a67`
      );
      localStorage.setItem("person", JSON.stringify(personResponse.data));
      setPerson(personResponse.data);
      const relatedMovieResponse = await axios.get(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=96aef73142a3bf028320faa7a7476a67`
      );
      localStorage.setItem(
        "relatedMovieList",
        JSON.stringify(relatedMovieResponse.data)
      );
      setRelatedMovieList(relatedMovieResponse.data);
      history.push(`/person/${id}`);
      setReviewWritten(false);
    } catch (err) {
      console.log(err);
    }
  };

  // LOCALSTORAGE
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

  const getLocalReviewCollectionList = () => {
    return JSON.parse(
      localStorage.getItem("reviewCollection", JSON.stringify(reviewCollection))
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

  // CONTEXT VALUES
  const value = {
    crewList,
    setCrewList,
    movie,
    setMovie,
    movieClickHandler,
    getLocalMovie,
    getLocalCrew,
    personClickHandler,
    person,
    setPerson,
    getLocalPerson,
    relatedMovieList,
    setRelatedMovieList,
    getLocalrelatedMovieList,
    getLocalMovieQueryList,
    getLocalPersonQueryList,
    formatDate,
    showComponent,
    setShowComponent,
    review,
    setReview,
    currentUser,
    setCurrentUser,
    drawerState,
    setDrawerState,
    snackbarOpen,
    setSnackbarOpen,
    alerts,
    setAlerts,
    getLocalReviewCollectionList,
    reviewWritten,
    setReviewWritten,
    reviewCollection,
    setReviewCollection,
    sortByNestedKey,
    showMovieResultsHandler,
    showPersonResultsHandler,
    setShowMovieOrPersonResults,
    showMovieOrPersonResults,
    setMovieQueryList,
    userLogInAndSignUpInitialState,
    reviewInitialState,
    setPersonQueryList,
    searchInputHandler,
    searchSubmitHandler,
    query,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
