import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const reviewInitialState = {
    review_id: "",
    movie_id: "",
    user_id: "",
    movie_name: "",
    date_created: "",
    num_stars: 0,
    review_title: "",
    review_body: "",
  };
  const userInitialState = {
    user_id: "",
    email: "",
    password: "",
    reviews: [""], //list of review_id's
  };
  const userLoginInitialState = { email: "", password: "" };

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
  const [showComponent, setShowComponent] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [toggleSignInUp, setToggleSignInUp] = useState(false);
  const [review, setReview] = useState(reviewInitialState);
  const [user, setUser] = useState(userInitialState);
  const [userLogin, setUserLogin] = useState(userLoginInitialState);
  const [textField, setTextField] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();

  const searchInputHandler = (e) => {
    e.preventDefault();

    setQuery(e.target.value);
  };

  const reviewBodyHandler = (e) => {
    setReview({ ...review, review_body: e.target.value });
  };

  const reviewTitleHandler = (e) => {
    setReview({ ...review, review_title: e.target.value });
  };

  const toggleReviewHandler = () => {
    setShowComponent(false);
  };

  const toggleFormHandler = () => {
    setShowComponent(true);
    setStarRating(0);
  };

  const changeRatingHandler = (newRating) => {
    setStarRating(newRating);
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    setReview({ ...review, num_stars: starRating });
    // must send the review through the api
    // must add instructions to reset the state after submit
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const signInHandler = (e) => {
    e.preventDefault();

    setUserLogin({ email, password });
    // must send the sign in details through the api
    // must add instructions to reset the state after submit
  };

  const signUpHandler = (e) => {
    e.preventDefault();

    setUser({ email, password });
    // must send the sign up details through the api
    // must add instructions to reset the state after submit
  };

  const signInUpHandler = () => {
    setToggleSignInUp(!toggleSignInUp);
    emailRef.current.value = "";
    passwordRef.current.value = "";
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

  const numOfDays = 30;

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
      })
      .catch((err) => console.log(err));
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
      })
      .catch((err) => console.log(err));
  };

  const searchSubmitHandler = async (e) => {
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
      })
      .catch((err) => console.log(err));
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=96aef73142a3bf028320faa7a7476a67`
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("crewList", JSON.stringify(data));
        setCrewList(data);
      })
      .catch((err) => console.log(err));
  };

  const personClickHandler = (id) => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=96aef73142a3bf028320faa7a7476a67`
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("person", JSON.stringify(data));
        setPerson(data);
      })
      .catch((err) => console.log(err));
    fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=96aef73142a3bf028320faa7a7476a67`
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("relatedMovieList", JSON.stringify(data));
        setRelatedMovieList(data);
      })
      .catch((err) => console.log(err));
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
    searchSubmitHandler,
    searchInputHandler,
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
    showComponent,
    setShowComponent,
    toggleReviewHandler,
    toggleFormHandler,
    review,
    setReview,
    starRating,
    changeRatingHandler,
    user,
    setUser,
    userLogin,
    setUserLogin,
    reviewBodyHandler,
    reviewTitleHandler,
    reviewSubmitHandler,
    emailHandler,
    passwordHandler,
    signInHandler,
    signUpHandler,
    confirmPasswordHandler,
    signInUpHandler,
    toggleSignInUp,
    setToggleSignInUp,
    textField,
    setTextField,
    emailRef,
    passwordRef,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
